"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetadataKeys_1 = require("./MetadataKeys");
function bodyValidators(keys) {
    return function (req, res, next) {
        if (!req.body) {
            res.status(422).send('Invalid request');
            return;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!req.body[key]) {
                res.status(422).send("Missing property " + key);
                return;
            }
        }
        next();
    };
}
function controller(routePrefix) {
    //fine to use "Function" because it will not be called.
    /* eslint-disable-next-line  @typescript-eslint/ban-types */
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        for (var key in target.prototype) {
            // get each piece of metadata of each key
            var routeHandler = target.prototype[key];
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, // class
            key // name of the function
            );
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key);
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target.prototype, key) || [];
            var requiredBodyProps = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.validator, target.prototype, key) || [];
            var validator = bodyValidators(requiredBodyProps);
            if (path) {
                //set each http method on router with path, handler and middlewares
                router[method].apply(router, __spreadArrays(["" + routePrefix + path], middlewares, [validator, routeHandler]));
            }
        }
    };
}
exports.controller = controller;
