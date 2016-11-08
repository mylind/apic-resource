module.exports = {
    logging: function() {
        return require('./log');
    },
    config: function() {
        return require('./config');
    },
    wxs: function() {
    	return require('./wxs');
    }
};
