"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
process.env.NODE_ENV = 'test';
var supertest_1 = __importDefault(require("supertest"));
var App_1 = require("../app/App");
var app = new App_1.App();
app.ApplyMiddleware();
exports.request = supertest_1.default(app.getApp());
