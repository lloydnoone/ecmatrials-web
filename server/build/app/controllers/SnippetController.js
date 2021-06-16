"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.TestController = void 0;
var decorators_1 = require("./decorators");
var Controller_1 = require("../controllers/Controller");
var vm2_1 = require("vm2");
var vm = new vm2_1.NodeVM({
    console: 'inherit',
    sandbox: {},
    eval: false,
    wasm: false,
    require: {
        external: false,
        builtin: [],
        root: "./",
        mock: {}
    }
});
var TestController = /** @class */ (function (_super) {
    __extends(TestController, _super);
    function TestController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestController.prototype.postSnippet = function (req, res) {
        var snippet = req.body.snippet;
        // const functionInSandbox = vm.run("module.exports = function(who) { console.log('hello '+ who); }");
        // functionInSandbox('world');
        if (snippet === '') {
            res.status(422).send('Invalid snippet received.');
        }
        var testFunction = vm.run("\n    \n    " + snippet + "\n\n    module.exports = function() {\n      if(testvar === 1) {\n        return true\n      } else {\n        return false\n      }\n    }");
        if (testFunction()) {
            res.status(200).send('Test passed');
        }
        else {
            res.status(200).send('Test failed');
        }
    };
    __decorate([
        decorators_1.post('/test'),
        decorators_1.bodyValidator('snippet'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], TestController.prototype, "postSnippet", null);
    TestController = __decorate([
        decorators_1.controller('/tests')
    ], TestController);
    return TestController;
}(Controller_1.Controller));
exports.TestController = TestController;
