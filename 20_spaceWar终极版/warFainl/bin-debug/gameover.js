var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gameover = (function (_super) {
    __extends(gameover, _super);
    function gameover() {
        var _this = _super.call(this) || this;
        _this.overPoint = new egret.Bitmap;
        _this.overPoint.texture = RES.getRes("over_png");
        _this.x = 20;
        _this.y = 500;
        _this.overPoint.width = 600;
        _this.addChild(_this.overPoint);
        return _this;
    }
    return gameover;
}(egret.Sprite));
__reflect(gameover.prototype, "gameover");
//# sourceMappingURL=gameover.js.map