/**
 * uses the following sources of configuration settings in descending priority:
 *  1. command line arguments
 *  2. environment variables
 *  3. Bluemix's special VCAP_SERVICES
 *  4. environment-specific app-<env>.json file in the "config" folder
 *  5. default app.json in the "config" folder
 */
var nconf = require('nconf');

/**
 *
 * @param {string} [baseDir] - optional directory to resolve config files. FOR TEST PURPOSES ONLY!
 * @returns {object} - nconf object suitable for resolving configuration options
 */
module.exports = function(baseDir) {

    var env = process.env.NODE_ENV || 'development';

    /*
     * arguments passed in from the command line takes highest precedence. e.g `node app.js --CDB_URL=xxx`
     */
    nconf.argv();

    /*
     * next priority is environment variables. they can be defined in the shell command. e.g `CDB_URL=xxx node app.js`.
     * or when deployed to bluemix it can be defined in the application's environment variables page
     * '__' is the separator for nested properties: `auth__googlesheet__client_id=foo`
     */
    nconf.env('__');

    /*
     * next priority is values in VCAP_SERVICES defined by service bindings for an application in Bluemix.
     */

    if (typeof process.env.VCAP_SERVICES === 'string') {
        //Build up the object to set into defaults
        // NOTE: if we call nconf.defaults multiple times it will override previous calls.

        //Get VCAP services, parse and set into our defaults object
        var SERVICES = JSON.parse(process.env.VCAP_SERVICES);
        var defaults = SERVICES;

        // Cloudant DB URL is already known elsewhere as CDB_URL ... copy it over
        if (SERVICES.cloudantNoSQLDB && SERVICES.cloudantNoSQLDB[0].credentials){
            var vcap_cloudant_url = SERVICES.cloudantNoSQLDB[0].credentials.url;
            defaults.CDB_URL = vcap_cloudant_url;
        }
        // Data Cache
        if (SERVICES["DataCache"] && SERVICES["DataCache"][0] && SERVICES["DataCache"][0].credentials){
            var vcap_dcClt = SERVICES["DataCache"][0].credentials;
            console.log(vcap_dcClt);
            defaults.DC_CLT = vcap_dcClt;
        }
        // Message Hub configuration ... copy them over too
        // if (SERVICES.messagehub && SERVICES.messagehub[0].credentials) {

        //     // MH_REST_URL, MH_ADMIN_URL, MH_API_KEY
        //     var vcap_messagehub_credentials_kafka_rest_url = SERVICES.messagehub[0].credentials.kafka_rest_url;
        //     var vcap_messagehub_credentials_api_key = SERVICES.messagehub[0].credentials.api_key;
        //     var vcap_messagehub_credentials_kafka_admin_url = SERVICES.messagehub[0].credentials.kafka_admin_url;
        //     defaults.MH_REST_URL = vcap_messagehub_credentials_kafka_rest_url;
        //     defaults.MH_ADMIN_URL = vcap_messagehub_credentials_kafka_admin_url;
        //     defaults.MH_API_KEY = vcap_messagehub_credentials_api_key;

        //     // MH_BROKERS, MH_USER, MH_PASS
        //     var vcap_messagehub_credentials_kafka_brokers_sasl = SERVICES.messagehub[0].credentials.kafka_brokers_sasl;
        //     var vcap_messagehub_credentials_user = SERVICES.messagehub[0].credentials.user;
        //     var vcap_messagehub_credentials_password = SERVICES.messagehub[0].credentials.password;
        //     defaults.MH_BROKERS = vcap_messagehub_credentials_kafka_brokers_sasl;
        //     defaults.MH_USER = vcap_messagehub_credentials_user;
        //     defaults.MH_PASS = vcap_messagehub_credentials_password;
        // }
        //Set all of the above into defaults
        nconf.defaults(defaults);
    } else {
        //We need to create the defaults store anyway, otherwise if we come through here later
        // (when we might have VCAP services) and try to add it it will be out of position in the list.
        nconf.defaults({whitelist: true});
    }

    /*
     * next go to config files specific to an environment if they exist
     */
    if (baseDir === undefined) {
        baseDir = '.';
    }
    var filename = baseDir + '/config/app-' + env + '.json';
    nconf.file(env, filename);

    /*
     * finally go to the config file that are common for all environments
     */
    nconf.file('globalDefaults', './config/app.json');

    return nconf;
};
