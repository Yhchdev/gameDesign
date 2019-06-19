var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var touch_location = (function () {
    function touch_location(x, y) {
        this.x = x;
        this.y = y;
    }
    return touch_location;
}());
__reflect(touch_location.prototype, "touch_location");
//# sourceMappingURL=location.js.map