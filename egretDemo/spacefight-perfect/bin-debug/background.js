var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var backGround = (function (_super) {
    __extends(backGround, _super);
    function backGround(texture) {
        var _this = _super.call(this) || this;
        _this.bgstage = egret.MainContext.instance.stage;
        _this.bg = new egret.Bitmap;
        _this.bg.texture = texture;
        _this.bg.width = _this.bgstage.stageWidth;
        _this.bg.height = _this.bgstage.stageHeight;
        _this.addChild(_this.bg);
        var sound_obj = RES.getRes('bg_music');
        sound_obj.play();
        return _this;
    }
    return backGround;
}(egret.DisplayObjectContainer));
__reflect(backGround.prototype, "backGround");
//# sourceMappingURL=background.js.map