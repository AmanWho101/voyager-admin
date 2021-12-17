<?php

namespace Voyager\Admin\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Voyager\Admin\Classes\Bread;
use Voyager\Admin\Facades\Voyager as VoyagerFacade;
use Voyager\Admin\Manager\Breads as BreadManager;
use Voyager\Admin\Manager\Menu as MenuManager;
use Voyager\Admin\Manager\Plugins as PluginManager;
use Voyager\Admin\Manager\Settings as SettingManager;

abstract class Controller extends BaseController
{
    use AuthorizesRequests;

    protected BreadManager $breadmanager;
    protected MenuManager $menumanager;
    protected PluginManager $pluginmanager;
    protected SettingManager $settingmanager;

    public function __construct()
    {
        $this->breadmanager = resolve(BreadManager::class);
        $this->menumanager = resolve(MenuManager::class);
        $this->pluginmanager = resolve(PluginManager::class);
        $this->settingmanager = resolve(SettingManager::class);
    }

    protected function inertiaRender(string $page, string|array|null $title = '', array $data = [], ?string $root_view = null): InertiaResponse
    {
        Inertia::setRootView($root_view ?? 'voyager::app');

        return Inertia::render($page, array_merge($data, ['page_title' => $title], ['voyager_props' => VoyagerFacade::getViewData()]))->withViewData('title', $title);
    }

    protected function validateData(Collection $formfields, array|Collection $data, bool $all_locales = false): array
    {
        $errors = [];

        $formfields->each(function ($formfield) use (&$errors, $data, $all_locales) {
            $formfield->validation = $formfield->validation ?? [];
            $value = $data[$formfield->column->column] ?? '';
            if ($formfield->translatable && is_array($value) && !$all_locales) {
                $value = $value[VoyagerFacade::getLocale()] ?? $value[VoyagerFacade::getFallbackLocale()] ?? '';
            }
            foreach ($formfield->validation as $rule) {
                if ($rule->rule == '') {
                    continue;
                }
                if ($all_locales && $formfield->translatable && is_array($value)) {
                    $locales = VoyagerFacade::getLocales();
                    foreach ($locales as $locale) {
                        $val = $value[$locale] ?? null;
                        $result = $this->validateField($val, $rule->rule, $rule->message);
                        if (!is_null($result)) {
                            $locale = Lang::has('voyager::generic.languages.'.$locale, null, false) ? __('voyager::generic.languages.'.$locale) : strtoupper($locale);
                            if (is_string($locale)) {
                                $errors[$formfield->column->column][] = $locale.': '.$result;
                            }
                        }
                    }
                } else {
                    $result = $this->validateField($value, $rule->rule, $rule->message);
                    if (!is_null($result)) {
                        $errors[$formfield->column->column][] = $result;
                    }
                }
            }
        });

        return $errors;
    }

    protected function validateField(mixed $value, string $rule, mixed $message): ?string
    {
        $ruleSet = ['col' => $rule];

        if (Str::startsWith($rule, '.')) {
            $ruleSet = ['col.*'.Str::before($rule, ':') => Str::after($rule, ':')];
            $value = [$value];
        } elseif (Str::startsWith($rule, '*.')) {
            $ruleSet = ['col.'.Str::before($rule, ':') => Str::after($rule, ':')];
            $value = $value;
        }

        $validator = Validator::make(['col' => $value], $ruleSet);

        if ($validator->fails()) {
            if (is_object($message)) {
                $message = $message->{VoyagerFacade::getLocale()} ?? $message->{VoyagerFacade::getFallbackLocale()} ?? '';
            } elseif (is_array($message)) {
                $message = $message[VoyagerFacade::getLocale()] ?? $message[VoyagerFacade::getFallbackLocale()] ?? '';
            }

            return $message;
        }

        return null;
    }

    protected function getBread(Request $request, bool $withRelationships = false): Bread
    {
        if ($request->route() instanceof \Illuminate\Routing\Route && $request->route()->getAction()['bread']) {
            $bread = $request->route()->getAction()['bread'];
            
            if ($bread instanceof Bread) {
                if ($withRelationships) {
                    $bread->relationships = $this->breadmanager->getModelRelationships(
                        $this->breadmanager->getModelReflectionClass($bread->model),
                        $bread->getModel(),
                        true
                    );
                }

                return $bread;
            }
        }
        abort(404);
    }
}
