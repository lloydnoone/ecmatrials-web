"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var AppRouter_1 = require("./AppRouter");
require("./controllers/LoginController");
require("./controllers/RootController");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
    }
    Server.prototype.getApp = function () {
        return this.app;
    };
    Server.prototype.ApplyMiddleware = function () {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(cookie_session_1.default({ keys: ['alsdfsdf'] }));
        this.app.use(AppRouter_1.AppRouter.getInstance());
    };
    Server.prototype.startServer = function () {
        // return the server as well as start
        var server = this.app.listen(3000, function () {
            var port = server.address().port;
            console.log('Listening on port 3000', port);
        });
    };
    return Server;
}());
exports.Server = Server;
