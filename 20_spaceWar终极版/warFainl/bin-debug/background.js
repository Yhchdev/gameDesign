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
    function backGround() {
        var _this = _super.call(this) || this;
        _this.bgstage = egret.MainContext.instance.stage;
        //滚动标志位
        _this.bg1_roll = 1;
        _this.bg2_roll = 0;
        _this.bg1 = new egret.Bitmap;
        _this.bg1.texture = RES.getRes("bg_jpg");
        _this.bg2 = new egret.Bitmap;
        _this.bg2.texture = RES.getRes("bg2_jpg");
        _this.bg1.width = _this.bgstage.stageWidth;
        _this.bg1.height = _this.bgstage.stageHeight;
        _this.bg2.width = _this.bgstage.stageWidth;
        _this.bg2.height = _this.bgstage.stageHeight;
        _this.bg2.y = -(_this.bg2.height);
        _this.bg1.addEventListener(egret.Event.ENTER_FRAME, _this.bgroll, _this);
        _this.bg2.addEventListener(egret.Event.ENTER_FRAME, _this.bgroll, _this);
        _this.addChild(_this.bg1);
        _this.addChild(_this.bg2);
        var sound_obj = RES.getRes('bg_music');
        sound_obj.play();
        return _this;
    }
    backGround.prototype.bgroll = function () {
        //背景1
        if (this.bg1_roll == 1) {
            this.bg1.y += 4;
            if (this.bg1.y > -4) {
                this.bg2_roll = 1;
            }
            if (this.bg1.y >= this.bg1.height) {
                this.bg1.y = -(this.bg1.height);
                this.bg1_roll = 0;
            }
        }
        //背景2
        if (this.bg2_roll == 1) {
            this.bg2.y += 4;
            if (this.bg2.y > -4) {
                this.bg1_roll = 1;
            }
            if (this.bg2.y >= this.bg2.height) {
                this.bg2.y = -(this.bg2.height);
                this.bg2_roll = 0;
            }
        }
    };
    return backGround;
}(egret.DisplayObjectContainer));
__reflect(backGround.prototype, "backGround");
//# sourceMappingURL=background.js.map