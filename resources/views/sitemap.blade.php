<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    @foreach($staticPages as $page)
    <url>
        <loc>{{ $page['url'] }}</loc>
        <changefreq>{{ $page['changefreq'] }}</changefreq>
        <priority>{{ $page['priority'] }}</priority>
    </url>
    @endforeach

    @foreach($properties as $property)
    <url>
        <loc>{{ url('/properties/' . $property->id) }}</loc>
        <lastmod>{{ $property->updated_at->toAtomString() }}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    @endforeach

</urlset>