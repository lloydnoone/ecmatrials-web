"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var use_1 = require("../../../app/controllers/decorators/use");
/* eslint-disable @typescript-eslint/no-empty-function */
function testMiddleware() { }
function anotherMiddleware() { }
/* eslint-enable @typescript-eslint/no-empty-function */
describe('use decorator test suite', function () {
    test('Should apply middleware as Metadata on a function', function () {
        var TestClass = /** @class */ (function () {
            function TestClass() {
            }
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            TestClass.prototype.testFunc = function () { };
            __decorate([
                use_1.use(testMiddleware),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], TestClass.prototype, "testFunc", null);
            return TestClass;
        }());
        var middlewares = Reflect.getMetadata('middleware', TestClass.prototype, 'testFunc') || [];
        expect(middlewares).toEqual([testMiddleware]);
    });
    test('Should handle multple middlewares correctly', function () {
        var TestClass = /** @class */ (function () {
            function TestClass() {
            }
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            TestClass.prototype.testFunc = function () { };
            __decorate([
                use_1.use(testMiddleware),
                use_1.use(anotherMiddleware),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", []),
                __metadata("design:returntype", void 0)
            ], TestClass.prototype, "testFunc", null);
            return TestClass;
        }());
        var middlewares = Reflect.getMetadata('middleware', TestClass.prototype, 'testFunc') || [];
        expect(middlewares).toEqual([anotherMiddleware, testMiddleware]);
    });
});
