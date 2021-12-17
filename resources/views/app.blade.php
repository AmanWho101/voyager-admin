<!doctype html>
<html lang="{{ Voyager::getLocale() }}" dir="{{ __('voyager::generic.is_rtl') == 'true' ? 'rtl' : 'ltr' }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="base-url" content="{{ Str::finish(route('voyager.dashboard'), '/') }}">
    @if ($devServerWanted && $devServerAvailable)
        <meta name="asset-url" content="{{ $devServerUrl }}">
    @else
        <meta name="asset-url" content="{{ Voyager::assetUrl() }}">
    @endif
    
    <meta name="description" content="{{ Voyager::setting('admin.description', 'Voyager II') }}">
    <meta http-equiv="Cache-control" content="public">

    <title>{{ $title }} - {{ Voyager::setting('admin.title', 'Voyager II') }}</title>

    {!! Voyager::voyagerAssets() !!}

    @foreach (resolve(\Voyager\Admin\Manager\Plugins::class)->getAllPlugins() as $plugin)
        @if ($plugin instanceof \Voyager\Admin\Contracts\Plugins\Features\Provider\CSS)
            <link href="{{ Voyager::assetUrl('plugin/'.Str::slug($plugin->name).'.css') }}" rel="stylesheet">
        @endif
    @endforeach

    @foreach (Voyager::getAssets()->where('type', 'css') as $asset)
        <link href="{{ $asset['path'] }}" rel="stylesheet">
    @endforeach
</head>

<body>
    <div id="tooltips" class="h-0 w-0"></div>
    @inertia
</body>

@routes
<!--
@foreach (resolve(\Voyager\Admin\Manager\Plugins::class)->getAllPlugins() as $plugin)
    @if ($plugin instanceof \Voyager\Admin\Contracts\Plugins\Features\Provider\JS)
        <script src="{{ Voyager::assetUrl('plugin/'.Str::slug($plugin->name).'.js') }}"></script>
    @endif
@endforeach

@foreach (Voyager::getAssets()->where('type', 'js') as $asset)
    <script src="{{ $asset['path'] }}"></script>
@endforeach
-->

@yield('js')
</html>
