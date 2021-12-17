<template>
    <Card :title="__('voyager::plugins.plugins')" icon="puzzle">
        <template #actions>
            <div class="flex items-center space-x-2">
                <input
                    type="text"
                    v-model="installed.query"
                    class="input w-full small"
                    :placeholder="__('voyager::plugins.search_installed_plugins')"
                    @dblclick="installed.query = ''"
                    @keydown.esc="installed.query = ''"
                >
                <button class="button space-x-1" @click="reload" :disabled="store.pageLoading">
                    <Icon icon="refresh" class="animate-spin-reverse" :size="store.pageLoading ? 4 : 0" :transition-size="4" />
                    <span>{{ __('voyager::generic.reload') }}</span>
                </button>
                
                <button class="button" @click="checkUpdates">{{ __('voyager::plugins.check_for_updates') }}</button>
                <Modal ref="search_plugin_modal" :title="__('voyager::plugins.plugins')" icon="puzzle" v-on:closed="available.query = ''">
                    <input
                        type="text"
                        class="input w-full mb-3"
                        v-model="available.query"
                        :placeholder="__('voyager::generic.search')"
                        @dblclick="available.query = ''"
                    >
                    <div v-if="filteredAvailablePlugins.length == 0" class="w-full text-center">
                        <h4>{{ __('voyager::plugins.no_plugins_match_search') }}</h4>
                    </div>
                    <div v-for="(plugin, i) in filteredAvailablePlugins.slice(availableStart, availableEnd)" :key="'plugin-'+i">
                        <div class="flex">
                            <div class="w-3/5">
                                <div class="w-full inline-flex space-x-2">
                                    <h5>{{ translate(plugin.name) }}</h5>
                                    <Badge icon="download">{{ plugin.downloads }}</Badge>
                                    <Badge icon="thumb-up">{{ plugin.favers }}</Badge>
                                </div>
                                <p>{{ translate(plugin.description) }}</p>
                                <div class="w-full inline-flex space-x-1.5">
                                    <a v-if="plugin.url" :href="plugin.url" target="_blank">
                                        {{ __('voyager::generic.website') }}
                                    </a>
                                    <a v-if="plugin.repository" :href="plugin.repository" target="_blank">
                                        {{ __('voyager::generic.repository') }}
                                    </a>
                                </div>
                            </div>
                            <div class="w-2/5 text-right" v-if="!pluginInstalled(plugin)">
                                <input class="input w-full select-none" :value="'composer require '+plugin.name" @dblclick.prevent.stop="copy(plugin)">
                            </div>
                            <div class="w-2/5 text-right" v-else>
                                <Badge color="orange">{{ __('voyager::plugins.plugin_installed') }}</Badge>
                            </div>
                        </div>
                        <hr class="w-full bg-gray-300 my-4">
                    </div>
                    <div class="w-full">
                        <Pagination
                            :page-count="availablePages"
                            @update:model-value="available.page = $event - 1"
                            :model-value="available.page + 1"
                            :first-last-buttons="false"
                        />
                    </div>
                    <template #opener>
                        <button class="button">
                            <Icon icon="search" :size="4" />
                            <span>{{ __('voyager::plugins.search_plugins') }}</span>
                        </button>
                    </template>
                </Modal>
            </div>
        </template>
        <CollapseTransition>
            <Alert color="blue" v-if="update.checked > 0 && update.checked >= update.installed" class="mb-4">
                <div v-if="update.updates.length > 0">
                    <span v-html="__('voyager::plugins.updates_available')"></span>
                    <ul class="my-2">
                        <li v-for="(plugin, i) in update.updates" :key="`update-${i}`">
                            <template v-if="plugin.current.startsWith('dev-')">
                                <!-- TODO: Dev version installed. Skip? -->
                                {{ plugin.repo }} ({{ plugin.current }} => {{ plugin.newest }})
                            </template>
                            <template v-else>
                                {{ plugin.repo }} ({{ plugin.current }} => {{ plugin.newest }})
                            </template>
                        </li>
                    </ul>
                    <span v-html="__('voyager::plugins.updates_available_install')"></span>
                </div>
            </Alert>
        </CollapseTransition>
        <CollapseTransition>
            <Alert color="blue" v-if="intUninstalledPlugins.length > 0" class="mb-4">
                <span>{{ __('voyager::plugins.registered_not_installed') }}</span>
                <ul class="my-2">
                    <li v-for="(ident, i) in intUninstalledPlugins" :key="`uninstalled-${i}`">
                        {{ ident }}
                    </li>
                </ul>
                <span>
                    {{ __('voyager::plugins.registered_not_installed_clean') }}
                    <button class="button" @click="cleanUp">{{ __('voyager::generic.clean') }}</button>
                </span>
            </Alert>
        </CollapseTransition>
        <div class="w-full flex">
            <div class="flex-grow space-x-1">
                <Badge
                    v-for="(type, i) in installedTypes"
                    :key="i" :color="getPluginTypeColor(type)"
                    :icon="installed.currentType == type ? 'x' : null"
                    @click="setTypeFilter(type)"
                >
                    {{ __('voyager::plugins.types.'+type) }}
                </Badge>
            </div>
            <div class="flex-grow-0 space-x-1">
                <Badge
                    color="green"
                    @click="installed.onlyEnabled === true ? installed.onlyEnabled = null : installed.onlyEnabled = true"
                    :icon="installed.onlyEnabled === true ? 'x' : null"
                >
                    {{ __('voyager::plugins.only_enabled') }}
                </Badge>
                <Badge
                    color="red"
                    @click="installed.onlyEnabled === false ? installed.onlyEnabled = null : installed.onlyEnabled = false"
                    :icon="installed.onlyEnabled === false ? 'x' : null"
                >
                    {{ __('voyager::plugins.only_disabled') }}
                </Badge>
            </div>
        </div>
        <div v-if="installed.plugins.length > 0">
            <div class="voyager-table striped" :class="store.pageLoading ? 'loading' : null">
                <table id="bread-builder-browse">
                    <thead>
                        <tr>
                            <th>
                                {{ __('voyager::generic.name') }}
                            </th>
                            <th>
                                {{ __('voyager::generic.description') }}
                            </th>
                            <th>
                                {{ __('voyager::generic.type') }}
                            </th>
                            <th>
                                {{ __('voyager::generic.version') }}
                            </th>
                            <th>
                                Stats
                            </th>
                            <th v-if="update.checked > 0">
                                {{ __('voyager::plugins.newest_version') }}
                            </th>
                            <th class="flex justify-end">
                                <span>{{ __('voyager::generic.actions') }}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="filteredInstalledPlugins.length == 0" class="w-full text-center">
                            <td colspan="6"><h4>{{ __('voyager::plugins.no_plugins_match_search') }}</h4></td>
                        </tr>
                        <tr v-for="(plugin, i) in filteredInstalledPlugins.slice(installedStart, installedEnd)" :key="'installed-plugin-'+i">
                            <td>{{ translate(plugin.name) }}</td>
                            <td>{{ translate(plugin.description) }}</td>
                            <td class="space-x-1 space-y-1">
                                <template v-for="(type, i) in plugin.types" :key="`type-${i}`">
                                    <Badge :color="getPluginTypeColor(type)" @click="setTypeFilter(type)">
                                        {{ __('voyager::plugins.types.'+type) }}
                                    </Badge>
                                </template>
                                
                            </td>
                            <td>
                                {{ plugin.version || '-' }}
                            </td>
                            <td v-if="update.checked > 0">
                                <span v-if="getNewestVersion(plugin) === false" class="text-green-500">
                                    {{ __('voyager::plugins.up_to_date') }}
                                </span>
                                <span v-else class="text-red-500" v-tooltip="`composer update ${plugin.repository}`">
                                    {{ getNewestVersion(plugin) }}
                                </span>
                            </td>
                            <td class="space-x-1 space-y-1">
                                <Badge v-if="plugin.stats.settings > 0">{{ trans_choice('voyager::plugins.stats.settings', plugin.stats.settings) }}</Badge>
                                <Badge v-if="plugin.stats.widgets > 0">{{ trans_choice('voyager::plugins.stats.widgets', plugin.stats.widgets) }}</Badge>
                                <Badge v-if="plugin.stats.menuitems > 0">{{ trans_choice('voyager::plugins.stats.menu_items', plugin.stats.menuitems) }}</Badge>
                                <Badge v-if="plugin.stats.public_routes">{{ __('voyager::plugins.stats.public_routes') }}</Badge>
                                <Badge v-if="plugin.stats.protected_routes">{{ __('voyager::plugins.stats.protected_routes') }}</Badge>
                                <Badge v-if="plugin.stats.js">{{ __('voyager::plugins.stats.javascript') }}</Badge>
                                <Badge v-if="plugin.stats.css">{{ __('voyager::plugins.stats.css') }}</Badge>
                                <Badge v-if="plugin.stats.layout_filter">{{ __('voyager::plugins.stats.layout_filter') }}</Badge>
                                <Badge v-if="plugin.stats.media_filter">{{ __('voyager::plugins.stats.media_filter') }}</Badge>
                                <Badge v-if="plugin.stats.menu_item_filter">{{ __('voyager::plugins.stats.menu_item_filter') }}</Badge>
                                <Badge v-if="plugin.stats.widget_filter">{{ __('voyager::plugins.stats.widget_filter') }}</Badge>
                            </td>
                            <td class="w-full inline-flex space-x-1 justify-end">
                                <a class="button small" v-if="plugin.website" :href="translate(plugin.website)" target="_blank">
                                    <Icon icon="globe" />
                                    {{ __('voyager::generic.website') }}
                                </a>
                                
                                <Modal v-if="plugin.settings_component && plugin.enabled" :title="__('voyager::generic.settings')">
                                    <component :is="plugin.settings_component"></component>
                                    <template #opener>
                                        <button class="button small">
                                        <Icon icon="cog" />
                                        <span>{{ __('voyager::generic.settings') }}</span>
                                    </button>
                                    </template>
                                </Modal>

                                <Modal v-if="plugin.readme" :title="__('voyager::generic.readme')">
                                    <MarkdownView :renderer="renderer(plugin)">
                                        {{ plugin.readme }}
                                    </MarkdownView>
                                    <template #opener>
                                        <button class="button small">
                                        <Icon icon="eye" />
                                        <span>{{ __('voyager::generic.readme') }}</span>
                                    </button>
                                    </template>
                                </Modal>
                                <button v-if="plugin.types.includes('theme') && !plugin.enabled" class="button small" @click="previewTheme(plugin.name)">
                                    <Icon icon="eye" />
                                    <span>{{ __('voyager::generic.preview') }}</span>
                                </button>
                                <Modal v-if="plugin.enabled && Object.keys(plugin.preferences).length > 0" :title="__('voyager::plugins.preferences')">
                                    <JsonEditor v-model="plugin.preferences" />
                                    <template #actions>
                                        <button class="button small" @click="clearPreferences(plugin)">{{ __('voyager::generic.clear') }}</button>
                                        <button class="button small" @click="savePreferences(plugin)">{{ __('voyager::generic.save') }}</button>
                                    </template>
                                    <template #opener>
                                        <button class="button small">
                                            <Icon icon="cog" />
                                            <span>{{ __('voyager::plugins.preferences') }}</span>
                                        </button>
                                    </template>
                                </Modal>
                                <button v-if="!plugin.enabled" class="button small" @click="enablePlugin(plugin, true)">
                                    <Icon icon="play" class="text-green-500" />
                                    <span>{{ __('voyager::generic.enable') }}</span>
                                </button>
                                <button v-else class="button small" @click="enablePlugin(plugin, false)">
                                    <Icon icon="stop" class="text-red-500" />
                                    <span>{{ __('voyager::generic.disable') }}</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="w-full mt-2">
                <Pagination
                    :page-count="installedPages"
                    @update:modelValue="installed.page = $event - 1"
                    :modelValue="installed.page + 1"
                    :first-last-buttons="false"
                ></Pagination>
            </div>
        </div>
        <div v-else class="w-full text-center">
            <h3>{{ __('voyager::plugins.no_plugins_installed_title') }}</h3>
            <h4>{{ __('voyager::plugins.no_plugins_installed_hint') }}</h4>
        </div>
    </Card>
</template>

<script>
import axios from 'axios';
const compare = () => false;

import Store from '@/store';

export default {
    props: ['installedPlugins', 'uninstalledPlugins'],
    data() {
        return {
            installed: {
                plugins: this.installedPlugins,
                query: '',
                currentType: null,
                page: 0,
                resultsPerPage: 7,
                onlyEnabled: null,
            },
            available: {
                plugins: [],
                query: '',
                currentType: null,
                page: 0,
                resultsPerPage: 5,
            },
            update: {
                updates: [],
                checked: 0,
                installed: 0,
            },
            intUninstalledPlugins: this.uninstalledPlugins,
            addPluginModalOpen: false,
            pp: [],
            store: Store
        };
    },
    methods: {
        reload() {
            this.$inertia.get(route('voyager.plugins.index'));
        },
        closeAddPluginModal() {
            this.addPluginModalOpen = false;
        },
        copy(plugin) {
            this.copyToClipboard('composer require ' + plugin.name);
            new this.$notification(this.__('voyager::generic.copied_to_clipboard')).timeout().show();
        },
        enablePlugin(plugin, enable) {
            var message = this.__('voyager::plugins.enable_plugin_confirm', {name: plugin.name});
            if (!enable) {
                message = this.__('voyager::plugins.disable_plugin_confirm', {name: plugin.name});
            }

            new this.$notification(message).confirm().timeout().show().then((response) => {
                if (response) {
                    axios.post(this.route('voyager.plugins.enable'), {
                        identifier: plugin.identifier,
                        enable: enable,
                    })
                    .then(() => {
                        new this.$notification(this.__('voyager::plugins.reload_page')).timeout().show();
                    })
                    .catch(response => {})
                    .then(() => {
                        this.reload();
                    });
                }
            });
        },
        previewTheme(name) {
            var file = document.createElement('link');
            file.setAttribute('rel', 'stylesheet');
            file.setAttribute('type', 'text/css');
            file.setAttribute('href', this.asset('plugin/'+slugify(name, { lower: true })+'.css'));
            document.getElementsByTagName('head')[0].appendChild(file);

            new this.$notification(this.__('voyager::plugins.preview_theme', {name: name})).timeout().show();
        },
        getPluginTypeColor(type) {
            if (type == 'authentication') {
                return 'green';
            } else if (type == 'authorization') {
                return 'blue';
            } else if (type == 'menu') {
                return 'yellow';
            } else if (type == 'theme') {
                return 'purple';
            } else if (type == 'formfield') {
                return 'teal';
            }

            return 'red';
        },
        pluginInstalled(plugin) {
            return this.installed.plugins.where('repository', plugin.repository).length > 0;
        },
        setTypeFilter(type) {
            if (this.installed.currentType == type) {
                this.installed.currentType = null;
            } else {
                this.installed.currentType = type;
            }
            this.installed.page = 0;
        },
        setAvailableTypeFilter(type) {
            if (this.available.currentType == type) {
                this.available.currentType = null;
            } else {
                this.available.currentType = type;
            }
            this.available.page = 0;
        },
        checkUpdates() {
            this.update.updates = [];
            this.update.checked = 0;

            let repos = [];
            this.installed.plugins.forEach((plugin) => {
                if (repos.indexOf(plugin.repository) === -1) {
                    repos.push(plugin.repository);
                }
            });

            this.update.installed = repos.length;

            repos.forEach((repo) => {
                axios.get(`https://repo.packagist.org/p2/${repo}.json`)
                .then((response) => {
                    let newest = response.data.packages[repo][0].version_normalized;
                    let current = this.installed.plugins.where('repository', repo).first().version_normalized;
                    if (compare(newest, current) === 1) {
                        this.update.updates.push({
                            repo,
                            current: this.installed.plugins.where('repository', repo).first().version,
                            newest: response.data.packages[repo][0].version
                        });
                    }
                })
                .catch()
                .then(() => {
                    this.update.checked++;

                    if (this.update.checked >= repos.length) {
                        if (this.update.updates.length == 0) {
                            this.update.updates = [];
                            this.update.checked = 0;
                            this.update.installed = 0;

                            new this.$notification(this.__('voyager::plugins.no_updates')).timeout().show();
                        }
                    }
                });
            });
        },
        getNewestVersion(plugin) {
            const update = this.update.updates.where('repo', plugin.repository).first();
            if (update && update.current !== update.newest) {
                return update.newest;
            }
            return false;
        },
        getAvailablePlugins(url = null) {
            if (url === null) {
                url = 'https://packagist.org/search.json?tags=voyager2-plugin';
                this.available.plugins = [];
            }
            axios.get(url)
                .then((response) => {
                    let plugins = response.data.results.filter((plugin) => {
                        if ((plugin.name.startsWith('voyager-admin') && plugin.name.endsWith('boilerplate')) || plugin.name.endsWith('voyager-docs')) {
                            return false;
                        }

                        return true;
                    });
                    this.available.plugins = [...this.available.plugins, ...plugins];
                    if (response.data.hasOwnProperty('next')) {
                        this.getAvailablePlugins(response.data.next);
                    }
                })
                .catch((response) => {
                    new this.$notification(this.__('voyager::plugins.error_loading_plugins')).color('red').timeout().show();
                });
        },
        clearPreferences(plugin) {
            new this.$notification(this.__('voyager::plugins.clear_preferences_confirm', { plugin: plugin.name })).confirm().timeout().show().then((response) => {
                if (response) {
                    axios.post(this.route('voyager.plugins.clear-preferences'), {
                        identifier: plugin.identifier,
                    })
                    .then(() => {
                        new this.$notification(this.__('voyager::plugins.cleared_preferences', { plugin: plugin.name })).timeout().show();
                        this.installed.plugins.where('identifier', plugin.identifier).first().preferences = {};
                    })
                    .catch(response => {})
                    .then(() => {});
                }
            });
        },
        savePreferences(plugin) {
            axios.post(this.route('voyager.plugins.save-preferences'), {
                identifier: plugin.identifier,
                preferences: plugin.preferences,
            })
            .then(() => {
                new this.$notification(this.__('voyager::plugins.saved_preferences', { plugin: plugin.name })).timeout().show();
            })
            .catch(response => {})
            .then(() => {});
        },
        cleanUp() {
            axios.post(this.route('voyager.plugins.clean-up'))
            .then(() => {
                new this.$notification(this.__('voyager::plugins.cleaned_up')).timeout().show();
                this.intUninstalledPlugins = [];
            })
            .catch(response => {})
            .then(() => {});
        },
        renderer(plugin) {
            return {
                image(href, title, text) {
                    href = ((plugin.readme_assets_path || '') + href).replaceAll('./', '');
                    return `<img src="${href}" alt="${title || text}">`;
                },
            };
        }
    },
    computed: {
        filteredAvailablePlugins() {
            var query = this.available.query.toLowerCase();
            return this.available.plugins.filter((plugin) => {
                if (this.available.currentType !== null) {
                    return plugin.types.includes(this.available.currentType);
                }

                return true;
            }).filter((plugin) => {
                return plugin.name.toLowerCase().includes(query) || plugin.description.toLowerCase().includes(query);
            });
        },
        filteredInstalledPlugins() {
            var query = this.installed.query.toLowerCase();
            return this.installed.plugins.filter((plugin) => {
                if (this.installed.onlyEnabled === true) {
                    return plugin.enabled;
                } else if (this.installed.onlyEnabled === false) {
                    return !plugin.enabled;
                }

                return true;
            }).filter((plugin) => {
                if (this.installed.currentType !== null) {
                    return plugin.types.includes(this.installed.currentType);
                }

                return true;
            }).filter((plugin) => {
                return plugin.description.toLowerCase().indexOf(query) >= 0 || plugin.name.toLowerCase().indexOf(query) >= 0;
            });
        },
        availableStart() {
            return this.available.page * this.available.resultsPerPage;
        },
        availableEnd() {
            return this.availableStart + this.available.resultsPerPage;
        },
        availablePages() {
            return Math.ceil(this.filteredAvailablePlugins.length / this.available.resultsPerPage);
        },
        installedStart() {
            return this.installed.page * this.installed.resultsPerPage;
        },
        installedEnd() {
            return this.installedStart + this.installed.resultsPerPage;
        },
        installedPages() {
            return Math.ceil(this.filteredInstalledPlugins.length / this.installed.resultsPerPage);
        },
        installedTypes() {
            return this.installed.plugins.map((plugin) => {
                return plugin.types;
            }).flat().filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        },
    },
    mounted() {
        var type = this.getParameterFromUrl('type', null);
        if (type !== null) {
            this.available.currentType = type;
            this.$refs.search_plugin_modal.open();
        }
        this.getAvailablePlugins();
    },
    created() {
        this.$watch(() => this.available.query, () => {
            this.available.page = 0;
        });
        this.$watch(() => this.installed.query, () => {
            this.installed.page = 0;
        });
        this.$watch(() => this.installed.onlyEnabled, () => {
            this.installed.page = 0;
        });
    },
};
</script>