import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from "react-hot-toast";
import '../css/app.css';
import 'react-datepicker/dist/react-datepicker.css';
import Layout from './layouts/Layout.jsx';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import marker images so Vite bundles them
import markerIcon2x from './leaflet-images/marker-icon-2x.png';
import markerIcon from './leaflet-images/marker-icon.png';
import markerShadow from './leaflet-images/marker-shadow.png';

// Override Leaflet default icon globally
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./pages/**/*.jsx', { eager: true })
        let page = pages[`./pages/${name}.jsx`];

        page.default.layout = page.default.layout || ((page) => (
            <Layout children={page} />
        ));

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
