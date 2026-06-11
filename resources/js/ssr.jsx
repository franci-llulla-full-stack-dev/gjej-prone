import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { renderToString } from 'react-dom/server';
import Layout from './layouts/Layout.jsx';

createServer(page =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: name => {
            const pages = import.meta.glob('./pages/**/*.jsx', { eager: true });
            const page = pages[`./pages/${name}.jsx`];
            page.default.layout = page.default.layout || (page => <Layout>{page}</Layout>);
            return page;
        },
        setup: ({ App, props }) => <App {...props} />,
    })
);