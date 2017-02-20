import { join } from 'path';

import { SeedConfig } from './seed.config';
import {ExtendPackages} from "./seed.config.interfaces";

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

    PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

    FONTS_DEST = `${this.APP_DEST}/fonts`;
    FONTS_SRC = ['src/client/fonts/**'];

    constructor() {
        super();
        this.APP_TITLE = 'Gisela Frontend';

        /* Enable typeless compiler runs (faster) between typed compiler runs. */
        // this.TYPED_COMPILE_INTERVAL = 5;

        // Add `NPM` third-party libraries to be injected/bundled.
        this.NPM_DEPENDENCIES = [
            ...this.NPM_DEPENDENCIES,
            { src: 'bootstrap/dist/css/bootstrap.css', inject: true },
            { src: 'hamburgers/dist/hamburgers.css', inject: true }
            // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
            // {src: 'lodash/lodash.min.js', inject: 'libs'},
        ];

        // Permanently enable scss compilation for this project
        this.ENABLE_SCSS = true;

        // Add `local` third-party libraries to be injected/bundled.
        this.APP_ASSETS = [
            {src: `${this.APP_SRC}/libs/smooth-scroll/smooth-scroll.js`, inject: true, vendor: true}
            // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
            // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
        ];

        this.SYSTEM_BUILDER_CONFIG.packageConfigPaths.push(
            join('node_modules', '@ng-bootstrap', '*', 'package.json')
        );

        this.SYSTEM_BUILDER_CONFIG.packages['@ng-bootstrap/ng-bootstrap'] = {
            main: 'index.js',
            defaultExtension: 'js'
        };

        this.SYSTEM_CONFIG_DEV.paths['@ng-bootstrap/ng-bootstrap'] =
            `${this.APP_BASE}node_modules/@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js`;

        // Add the bootstrap scss files so we can modify its variables
        this.PLUGIN_CONFIGS['gulp-sass'].includePaths.push(
            './node_modules/bootstrap/scss',
            './node_modules/hamburgers/_sass'
        );

        let additionalPackages: ExtendPackages[] = [
            {
                // Name under which the dependecy will be known, so we can do
                //import {} from [NAME]
                name: 'angular2-google-maps/core',
                // Path to the npm js file
                path: `${this.NPM_BASE}/angular2-google-maps/core/core.umd.js`,
                // The package meta is not required by the ExtendPackages interface but
                // you will need to add this so the build process bundles the js file
                packageMeta: {
                    main: 'index.js',
                    defaultExtension: 'js'
                }
            },
            {
                // Name under which the dependecy will be known, so we can do
                //import {} from [NAME]
                name: 'rxjs',
                // Path to the npm js file
                path: `${this.NPM_BASE}/rxjs/Rx.js`,
                // The package meta is not required by the ExtendPackages interface but
                // you will need to add this so the build process bundles the js file
                packageMeta: {
                    main: 'Rx.js',
                    defaultExtension: 'js'
                }
            },
            {
                // Name under which the dependecy will be known, so we can do
                //import {} from [NAME]
                name: '@ng-bootstrap/ng-bootstrap',
                // Path to the npm js file
                path: `${this.NPM_BASE}/@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js`,
                // The package meta is not required by the ExtendPackages interface but
                // you will need to add this so the build process bundles the js file
                packageMeta: {
                    main: 'index.js',
                    defaultExtension: 'js'
                }
            }
        ];

        this.addPackagesBundles(additionalPackages);
        // Add packages (e.g. ng2-translate)
        // let additionalPackages: ExtendPackages[] = [{
        //   name: 'ng2-translate',
        //   // Path to the package's bundle
        //   path: 'node_modules/ng2-translate/bundles/ng2-translate.umd.js'
        // }];
        //
        // this.addPackagesBundles(additionalPackages);

        /* Add proxy middlewar */
        // this.PROXY_MIDDLEWARE = [
        //   require('http-proxy-middleware')({ ws: false, target: 'http://localhost:3003' })
        // ];

        /* Add to or override NPM module configurations: */
        // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };

        // "ghostMode: false" fixes smooth scrolling behaviour on different screen-sizes
        this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { notify: false, ghostMode: false});
    }
}
