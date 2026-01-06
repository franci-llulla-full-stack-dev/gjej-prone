export const breadcrumbMap = {
    // Properties
    properties: [
        { label: 'Pronat e mia', href: '/properties' },
    ],
    property_edit: (property) => [
        { label: 'Pronat e mia', href: '/properties' },
        { label: `Edito Pronen: ${property?.title || ''}` },
    ],
    property_create: [
        { label: 'Pronat e mia', href: '/properties' },
        { label: 'Shto Prone' },
    ],
    property_show: (property) => [
        { label: 'Pronat e mia', href: '/properties' },
        { label: property?.title || '' },
    ],

    // Requests
    requests: [
        { label: 'Kerkesat', href: '/requests' },
    ],
    request_show: (request) => [
        { label: 'Kerkesat', href: '/requests' },
        { label: request?.title || '' },
    ],

    // User-specific requests
    user_requests: [
        { label: 'Kerkesat e mia', href: '/user/requests' },
    ],
    user_request_edit: (request) => [
        { label: 'Kerkesat e mia', href: '/user/requests' },
        { label: `Edito: ${request?.title || ''}` },
    ],
};
