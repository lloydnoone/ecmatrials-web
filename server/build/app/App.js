"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express_1 = __importDefault(require("express"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var AppRouter_1 = require("./AppRouter");
require("./controllers/LoginController");
require("./controllers/RootController");
require("./controllers/TestController");
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.port = 0;
        this.server = null;
    }
    App.prototype.getApp = function () {
        return this.app;
    };
    App.prototype.ApplyMiddleware = function () {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(cookie_session_1.default({ keys: ['alsdfsdf'] }));
        this.app.use(AppRouter_1.AppRouter.getInstance());
    };
    App.prototype.startServer = function () {
        var _this = this;
        var server = this.app.listen(3000, function () {
            var port = server.address().port;
            _this.port = port;
            console.log('Listening on port ' + _this.port);
        });
        this.server = server;
    };
    App.prototype.getPort = function () {
        return this.port;
    };
    App.prototype.closeServer = function () {
        if (this.server)
            this.server.close();
    };
    return App;
}());
exports.App = App;
