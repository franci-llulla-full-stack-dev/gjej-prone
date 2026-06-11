<!DOCTYPE html>
<html lang="sq">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        @php
            $meta    = $page['props']['meta'] ?? [];
            $ogTitle = $meta['og_title'] ?? config('app.name') . ' — Tregu Imobiliar në Shqipëri';
            $ogDesc  = $meta['og_description'] ?? 'Platforma më e mirë për të gjetur, blerë, ose dhënë me qira prona në Shqipëri. Publiko pronën tënde falas.';
            $ogImage = $meta['og_image'] ?? url('/logo-2.png');
            $ogUrl   = $meta['og_url'] ?? url()->current();
        @endphp

        <meta name="description" content="{{ $ogDesc }}" />

        <!-- Open Graph -->
        <meta property="og:type"        content="website" />
        <meta property="og:site_name"   content="{{ config('app.name') }}" />
        <meta property="og:title"       content="{{ $ogTitle }}" />
        <meta property="og:description" content="{{ $ogDesc }}" />
        <meta property="og:image"       content="{{ $ogImage }}" />
        <meta property="og:url"         content="{{ $ogUrl }}" />

        <!-- Twitter Card -->
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content="{{ $ogTitle }}" />
        <meta name="twitter:description" content="{{ $ogDesc }}" />
        <meta name="twitter:image"       content="{{ $ogImage }}" />

        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        @if(env('GA_MEASUREMENT_ID'))
        <!-- Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ env('GA_MEASUREMENT_ID') }}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '{{ env('GA_MEASUREMENT_ID') }}');
        </script>
        @endif

        @viteReactRefresh
        @vite('resources/js/app.jsx')
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>