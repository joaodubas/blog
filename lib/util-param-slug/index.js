module.exports = param;

function param(app) {
  app.param('slug', slug);

  function slug(req, res, next, val) {
    var regex = /^[\w\-]+$/;
    var captures;
    if (captures = regex.exec(String(val))) {
      req.params.slug = captures[0];
      next();
    } else {
      next('route');
    }
  }
  
  return app;
}