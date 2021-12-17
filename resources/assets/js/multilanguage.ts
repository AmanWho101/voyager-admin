import { Voyager } from '../types/interfaces';

import Store from '@/store.js';

export default {
    install(app: Voyager) {
        app.config.globalProperties.__ = function (key: string, replace = {}) {
            return this.trans(key, replace);
        };
        app.config.globalProperties.trans = function (key: string, replace = {}) {
            let translation = key.split('.').reduce((t, i) => t[i as any] || null, Store.localization);

            if (!translation) {
                return key;
            }

            for (var placeholder in replace) {
                // @ts-ignore
                translation = translation.replace(new RegExp(':'+placeholder, 'g'), replace[placeholder]);
            }

            return translation;
        };
        app.config.globalProperties.trans_choice = function (key?: string, count = 1, replace = {}) {
            if (key === undefined) {
                return key;
            }
            // @ts-ignore
            let translation = key.split('.').reduce((t, i) => t[i as any] || key, Store.localization).split('|');

            translation = count > 1 ? translation[1] : translation[0];

            translation = translation.replace(`:num`, count);

            for (var placeholder in replace) {
                // @ts-ignore
                translation = translation.replace(`:${placeholder}`, replace[placeholder]);
            }

            return translation;
        };
        app.config.globalProperties.get_translatable_object = function (input: any) {
            if (this.isString(input) || this.isNumber(input) || this.isBoolean(input)) {
                try {
                    input = JSON.parse(input);
                } catch { }
                if (!this.isObject(input)) {
                    var value = input;
                    input = {};
                    input[Store.initialLocale] = value;
                }
            } else if (!this.isObject(input)) {
                input = {};
            }

            return input;
        };
        app.config.globalProperties.translate = function (input: any, once = false, default_value = '') {
            if (!this.isObject(input)) {
                input = this.get_translatable_object(input);
            }
            if (this.isObject(input)) {
                return input[once ? Store.initialLocale : Store.locale] || default_value;
            }

            return input;
        };
        app.config.globalProperties.nextLocale = function () {
            var index = Store.locales.indexOf(Store.locale as never);
            if (index >= Store.locales.length - 1) {
                Store.locale = Store.locales[0];
            } else {
                Store.locale = Store.locales[index + 1];
            }
        };
        app.config.globalProperties.previousLocale = function () {
            var index = Store.locales.indexOf(Store.locale as never);
            if (index <= 0) {
                Store.locale = Store.locales[Store.locales.length - 1];
            } else {
                Store.locale = Store.locales[index - 1];
            }
        };
    }
};