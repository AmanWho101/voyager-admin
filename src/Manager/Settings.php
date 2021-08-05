<?php

namespace Voyager\Admin\Manager;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Voyager\Admin\Classes\Setting;
use Voyager\Admin\Facades\Voyager as VoyagerFacade;

class Settings
{
    protected string $path;
    protected ?Collection $settings = null;

    public function __construct()
    {
        $this->path = Str::finish(storage_path('voyager'), '/').'settings.json';
    }

    /**
     * Sets the path where the settings-file is stored.
     *
     * @param string $path
     *
     * @return string the current path
     */
    public function setPath($path = null)
    {
        if (!is_null($path)) {
            $this->path = $path;
        }

        $this->load(true);

        return $this->path;
    }

    public function get(): ?Collection
    {
        $this->load();
        return $this->settings;
    }

    // Set a settings-value based on the key. When locale is not provided and the setting is translatable, it expects an array of locale-values
    public function set(string $key, mixed $value, ?string $locale = null, bool $save = true): void
    {
        $this->load();
        $setting = $this->getSettingsByKey($key);

        if ($setting->count() == 1) {
            $setting = $setting->first();
            if ($setting->translatable && !is_array($value) && $locale == null) {
                throw new \Exception('Setting `'.$key.'` is translatable but no locale was provided and the value is not an array');
            }
            if ($setting->translatable && is_array($value) && $locale == null) {
                $setting->value = array_merge($setting->value ?? [], $value);
            } else if ($setting->translatable && $locale !== null) {
                $setting->value[$locale] = $value;
            } else {
                $setting->value = $value;
            }

            // Save settings when $save is true. Useful when you want to batch-update settings
            if ($save) {
                $this->save();
            }
        } else {
            throw new \Exception('Setting with key `'.$key.'` does not exist or matches multiple settings');
        }
    }

    public function merge(array $settings): void
    {
        $this->load();
        $this->settings = $this->settings?->merge($settings);
    }

    public function setting(?string $key = null, mixed $default = null, bool $translate = true): mixed
    {
        $this->load();
        $settings = $this->getSettingsByKey($key);

        // Modify collection and only include key/value pairs
        $settings = $settings->mapWithKeys(function ($setting) use ($translate, $default) {
            $key = $setting->key;
            if ($setting->group !== null && $setting->group !== '') {
                $key = implode('.', [$setting->group, $setting->key]);
            }
            if ($translate && ($setting->translatable ?? false)) {
                return [$key => VoyagerFacade::translate($setting->value, app()->getLocale(), config('app.fallback_locale')) ?? $default];
            }

            return [$key => $setting->value ?? $default];
        })->transform(function ($value) {
            if ($value === 'true') {
                return true;
            } elseif ($value === 'false') {
                return false;
            }

            return $value;
        });

        if ($settings->count() == 0) {
            return $default;
        } elseif ($settings->count() == 1) {
            $settings = $settings->first();
        }

        return $settings;
    }

    public function exists(?string $group, string $key): bool
    {
        $this->load();

        return $this->settings?->where('group', $group)->where('key', $key)->count() > 0;
    }

    public function save(mixed $content = null): void
    {
        if (is_null($content)) {
            $content = $this->settings;
        }
        $this->load();
        if (!is_string($content)) {
            $content = json_encode($content, JSON_PRETTY_PRINT);
        }

        VoyagerFacade::writeToFile($this->path, $content);
        $this->load(true);
    }

    public function getSettingsByKey(?string $key): Collection
    {
        $key = $key ?? '';
        $this->load();
        if (is_null($this->settings)) {
            return collect();
        }
        if (Str::contains($key, '.')) {
            // We are looking for a setting in a group
            list($group, $key) = explode('.', $key);

            return $this->settings->where('group', $group)->where('key', $key);
        } elseif (!empty($key)) {
            // We are looking for a setting without a group OR all group-settings
            $group = $this->settings->where('group', null)->where('key', $key);

            if ($group->count() == 0) {
                // All settings in a group
                return $this->settings->where('group', $key);
            } else {
                // Setting without a group but matching key
                return $group;
            }
        }

        return $this->settings;
    }

    public function load(bool $force = false): void
    {
        if (!$this->settings || (is_array($this->settings) && count($this->settings) == 0) || $force) {
            VoyagerFacade::ensureFileExists($this->path, '[]');
            $this->settings = collect(VoyagerFacade::getJson(File::get($this->path), []));
        }
    }

    public function unload(): void
    {
        $this->settings = null;
    }
}