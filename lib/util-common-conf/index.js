var path = require('path');

module.exports = commonConfig;

function commonConfig(app, curpath) {
  app.configure(conf);
  app.configure('production', productionConf);

  function conf() {
    app.set('view engine', 'jade');
    app.set('views', path.join(curpath, 'views'));
  }
  
  function productionConf() {
    app.set('view cache', false);
  }
  
  return app;
}