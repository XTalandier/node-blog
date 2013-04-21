/**
 * Module dependencies.
 */
global.dbconfig     = require('./config/config.json');
global.node_env     = process.env['NODE_ENV'];

var express = require('express')
  , routes  = require('./routes')
  , path    = require('path')
  , http    = require('http');

  //, auth    = require('./modules/authentication');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);

app.set('view engine', 'html')
app.set('layout', 'layouts/repositories');

app.enable('view cache');
app.engine('html', require('hogan-express'));



app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env') || 'test' == app.get('env')) {
  app.use(express.errorHandler());
}
/*
app.all('*', function(req, res, next) {
  if (/^\/public/g.test(req.url)) {
    return next();
  } else if (req.session.user !== null && req.session.user !== undefined) {
    global.user_id = req.session.user.id;
    return next();
  } else {
    res.redirect('public/login');
  }
});
*/

module.exports = app;


http.createServer(app).listen(app.get('port'), function(){
  node_env != 'production' && console.log('Express server listening on port ' + app.get('port'));
});
