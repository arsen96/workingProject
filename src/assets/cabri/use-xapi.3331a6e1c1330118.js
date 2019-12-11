/* If project is PIIA */
if (params.get('env') === 'piia') {
    const piiaInfo = {
        eTok: params.get('e_tok'),
        moreInfoUrl: params.get('more_info_url')
    };

    if (piiaInfo.eTok && piiaInfo.moreInfoUrl) {

        // get the other parameters from the server
        axios.get(piiaInfo.moreInfoUrl, {
            headers: {
                'e_tok': piiaInfo.eTok
            }
        }).then((info) => {
            const decodedToken = jwt_decode(piiaInfo.eTok);
            if (decodedToken) {
                postal.subscribe({
                    channel: "electron",
                    topic: "babylone.ready",
                    callback: function (data, envelope) {
                        // load the clmc
                        piiaInfo.clmc = info.data.clmc;
                        piiaInfo.serverUrl = info.data.server_url;
                        piiaInfo.eUrl = info.data.e_url;
                        piiaInfo.serverResponseURL = info.data.server_response_url;

                        // load clmc in cabri
                        store.getters.cabri.loadDocument(piiaInfo.clmc, false);

                        const properties = store.getters.cps.getDocumentProperties();

                        store.getters.cabri.Channel.subscribe('document.loaded', ()=>{
                            const cps = store.getters.cps;
                            console.log(`:: Cabri Score Info :: (raw=${cps.getScore()} | max=${cps.getScoreMax()} | threshold=${cps.getScoreThreshold()})`);
                        });

                        const statementInfo = {
                            actorAccountName: decodedToken.uid,
                            actorAccountHomePage: `https://educlever.io/iri/accounts/${decodedToken.uid}`,
                            //todo catch if clmc is not defined
                            objectID: `piiamaths:${piiaInfo.clmc.substring(piiaInfo.clmc.lastIndexOf('/') + 1, piiaInfo.clmc.lastIndexOf('.clmc')).toLowerCase()}`,
                            definitionTitle: properties.title || 'Ressource Cabri', // todo get it from cps
                            definitionDescription: properties.description || 'Ressource Cabri', // todo  get it from cps
                            definitionType: 'http://cabri.com/xapi/activities/question', // todo get it from cps
                            definitionExtension: {
                                'http://educlever.io/xapi/extensions/corpus': 'piiamaths',
                                'http://educlever.io/xapi/extensions/playerurl':
                                    `${piiaInfo.serverUrl}?clmc=${piiaInfo.clmc}`
                            },
                            //contextActivitiesParentID: '',
                            contextContent: decodedToken.ctx,
                            playerURL: piiaInfo.serverUrl,
                            serverResponseURL: piiaInfo.serverResponseURL,
                            eTok: piiaInfo.eTok
                        };

                        const lrs = {
                            endpoint: decodedToken.lrs,
                            auth: decodedToken.lrsauth
                        };

                        // initialize xapi
                        xAPI['piia'].init(lrs, statementInfo);

                        xAPI['piia'].sendInitialized(false);
                    }
                });

                postal.subscribe({
                    channel: "statement",
                    topic: "score",
                    callback: function (data, envelope) {
                        xAPI['piia'].sendAnswered().then(() => {
                            xAPI['piia'].sendCompleted().then(() => {
                                window.location.replace(piiaInfo.eUrl);
                            })
                        });

                    }
                });

                window.onbeforeunload = function () {
                    //xAPI['piia'].sendCompleted();
                };
            }

        }).catch(err => {
            // if no info have been recieved (token may be not valid), we show an empty clmc page and the toolbar
            // todo show toolbar (when token is not valid or there is no token)
        })
    }

}
/*if project is Mathscope */
else if (
    params.get('env') === 'mathscope'
    && xapi_actor_account_name
    && resource_link_id
    && xapi_activity_id
    && xapi_context_contextActivities_parent_id
    && xapi_context_extensions_sessionid
    && xapi_actor_account_homePage) {

    window.onbeforeunload = function () {
        if (!xAPI['mathscope'].passedFailedWasSent)
            xAPI['mathscope'].sendPassedFailed();
        xAPI['mathscope'].sendTerminated();
    };

    postal.subscribe({
        channel: "xapi",
        topic: "application.loaded",
        callback: function (data, envelope) {
            xAPI['mathscope'].sendInitialized(false);
        }
    });

    postal.subscribe({
        channel: "statement",
        topic: "score",
        callback: function (data, envelope) {
            xAPI['mathscope'].sendPassedFailed();
        }
    });

}