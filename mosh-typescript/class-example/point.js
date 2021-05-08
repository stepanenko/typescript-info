"use strict";
exports.__esModule = true;
var Point = /** @class */ (function () {
    function Point() {
    }
    Point.prototype.constuctor = function (x, y) {
        this._x = x;
        this._y = y;
    };
    Point.prototype.draw = function () {
        console.log('X: ' + this._x + ", Y: " + this._y);
    };
    Object.defineProperty(Point.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    return Point;
}());
exports.Point = Point;
