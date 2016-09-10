function _phoneGapSettings() { 
 return {
    "appId": "ca.tjia.motion",
    "preferences": {
        "permissions": "",
        "orientation": "default",
        "target-device": "universal",
        "fullscreen": "false",
        "webviewbounce": "true",
        "prerendered-icon": "true",
        "stay-in-webview": "false",
        "ios-statusbarstyle": "black-opaque",
        "detect-data-types": "true",
        "exit-on-suspend": "false",
        "show-splash-screen-spinner": "true",
        "auto-hide-splash-screen": "true",
        "disable-cursor": "false",
        "android-minSdkVersion": "14",
        "android-installLocation": "internalOnly",
        "phonegap-version": "cli-6.0.0",
        "android-maxSdkVersion": "",
        "android-targetSdkVersion": "",
        "KeepRunning": "true",
        "splash-screen-duration": "5000",
        "ErrorUrl": "error.html",
        "LoadingDialog": "Please wait, the app is loading.",
        "LoadingPageDialog": "Please wait, the data is loading.",
        "LoadUrlTimeoutValue": "20000",
        "AndroidPersistentFileLocation": "Internal"
    },
    "plugins": {
        "network-information": "npm",
        "splashscreen": "npm",
        "org.crosswalk.engine": "pgb",
        "whitelist": "npm"
    }
};
}