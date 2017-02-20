const SpecReporter = require('jasmine-spec-reporter');

const config = {
    baseUrl: 'http://localhost:5555/',

    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        browserName: 'chrome',
        'chromeOptions': {
            'args': ['no-sandbox']
        }
    },

    specs: [
        './dist/e2e/**/*.e2e-spec.js'
    ],

    exclude: [],

    // 'jasmine' by default will use the latest jasmine framework
    framework: 'jasmine',

    // allScriptsTimeout: 110000,

    jasmineNodeOpts: {
        // showTiming: true,
        showColors: true,
        isVerbose: false,
        includeStackTrace: false,
        // defaultTimeoutInterval: 400000
    },

    directConnect: true,

    onPrepare: function () {
        browser.ignoreSynchronization = false;
    },


    /**
     * Angular 2 configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
     * `rootEl`
     */
    useAllAngular2AppRoots: true
};


exports.config = config;
