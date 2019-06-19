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
        this.me = new egret.Bitmap;
        this.me.texture = RES.getRes("me_png");
        //等比缩放
        this.me.scaleX = 0.25;
        this.me.scaleY = 0.25;
        //修改飞机锚点位置
        //this.me.anchorOffsetX = 250;
        this.addChild(this.me);
    };
    return myplane;
}(egret.Sprite));
__reflect(myplane.prototype, "myplane");
//# sourceMappingURL=myplane.js.map