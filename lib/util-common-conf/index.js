var path = require('path');

module.exports = commonConfig;

function commonConfig(app, currentPath) {
  app.configure(conf);
  app.configure('production', productionConf);

  function conf() {
    app.set('view engine', 'jade');
    app.set('views', path.join(currentPath, 'views'));
  }
  
  function productionConf() {
    app.set('view cache', false);
  }
  
  return app;
}