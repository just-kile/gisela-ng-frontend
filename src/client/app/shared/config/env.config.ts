// Feel free to extend this interface
// depending on your app specific config.
export interface EnvConfig {
    API?: string;
    ENV?: string;
    APP_TITLE?: string;
}

let obj: EnvConfig = JSON.parse('<%= ENV_CONFIG %>');
obj.APP_TITLE = '<%= APP_TITLE %>';
export const Config: EnvConfig = obj;

