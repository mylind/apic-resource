/**
 * Copyright (c) 2016 IBM Cloudant, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */


var Cloudant = require('cloudant');
var username = '48951261-39d9-4d43-bc2d-b1b5937224f1-bluemix';
var password = '1e5a370759913e5fc75eb3b719edf48837c4ad95a7b4c073dfac56c1147c7015';
var dbname="cars";
var modelIndex="CHL-TEST";
var model="cloudant";

var cloudant = Cloudant({account:username, password:password});
var db = cloudant.db.use(dbname);

db.list(function(err, body) {
  if (!err) {
    var len = body.rows.length;
    console.log('total # of docs -> '+len);

    if(len == 0) {
      console.log("No doc in the db.");  

    } else {

      body.rows.forEach(function(document) {
        db.get(document.id, { revs_info: true }, function(err, doc) {
          if (!err) {
            doc[modelIndex]=model;
            db.insert(doc, function(err, data) {
              len--;
              if(!err)
              {
                console.log(len + " doc waiting for update.");
              } else {
                console.log("Error:", err);
              }
            });

          } else {
            console.log(err);
          }
        });
          
      });
    }
      
  } else {
    console.log(err);
  }
});
