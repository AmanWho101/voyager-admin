<?php

namespace Voyager\Admin\Traits\Facade;

use Voyager\Admin\Manager\{Breads as BreadManager, Menu as MenuManager, Plugins as PluginManager, Settings as SettingManager};

trait Routes
{
    /**
     * The route prefix that Voyager will use when registering routes.
     *
     * @var string
     */
    public static $routePath = '/admin';

    /**
     * Set the callback that should be used to authenticate Horizon users.
     */
    public static function path(string $pathPrefix = '/admin'): static
    {
        static::$routePath = $pathPrefix;

        return new static(
            app(BreadManager::class),
            app(MenuManager::class),
            app(PluginManager::class),
            app(SettingManager::class)
        );
    }

    /**
     * Generate a Voyager route URL for Voyager resources and paths.
     */
    public function route(string $name, array $parameters = [], bool $absolute = true): string
    {
        return route('voyager.' . $name, $parameters, $absolute);
    }

    /**
     * Get Voyagers route path.
     */
    public function getRoutePath(): string
    {
        return $this::$routePath;
    }
}