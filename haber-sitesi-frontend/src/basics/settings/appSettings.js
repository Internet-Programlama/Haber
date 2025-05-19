export const APP_SETTINGS = {
    NAME: 'Haber Sitesi',
    VERSION: '1.0.0',
    DEFAULT_LANGUAGE: 'tr',
    ENVIRONMENT: process.env.NODE_ENV || 'development',

    FEATURES: {
        DARK_MODE: true,
        SEARCH_AUTOCOMPLETE: true,
        USER_REGISTRATION: true
    },

    PAGINATION: {
        DEFAULT_PAGE_SIZE: 10,
        MAX_PAGE_SIZE: 50
    },

    API: {
        BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000',
        TIMEOUT: 5000
    }
};