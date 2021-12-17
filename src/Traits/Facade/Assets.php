<?php

namespace Voyager\Admin\Traits\Facade;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

trait Assets
{
    protected Collection $assets;
    protected array|null $manifest = null;

    /**
     * Add a javascript file.
     */
    public function addJavascript(string $path): void
    {
        $this->assets->push([
            'type'  => 'js',
            'path'  => $path,
        ]);
    }

    /**
     * Add a CSS file.
     */
    public function addCSS(string $path): void
    {
        $this->assets->push([
            'type'  => 'css',
            'path'  => $path,
        ]);
    }

    /**
     * Get all custom assets.
     */
    public function getAssets(): Collection
    {
        return $this->assets;
    }

    /**
     * Generate an absolute URL for an asset-file.
     */
    public function assetUrl(?string $path = null): string
    {
        if ($path === null) {
            return route('voyager.voyager_assets').'?path=';
        }

        return route('voyager.voyager_assets').'?path='.urlencode($path).'&version='.$this->getVersion();
    }

    public function voyagerAssets($entry = 'js/voyager.ts'): string
    {
        if ($this->settingmanager->setting('admin.dev-server', false)) {
            // Dev server is wanted
            try {
                $url = 'http://localhost:3000/'.$entry;
                Http::timeout(1)->get($url)->ok();
                // Dev server is available
                return '<script type="module" crossorigin src="'.$url.'"></script>';
            } catch (\Exception $e) {
                // TODO: Share a warning message here?
            }
        }

        // Dev server is disabled or not available. Return build files from manifest
        if ($this->manifest == null) {
            $this->manifest = json_decode(file_get_contents(realpath(dirname(__DIR__, 3).'/resources/assets/dist/manifest.json')), true);
        }

        $assets = '';

        // Main javascript file
        $assets .= '<script type="module" src="'.$this->assetUrl($this->manifest[$entry]['file']).'"></script>';
        // Javascript to preload
        foreach ($this->manifest[$entry]['imports'] as $import) {
            $assets .= "\n    <link rel=\"modulepreload\" href=\"".$this->assetUrl($this->manifest[$import]['file'])."\">";
        }
        // CSS
        foreach ($this->manifest[$entry]['css'] as $css) {
            $assets .= "\n    <link rel=\"stylesheet\" href=\"".$this->assetUrl($css)."\">";
        }

        return $assets;
    }
}