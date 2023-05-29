"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var walkSync = function (dir) {
    return fs.readdirSync(dir).reduce(function (files, file) {
        var name = "".concat(dir, "/").concat(file);
        var isDirectory = fs.statSync(name).isDirectory();
        return isDirectory ? __spreadArray(__spreadArray([], files, true), walkSync(name), true) : __spreadArray(__spreadArray([], files, true), [name], false);
    }, []);
};
exports.default = (function (app, dir) {
    dir = dir.replace(/\\/g, '/');
    var files = walkSync(dir);
    files.forEach(function (file) {
        var route = require(file);
        var path = file.substring(dir.length + 1);
        var fileName = path.split('/').pop().split('.')[0] || '';
        // Slug routing
        if (path.match(/\[[a-zA-Z0-9]+]/g)) {
            var params = path.match(/\[[a-zA-Z0-9]+]/g);
            if ((params === null || params === void 0 ? void 0 : params.length) === 0)
                return;
            if ((params === null || params === void 0 ? void 0 : params.length) !== new Set(params).size)
                throw new Error("Duplicate params in route, ".concat(path));
            params === null || params === void 0 ? void 0 : params.forEach(function (param) {
                path = path.replace(param, ":".concat(param.substring(1, param.length - 1)));
            });
        }
        if (fileName === 'index') {
            if (route === null || route === void 0 ? void 0 : route.post)
                app.post("/".concat(path.split('/').slice(0, -1).join('/')), route.post);
            if (route === null || route === void 0 ? void 0 : route.get)
                app.get("/".concat(path.split('/').slice(0, -1).join('/')), route.get);
            if (route === null || route === void 0 ? void 0 : route.put)
                app.put("/".concat(path.split('/').slice(0, -1).join('/')), route.put);
            if (route === null || route === void 0 ? void 0 : route.delete)
                app.delete("/".concat(path.split('/').slice(0, -1).join('/')), route.delete);
            return;
        }
        if (route === null || route === void 0 ? void 0 : route.post)
            app.post("/".concat(path.split('/').slice(0, -1).join('/'), "/").concat(fileName), route.post);
        if (route === null || route === void 0 ? void 0 : route.get)
            app.get("/".concat(path.split('/').slice(0, -1).join('/'), "/").concat(fileName), route.get);
        if (route === null || route === void 0 ? void 0 : route.put)
            app.put("/".concat(path.split('/').slice(0, -1).join('/'), "/").concat(fileName), route.put);
        if (route === null || route === void 0 ? void 0 : route.delete)
            app.delete("/".concat(path.split('/').slice(0, -1).join('/'), "/").concat(fileName), route.delete);
    });
});
