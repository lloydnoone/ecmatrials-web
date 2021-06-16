"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("../helper");
describe('LoginController test suite', function () {
    test('should get the login endpoint', function () {
        helper_1.request
            .get('/login')
            .end(function (err, res) {
            expect(res.status).toBe(200);
        });
    });
});
