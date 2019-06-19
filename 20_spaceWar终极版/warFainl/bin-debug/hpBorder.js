var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var hpBorder = (function (_super) {
    __extends(hpBorder, _super);
    function hpBorder() {
        var _this = _super.call(this) || this;
        //血条边框
        _this.hpBorder = new egret.Bitmap;
        _this.hpBorder.texture = RES.getRes("hpb_png");
        _this.x = 15;
        _this.y = 10;
        _this.scaleX = 0.12;
        _this.scaleY = 0.05;
        _this.addChild(_this.hpBorder);
        return _this;
    }
    return hpBorder;
}(egret.DisplayObjectContainer));
__reflect(hpBorder.prototype, "hpBorder");
//# sourceMappingURL=hpBorder.js.map