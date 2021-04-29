<!doctype html>
<html lang="{{ Voyager::getLocale() }}" locales="{{ implode(',', Voyager::getLocales()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="base-url" content="{{ Str::finish(route('voyager.dashboard'), '/') }}">
    <meta name="description" content="{{ Voyager::setting('admin.description', 'Voyager II') }}">
    <meta http-equiv="Cache-control" content="public">

    <title>{{ __('voyager::auth.login') }} - {{ Voyager::setting('admin.title', 'Voyager II') }}</title>
    <link href="{{ Voyager::assetUrl('css/voyager.css') }}" rel="stylesheet">
    @php $fontProvidedByPlugin = false; @endphp
    @foreach (resolve(\Voyager\Admin\Manager\Plugins::class)->getAllPlugins() as $plugin)
        @if ($plugin instanceof \Voyager\Admin\Contracts\Plugins\Features\Provider\CSS)
            <link href="{{ Voyager::assetUrl('plugin/'.Str::slug($plugin->name).'.css') }}" rel="stylesheet">

            @if ($plugin instanceof \Voyager\Admin\Contracts\Plugins\Features\Provider\Font)
                @php $fontProvidedByPlugin = true; @endphp
            @endif
        @endif
    @endforeach

    @if (!$fontProvidedByPlugin)
        <link href="{{ Voyager::assetUrl('css/font.css') }}" rel="stylesheet">
    @endif
</head>

<body>
    <div id="voyager" class="login sm:px-6 lg:px-8" data-page="{{ json_encode($page) }}"></div>
</body>

@routes

@if (isset($voyagerDevServer))
    <script src="{{ $voyagerDevServer }}js/voyager.js"></script>
    <script src="{{ $voyagerDevServer }}js/icons.js"></script>
@else
    <script src="{{ Voyager::assetUrl('js/voyager.js') }}"></script>
    <script src="{{ Voyager::assetUrl('js/icons.js') }}"></script>
@endif
<script>
createVoyager({
    'localization': {!! Voyager::getLocalization() !!}
});
</script>
@foreach (resolve(\Voyager\Admin\Manager\Plugins::class)->getAllPlugins() as $plugin)
    @if ($plugin instanceof \Voyager\Admin\Contracts\Plugins\Features\Provider\JS)
        <script src="{{ Voyager::assetUrl('plugin/'.Str::slug($plugin->name).'.js') }}" type="text/javascript"></script>
    @endif
@endforeach
<script>
mountVoyager();
</script>
@yield('js')
</html>
