var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var gamewin = (function (_super) {
    __extends(gamewin, _super);
    function gamewin() {
        var _this = _super.call(this) || this;
        _this.winPoint = new egret.Bitmap;
        _this.winPoint.texture = RES.getRes("winPoint_png");
        _this.x = 0;
        _this.y = 500;
        _this.winPoint.width = 650;
        _this.addChild(_this.winPoint);
        return _this;
    }
    return gamewin;
}(egret.Sprite));
__reflect(gamewin.prototype, "gamewin");
//# sourceMappingURL=gamewin.js.map