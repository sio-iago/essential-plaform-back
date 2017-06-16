/**
 * Service for registering routes and stuff
 */
module.exports = {
    registerRoutes: (app, prefix = '/', routes) => app.use(prefix === '/index' ? '/' : prefix, routes),
}