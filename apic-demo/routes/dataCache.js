var fs = require('fs');

exports.postkey = function(req, res) {
  var dcClt = req.app.locals.dcClt;
  if ( dcClt ) {
    var map = req.body.map;
    if ( map && map.trim().length==0 ) map = null;

    dcClt.put(map, req.body.key, req.body.value, req.body.contentType, function(err) {
      if ( err ) {
        var msg = 'Cannot insert key *' + req.body.key + '* with value *' + req.body.value + '* and contentType *' + req.body.contentType + '*.';
        var dtls = 'Message details. Status: ' + err.status + ', Message: ' + err.message;
        // res.render('response', { title: 'Error', message: msg, details: dtls });
        res.json({ title: 'Error', message: msg, details: dtls });
      } else {
        msg = 'The key *' + req.body.key + '* has been inserted into map with value *' + req.body.value + '* and contentType *' + req.body.contentType + '*.';
        // res.render('response', { title: 'Success', message: msg});
        res.json({"message":msg});
      }
    });
  } else {
    res.json({ title: 'Error', message: 'There is no DataCache service associated with the App.' });
    // res.render('response', { title: 'Error', message: 'There is no DataCache service associated with the App.' });
  }
};

exports.uploadfile = function(req, res) {
  var dcClt = req.app.locals.dcClt;
  if ( dcClt ) {
    var localfile = req.files.value.path;
    var filesize = req.files.value.size;
    var name = req.files.value.name;
    var type = req.files.value.type;
    if ( req.body.key && req.body.key.trim().length > 0 ) {
      name = req.body.key.trim();
    }
    var map = req.body.map;
    if ( map && map.trim().length==0 ) map = null;

    var bodyStream = fs.createReadStream(localfile);

    dcClt.put(map, name, bodyStream, type, filesize, function(err) {
      if ( err ) {
        var msg = 'Cannot upload file *' + name + '* with contentType *' + type + '* into map.';
        var dtls = 'Message details. Status: ' + err.status + ', Message: ' + err.message;
        res.render('response', { title: 'Error', message: msg, details: dtls });
      } else {
        msg = 'The file *' + name + '* with contentType *' + type + '* has been uploaded into map.';
        res.render('response', { title: 'Success', message: msg});
      }
    });
  } else {
    res.render('response', { title: 'Error', message: 'There is no DataCache service associated with the App.' });
  }
};

exports.getkey = function(req, res) {
  var dcClt = req.app.locals.dcClt;
  if ( dcClt ) {
    var map = req.body.map;
    if ( map && map.trim().length==0 ) map = null;

    dcClt.get(map, req.body.key, function(result) {
      if ( result instanceof Error ) {
        var msg = 'Cannot get key *' + req.body.key + '*';
        var dtls = 'Message details. Status: ' + result.status + ', Message: ' + result.message;
        // res.render('response', { title: 'Error', message: msg, details: dtls });
        res.json({ title: 'Error', message: msg, details: dtls });
      } else {
        var msg = '<div>Value of key <strong>' +
                    req.body.key + '</strong> is<br><xmp>' +
                    result.responseText + '</xmp><br>and contentType is <strong>' +
                    result.responseHeaders['content-type'] + '</strong></div>';
        // res.render('response', { title: 'Success', message: msg });
        res.json({ title: 'Success', message: msg })
      }
    });
  } else {
    res.json({ title: 'Error', message: 'There is no DataCache service associated with the App.' });
    // res.render('response', { title: 'Error', message: 'There is no DataCache service associated with the App.' });
  }
};

exports.delkey = function(req, res) {
  var dcClt = req.app.locals.dcClt;
  if ( dcClt ) {
    var map = req.body.map;
    if ( map && map.trim().length==0 ) map = null;

    dcClt.remove(map, req.body.key, function(err) {
      if ( err ) {
        var msg = 'Cannot delete key *' + req.body.key + '*.';
        var dtls = 'Message details. Status: ' + err.status + ', Message: ' + err.message;
        res.render('response', { title: 'Error', message: msg, details: dtls });
      } else {
        var msg = 'The key *' + req.body.key + '* has been removed.';
        res.render('response', { title: 'Success', message: msg });
      }
    });
  } else {
    res.render('response', { title: 'Error', message: 'There is no DataCache service associated with the App.' });
  }
};

exports.clearmap = function(req, res) {
  var dcClt = req.app.locals.dcClt;
  if ( dcClt ) {
    var map = req.body.map;
    if ( map && map.trim().length==0 ) map = null;

    dcClt.clearMap(map, function(err) {
      if ( err ) {
        var msg = 'Cannot clear map.';
        var dtls = 'Message details. Status: ' + err.status + ', Message: ' + err.message;
        res.render('response', { title: 'Error', message: msg, details: dtls });
      } else {
        var msg = 'All keys in the map has been removed.';
        res.render('response', { title: 'Success', message: msg });
      }
    });
  } else {
    res.render('response', { title: 'Error', message: 'There is no DataCache service associated with the App.' });
  }
};
