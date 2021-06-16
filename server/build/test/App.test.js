"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var App_1 = require("../app/App");
var app = new App_1.App().getApp();
describe('App test suite', function () {
    test('Should return an instance of an express router', function () {
        expect(app).toBeInstanceOf(express_1.default.application);
    });
});
