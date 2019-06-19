var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var myplane = (function (_super) {
    __extends(myplane, _super);
    function myplane() {
        var _this = _super.call(this) || this;
        _this.speed = 12;
        _this.myplane_build();
        return _this;
    }
    myplane.prototype.myplane_build = function () {
        this.box = new egret.Shape;
        this.box.graphics.beginFill(0x00F5FF);
        this.box.graphics.drawRect(-25, -25, 50, 50);
        this.box.graphics.endFill();
        this.addChild(this.box);
    };
    return myplane;
}(egret.Sprite));
__reflect(myplane.prototype, "myplane");
//# sourceMappingURL=myplane.js.map