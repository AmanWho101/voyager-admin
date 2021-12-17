// @ts-ignore
// __webpack_public_path__ = document.querySelector('meta[name="asset-url"]')?.content;

// External libraries
import * as Vue from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import slugify from 'slugify';
import axios from 'axios';
import { debounce } from 'debounce';

import {
    Voyager as VoyagerApp,
    WindowEx,
    Data as VoyagerData,
    Message,
} from '../types/interfaces';

import eventbus from '@/eventbus';

declare let window: WindowEx;

import scrollTo from '@directives/scroll-to';

import '@helper/array';
import '@helper/string';

import '../sass/voyager.scss';

window.slugify = slugify;
window.Vue = Vue;
window.axios = axios;
window.scrollTo = scrollTo;
window.debounce = debounce;
window.eventbus = eventbus;

import Voyager from '@components/Voyager.vue';

// Multilanguage
import Multilanguage from '@/multilanguage';

// Global (helper) functions
import Global from '@/global';

// Global helper mixins
import MiscMixin from '@mixins/misc';
import StringMixin from '@mixins/strings';
import TypeMixin from '@mixins/types';
import UrlMixin from '@mixins/url';
import FormfieldMixin from '@mixins/formfield';
import FormfieldBuilderMixin from '@mixins/formfield-builder';

// Directives
import TooltipDirective from '@directives/tooltip';

// Core modules
import { Notification } from '@/notify';
import Store from '@/store';

let voyager: Voyager;

function prepareVoyager(data: VoyagerData) {
    for (let key of Object.keys(data)) {
        Store[key] = data[key];
    }

    voyager.addToUI = function (title: string, component: Object) {
        Store.ui.push({ title, component });
    };

    voyager.componentExists = function (component: string) {
        return Object.keys(this._context.components).includes(component);
    };

    voyager.formfieldMixin = FormfieldMixin;
    voyager.formfieldBuilderMixin = FormfieldBuilderMixin;

    voyager.config.globalProperties.Status = Object.freeze({
        Pending  : 1,
        Uploading: 2,
        Finished : 3,
        Failed   : 4,
    });
    window.Status = voyager.config.globalProperties.Status;
    
    voyager.use(Multilanguage);

    voyager.directive('tooltip', TooltipDirective);

    voyager.mixin(MiscMixin);
    voyager.mixin(StringMixin);
    voyager.mixin(TypeMixin);
    voyager.mixin(UrlMixin);

    voyager.config.globalProperties.slugify = slugify;
    voyager.use(Global);
    voyager.config.globalProperties.$notification = Notification;
    voyager.config.globalProperties.$store = Store;
    voyager.config.globalProperties.$eventbus = eventbus;
    voyager.config.globalProperties.$debounce = debounce;

    voyager.config.globalProperties.colors = [
        'accent',
        'red',
        'orange',
        'yellow',
        'green',
        'teal',
        'blue',
        'indigo',
        'purple',
        'pink',
        'gray',
    ];

    if (data.hasOwnProperty('messages')) {
        data.messages.forEach((message) => {
            new Notification(message.message).color(message.color || 'yellow').timeout(message.timeout).show();
        });
    }

    // Register UI components
    const ui = import.meta.globEager('/components/UI/*.vue')
    for (const path in ui) {
        let name = path.substring(path.lastIndexOf('/') + 1).replace('.vue', '');
        voyager.component(name, ui[path].default);
    }

    // Register transition components
    const transitions = import.meta.globEager('/components/Transitions/*.vue')
    for (const path in transitions) {
        let name = path.substring(path.lastIndexOf('/') + 1).replace('.vue', '');
        voyager.component(name+'Transition', transitions[path].default);
    }

    // Register formfield components
    const formfields = import.meta.glob('/components/Formfields/*/*.vue');
    for (const path in formfields) {
        let parts = path.substring(path.indexOf('/Formfields') + 12).replace('.vue', '').split('/');
        if (parts[1] == 'Formfield') {
            voyager.component(`Formfield${parts[0]}`, formfields[path].default);
        } else if (parts[1] == 'Builder') {
            voyager.component(`Formfield${parts[0]}Builder`, formfields[path].default);
        }
    }

    window.voyager = voyager;
    voyager.config.globalProperties.$voyager = voyager;
}

import Dashboard from '@components/Dashboard.vue';
import Error from '@components/Error.vue';
import Generic from '@components/Generic.vue';
import Login from '@components/Login.vue';
import Media from '@components/Media.vue';
import Plugins from '@components/Plugins.vue';
import Settings from '@components/Settings.vue';
import UI from '@components/UI.vue';

import BuilderBrowse from '@components/Builder/Browse.vue';
import BuilderEditAdd from '@components/Builder/EditAdd.vue';

import BreadBrowse from '@components/Bread/Browse.vue';
import BreadEditAdd from '@components/Bread/EditAdd.vue';
import BreadRead from '@components/Bread/Read.vue';

createInertiaApp({
    resolve: name => {
        let page = Generic;
        if (name == 'Dashboard') {
            page = Dashboard;
        } else if (name == 'Error') {
            page = Error;
        } else if (name == 'Login') {
            page = Login;
        } else if (name == 'Media') {
            page = Media;
        } else if (name == 'Plugins') {
            page = Plugins;
        } else if (name == 'Settings') {
            page = Settings;
        } else if (name == 'UI') {
            page = UI;
        } else if (name == 'Builder/Browse') {
            page = BuilderBrowse;
        } else if (name == 'Builder/EditAdd') {
            page = BuilderEditAdd;
        } else if (name == 'Bread/Browse') {
            page = BreadBrowse;
        } else if (name == 'Bread/EditAdd') {
            page = BreadEditAdd;
        } else if (name == 'Bread/Read') {
            page = BreadRead;
        }
        page.layout = page.layout || Voyager;

        return page;
    },
    setup({ el, App, props, plugin }) {
        voyager = Vue.createApp({
            render: () => Vue.h(App, props)
        }).use(plugin);

        prepareVoyager(props.initialPage.props.voyager_props);

        voyager.mount(el);
    },
})