var ldap = require('ldapjs');
var ldapConfig = require('../config/ldap.json');

exports.getUsersInfo = function( queryInput, callback ) {

    var client = ldap.createClient({
      url: ldapConfig.url
    });

    var queryFilter = convertToFilter(queryInput);
    var opts = {
      filter: queryInput,
      scope: 'sub',
      sizeLimit: 100,
      attributes: ldapConfig.attributes
    };

    client.search(ldapConfig.base, opts, function(err, res) {
      var results = new Array();
      if(err){
        console.log(err);
      }else{
        //assert.ifError(err);
        res.on('searchEntry', function(entry) {
          console.log('entry: ' + JSON.stringify(entry.object));
          results.push(entry.object);
        });
        res.on('searchReference', function(referral) {
          console.log('referral: ' + referral.uris.join());
        });
        res.on('error', function(err) {
          console.error('error: ' + err.message);
          callback(results);
        });
        res.on('end', function(result) {
          console.log('status: ' + result.status);
          callback(results);
        });
      }
      
    });
}

/**
*
* Filter the invalid addr.
* Identify the category, like email, notesId, and etc.
* Create the ldap filter string.
*
*/
convertToFilter = function ( queryInput ){

  var inputArray = queryInput.split(",");
  var queryFilter = '(|';
  for (var i = inputArray.length - 1; i >= 0; i--) {
    var input = inputArray[i].trim();

    if(input.includes('/IBM')){
      //Handle */*/IBM or */*/IBM@*
      input = input.replace(/@\w+/,'');
      console.log( 'Valid notesId addr: ' + input);

    }else if(input.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(.ibm.com)/)>=0){
      //Handle *@*.ibm.com
      console.log( 'Valid email addr: ' + input);
    }else{
      console.log('Invalid input addr: ' + input);
    }
  }

}

