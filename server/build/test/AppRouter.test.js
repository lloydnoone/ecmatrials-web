"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AppRouter_1 = require("../app/AppRouter");
describe('AppRouter test suite', function () {
    test('Should return an instance of an express router', function () {
        var instance = AppRouter_1.AppRouter.getInstance();
        setTimeout(function () {
            expect(instance).toBeInstanceOf(express_1.default.Router());
        }, 1000);
    });
});
