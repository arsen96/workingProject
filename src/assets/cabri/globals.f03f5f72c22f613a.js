"use strict";
const params = new URLSearchParams(window.location.search);

var Globals = {
    FileToLoad: params.get("clmc") || "default.clmc",
    Locale: params.get("lang"),
    AltGraphKeys: true,
    Toolbar: matchDevOrBeta() || params.has("toolbar") ? "express" : null,
    Primary: params.has("primary"),
    PageHorizon: params.has("horizon"),
    Fps: matchDevOrBeta(),
    FileManager: matchDevOrBeta() || params.has("toolbar"),
    NewSeed: params.has('newSeed')
};

function getKeyValue(sKeyVal, key) {
    var tabKeyVal = sKeyVal.split('&');
    for (var i = 0; i < tabKeyVal.length; i++) {
        var tabKey = tabKeyVal[i].split('=');
        if (tabKey[0] == key) {
            return decodeURIComponent(tabKey[1]);
        }
    }
    return null;
}

function matchDevOrBeta() {
    const env = window.location.pathname.split('/')[1];
    return (env === 'dev') || (env === 'beta');
}

if (params.get('env') === 'mathscope') {
    const xapi_actor_account_name = params.get('xapi_actor_account_name');
    const xapi_activity_id = params.get('xapi_activity_id');
    const resource_link_id = params.get('resource_link_id');
    if (resource_link_id)
        Globals.FileToLoad = resource_link_id;

    const xapi_context_contextActivities_parent_id = params.get('xapi_context_contextActivities_parent_id');
    const xapi_context_extensions_sessionid = params.get('xapi_context_extensions_sessionid');
    const xapi_actor_account_homePage = params.get('xapi_actor_account_homePage');
    const lti_url = "http://cabricloud.com/mathscope_lti_final";
    const titreCahier = "Cahier De Test Mathscope";

} else if (params.get('env') === 'piia') {
}