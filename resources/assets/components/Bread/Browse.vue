<template>
    <component
        :is="fromRelationship ? 'div' : 'Card'"
        :title="__('voyager::bread.browse_type', { type: translate(bread.name_plural, true) })"
        :icon="bread.icon"
    >
        <template #actions>
            <div class="flex flex-wrap items-center space-x-1">
                <input
                    type="text"
                    class="input small"
                    v-model="parameters.global"
                    @dblclick="parameters.global = null"
                    @keydown.esc="parameters.global = null"
                    :placeholder="__('voyager::bread.search_type', {type: translate(bread.name_plural, true)})">
                <select class="input small" v-model="parameters.softdeleted" v-if="uses_soft_deletes">
                    <option value="show">{{ __('voyager::bread.soft_delete_show') }}</option>
                    <option value="hide">{{ __('voyager::bread.soft_delete_hide') }}</option>
                    <option value="only">{{ __('voyager::bread.soft_delete_only') }}</option>
                </select>
                <button class="button small" @click.stop="load">
                    <Icon icon="refresh" :class="[loading ? 'animate-spin-reverse' : '']" :size="4" />
                    <span>{{ __('voyager::generic.reload') }}</span>
                </button>
                <BreadActions :actions="actions" bulk @reload="load" :selected="selectedEntries" :openInNewTab="fromRelationship" />
                <LocalePicker />
            </div>
        </template>
        <div>
            <div v-if="layout !== null">
                <div class="inline-flex w-full" v-if="layout.options.filters.length > 0">
                    <template v-for="(filter, i) in layout.options.filters" :key="i">
                        <Badge
                            :color="filter.color"
                            @click="setFilter(filter)"
                            :icon="isFilterSelected(filter)"
                        >
                            <Icon v-if="filter.icon" :icon="filter.icon" class="mr-1" :size="4" />
                            {{ translate(filter.name, true) }}
                        </Badge>
                    </template>
                </div>
                <div class="voyager-table" :class="[loading ? 'loading' : null]">
                    <table>
                        <thead>
                            <tr>
                                <th class="w-2">
                                    <input type="checkbox" class="input" @change="selectAll($event.target.checked)" :checked="allSelected" v-if="multiple" />
                                </th>
                                <th v-if="uses_ordering"></th>
                                <th
                                    v-for="(formfield, key) in layout.formfields" :key="'thead-' + key"
                                    :class="formfield.orderable ? 'cursor-pointer' : ''"
                                    @click="formfield.orderable ? orderBy(formfield.column.column) : ''">
                                    <div class="flex h-full items-center">
                                        <div class="inline-flex items-center space-x-2" v-tooltip="(formfield.orderable ? __('voyager::bread.order_by_field_' + (parameters.order == formfield.column.column && parameters.direction == 'asc' ? 'desc' : 'asc'), { field: formfield.column.column }) : null)">
                                            <span>{{ translate(formfield.title, true) }}</span>
                                            <Icon
                                                v-if="formfield.orderable && parameters.order == formfield.column.column"
                                                :icon="parameters.direction == 'asc' ? 'chevron-up' : 'chevron-down'"
                                                :size="4"
                                            />
                                        </div>
                                    </div>
                                </th>
                                <th class="flex justify-end" v-if="showActions">
                                    <span>{{ __('voyager::generic.actions') }}</span>
                                </th>
                            </tr>
                            <tr v-if="layout.formfields.where('searchable', true).length > 0">
                                <th></th>
                                <th v-if="uses_ordering"></th>
                                <th v-for="(formfield, key) in layout.formfields" :key="'thead-search-' + key">
                                    <component
                                        v-if="formfield.searchable"
                                        :modelValue="parameters.filters[formfield.column.column]"
                                        @update:modelValue="!$event ? delete parameters.filters[formfield.column.column] : parameters.filters[formfield.column.column] = $event"
                                        :is="getComponentForType(formfield)"
                                        :options="formfield.options"
                                        :column="formfield.column"
                                        :placeholder="__('voyager::bread.search_type', {type: translate(formfield.title, true)})"
                                        action="query"
                                    >
                                        <input type="text" class="input small w-full"
                                            :placeholder="__('voyager::bread.search_type', {type: translate(formfield.title, true)})"
                                            @dblclick="delete parameters.filters[formfield.column.column]"
                                            @keydown.esc="delete parameters.filters[formfield.column.column]"
                                            v-model="parameters.filters[formfield.column.column]"
                                        >
                                    </component>
                                </th>
                                <th v-if="showActions"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(result, key) in results" :key="'row-' + key">
                                <td>
                                    <input
                                        :type="multiple ? 'checkbox' : 'radio'"
                                        :name="`select-${translate(bread.slug, true)}`"
                                        class="input"
                                        v-model="selected"
                                        :value="result.primary_key"
                                        @change="handleSelect($event, result)"
                                    />
                                </td>
                                <td v-if="uses_ordering">
                                    <Icon icon="chevron-up" class="cursor-pointer" :size="3" @click.prevent.stop="orderUp(result.primary_key, key)" />
                                    <Icon icon="chevron-down" class="cursor-pointer" :size="3" @click.prevent.stop="orderDown(result.primary_key, key)" />
                                </td>
                                <td v-for="(formfield, key) in layout.formfields" :key="'row-' + key">
                                    <component
                                        v-if="getFormfieldByType(formfield.type).browse_array"
                                        :is="getComponentForType(formfield)"
                                        action="browse"
                                        :options="formfield.options"
                                        :column="formfield.column"
                                        :translatable="formfield.translatable"
                                        :class="formfield.options.classes"
                                        :modelValue="getData(result, formfield, true)"
                                    >
                                    </component>
                                    <template v-else-if="formfield.column.type === 'relationship'">
                                        <div class="space-y-1">
                                            <template v-for="(val, i) in getData(result, formfield, true).slice(0, 3)" :key="'relationship-'+i">
                                                <component :is="formfield.link_to !== null && getHref(formfield, val, true) !== null ? 'a' : 'div'" :href="getHref(formfield, val, true)">
                                                    <component
                                                        :is="getComponentForType(formfield)"
                                                        action="browse"
                                                        :options="formfield.options"
                                                        :column="formfield.column"
                                                        :translatable="formfield.translatable"
                                                        :class="formfield.options.classes"
                                                        :modelValue="translate(val.value)">
                                                    </component>
                                                </component>
                                            </template>
                                            <p v-if="getData(result, formfield, true).length > 3" class="italic">
                                                {{ __('voyager::generic.more_results', {num: getData(result, formfield, true).length - 3}) }}
                                            </p>
                                            <p v-if="getData(result, formfield, true).length == 0" class="italic">
                                                {{ __('voyager::generic.none') }}
                                            </p>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <component :is="formfield.link_to !== null && getHref(formfield, result) !== null ? 'a' : 'div'" :href="getHref(formfield, result)">
                                            <component
                                                :is="getComponentForType(formfield)"
                                                action="browse"
                                                :options="formfield.options"
                                                :column="formfield.column"
                                                :translatable="formfield.translatable"
                                                :class="formfield.options.classes"
                                                :modelValue="getData(result, formfield, false)"
                                            >
                                            </component>
                                        </component>
                                    </template>
                                </td>
                                <td v-if="showActions">
                                    <div class="flex flex-no-wrap justify-end space-x-1">
                                        <BreadActions :actions="actions" :selected="[result]" @reload="load" :openInNewTab="fromRelationship" />
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="results.length == 0 && !loading">
                                <td :colspan="layout.formfields.length + 2" class="text-center">
                                    <h4>{{ __('voyager::bread.no_results') }}</h4>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex w-full">
                    <div class="hidden lg:block w-1/2 whitespace-nowrap">
                        {{ resultDescription }}
                        <a href="#" @click.prevent="parameters.filters = {}; parameters.global = null; parameters.filter = null" v-if="showClearFilterButton">
                            {{ __('voyager::bread.clear_all_filters') }}
                        </a>
                    </div>
                    <div class="w-full lg:w1/2 lg:justify-end inline-flex space-x-2">
                        <select v-model="parameters.perpage" class="input small" v-if="filtered >= 10">
                            <option>10</option>
                            <option v-if="filtered >= 25">25</option>
                            <option v-if="filtered >= 50">50</option>
                            <option v-if="filtered >= 100">100</option>
                        </select>
                        <Pagination :page-count="pages" v-model.number="parameters.page" v-if="results.length > 0" />
                    </div>
                </div>
            </div>
        </div>
    </component>
</template>

<script>
import axios from 'axios';
import debounce from 'debounce';

import Store from '@/store';
import BreadActions from '@components/Bread/Actions.vue';

export default {
    emits: ['select'],
    components: {
        BreadActions,
    },
    props: {
        bread: {
            type: Object,
            required: true,
        },
        perPage: {
            type: Number,
            default: 10,
        },
        relationships: {
            type: Array,
            default: () => []
        },
        fromRelationship: {
            type: Boolean,
            default: false,
        },
        forcedLayout: {
            default: null,
        },
        defaultOrder: {
            type: [String, null],
            default: null,
        },
        // Selected key(s) from relationship
        selectedKeys: {
            default: () => []
        },
        // Allow selecting multiple (from relationship)
        multiple: {
            type: Boolean,
            default: true,
        },
        showActions: {
            type: Boolean,
            default: true,
        }
    },
    provide() {
        return {
            bread: this.bread,
            relationships: this.relationships,
        }
    },
    data() {
        return {
            loading: false,
            results: [],
            layout: null,
            total: 0,    // Total unfiltered amount of entries
            filtered: 0, // Amount of filtered entries
            selected: this.selectedKeys, // Array of selected primary-keys
            uses_soft_deletes: false, // If the model uses soft-deleting
            uses_ordering: false, // If the items can be re-ordered
            actions: [], // The actions which should be displayed
            parameters: {
                page: 1,
                perpage: this.perPage,
                global: null,
                filters: {},
                order: this.defaultOrder,
                direction: 'asc',
                softdeleted: 'show', // show, hide, only
                locale: Store.locale,
                filter: null, // The current selected filter
                forcedLayout: this.forcedLayout,
            },
        };
    },
    methods: {
        load() {
            this.loading = true;

            axios.post(this.route('voyager.'+this.translate(this.bread.slug, true)+'.data'), { ...this.parameters, forcedLayout: this.forcedLayout })
            .then((response) => {
                for (var key in response.data) {
                    if (response.data.hasOwnProperty(key) && this.$data.hasOwnProperty(key)) {
                        this[key] = response.data[key];
                    } else if (key == 'warnings') {
                        response.data.warnings.forEach((warning) => {
                            new this.$notification(warning).color('yellow').timeout().show();
                        });
                    }
                }
                
                if (response.data.execution > 500) {
                    new this.$notification(this.__('voyager::bread.execution_time_warning', { time: parseInt(response.data.execution) })).color('yellow').timeout().show();
                }
            })
            .catch((response) => {})
            .then(() => {
                this.loading = false;
            });
        },
        getData(result, formfield, asArray = false) {
            let results = result[formfield.column.column];

            if (this.isArray(results)) {
                results.map((result) => {
                    return this.translate(result);
                });

                if (!asArray) {
                    results = results.join(', ');
                }
            } else {
                results = this.translate(results);

                if (asArray) {
                    results = [results];
                }
            }

            return results;
        },
        orderBy(column) {
            if (this.parameters.order == column) {
                this.parameters.direction = this.parameters.direction == 'asc' ? 'desc' : 'asc';
            } else {
                this.parameters.order = column;
                this.parameters.direction = 'asc';
            }
        },
        selectAll(checked) {
            this.selected = [];
            if (checked) {
                this.results.forEach((result) => {
                    this.selected.push(result.primary_key);
                });
            }
        },
        pushParameterToUrl(params) {
            if (!this.fromRelationship) {
                var url = window.location.href.split('?')[0];
                for (var key in params) {
                    if (params.hasOwnProperty(key) && params[key] !== null && key !== 'filter' && key !== 'forcedLayout') {
                        if (this.isObject(params[key])) {
                            url = this.addParameterToUrl(key, JSON.stringify(params[key]), url);
                        } else {
                            url = this.addParameterToUrl(key, params[key], url);
                        }
                    }
                }
                this.pushToUrlHistory(url);
            }
        },
        setFilter(filter) {
            if (this.isFilterSelected(filter)) {
                this.parameters.filter = null;
            } else {
                this.parameters.filter = filter;
            }
        },
        isFilterSelected(filter) {
            var p_filter = this.parameters.filter;
            if (filter && p_filter && p_filter.column == filter.column && p_filter.operator == filter.operator && p_filter.value == filter.value) {
                return 'x';
            }

            return null;
        },
        orderUp(key, i) {
            if (i == 0 && this.parameters.page == 1) {
                return;
            }
            this.order(key, true);
        },
        orderDown(key, i) {
            this.order(key, false);
        },
        order(key, up) {
            axios.post(this.route('voyager.'+this.translate(this.bread.slug, true)+'.order'), {
                key: key,
                up: up,
            })
            .then(() => {
                this.load();
            })
            .catch((response) => {});
        },
        clamp(num, min, max) {
            if (num < min) {
                return min;
            } else if (num > max) {
                return max;
            }
        
            return num;
        },
        getComponentForType(formfield) {
            if (formfield.hasOwnProperty('component') && formfield.component !== null && formfield.component !== '') {
                if (this.$voyager.componentExists(formfield.component)) {
                    return formfield.component;
                } else {
                    console.error(this.__('voyager::generic.component_does_not_exist', { component: formfield.component, default: this.getFormfieldByType(formfield.type).component }));
                }
            }

            return this.getFormfieldByType(formfield.type).component;
        },
        getHref(formfield, result, relationship = false) {
            if (formfield.link_to == 'edit' || formfield.link_to == 'read') {
                if (relationship) {
                    let relationship = this.relationships.where('method', formfield.column.column.split('.')[0]).first();
                    if (relationship && relationship.hasOwnProperty('bread') && relationship.bread && result.hasOwnProperty('key')) {
                        let slug = this.translate(relationship.bread.slug, true);
                        return this.route(`voyager.${slug}.${formfield.link_to}`, result.key);
                    }
                } else if (result.hasOwnProperty('primary_key')) {
                    return this.route(`voyager.${this.translate(this.bread.slug, true)}.${formfield.link_to}`, result.primary_key);
                }
            }

            return null;
        },
        handleSelect(e, result) {
            this.$emit('select', {
                selected: e.target.checked,
                result
            });
        }
    },
    computed: {
        pages() {
            return Math.ceil(this.filtered / this.parameters.perpage);
        },
        showClearFilterButton() {
            if (this.parameters.global !== null && this.parameters.global !== '') {
                return true;
            }
            return Object.values(this.parameters.filters).whereNot('').length > 0;
        },
        resultDescription() {
            var type = this.translate(this.bread.name_plural, true);
            if (this.filtered == 1) {
                type = this.translate(this.bread.name_singular, true);
            }
            var start = 1 + ((this.parameters.page - 1) * this.parameters.perpage);
            if (this.results.length == 0) {
                start = 0;
            }
            var end = this.clamp((start + this.parameters.perpage - 1), start, this.filtered);
            var desc = this.__('voyager::bread.results_description', {
                start: start,
                end  : end,
                total: this.filtered,
                type : type,
            });

            if (this.filtered != this.total) {
                var type = this.translate(this.bread.name_plural, true);
                if (this.total == 1) {
                    type = this.translate(this.bread.name_singular, true);
                }
                desc = desc + ' ' + this.__('voyager::bread.filter_description', {
                    total: this.total,
                    type : type,
                });
            }

            return desc;
        },
        allSelected() {
            var not_found = false;
            if (this.results.length == 0) {
                return false;
            }
            this.results.forEach((result) => {
                if (!this.selected.includes(result.primary_key)) {
                    not_found = true;
                }
            });

            return !not_found;
        },
        selectedEntries() {
            return this.results.filter((result) => {
                return this.selected.includes(result.primary_key);
            });
        },
    },
    mounted() {
        for (var param of this.getParametersFromUrl()) {
            try {
                var val = JSON.parse(param[1]);
                this.parameters[param[0]] = val;
            } catch {
                this.parameters[param[0]] = param[1];
            }
        }

        this.$watch(() => this.parameters, debounce((parameters) => {
            this.pushParameterToUrl(parameters);
            this.load();
        }, 250), { deep: true, immediate: true });
    },
    created() {
        this.$watch(() => this.selectedKeys, (selected) => {
            this.selected = selected;
        });
        this.$watch(() => this.parameters.page, () => {
            this.selected = [];
        });
        this.$watch(() => this.parameters.softdeleted, () => {
            this.parameters.page = 1;
        });
        this.$watch(() => Store.locale, (locale) => {
            this.parameters.locale = locale;
        });
    },
};
</script>