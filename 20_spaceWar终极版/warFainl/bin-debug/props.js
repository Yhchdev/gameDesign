var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var props = (function (_super) {
    __extends(props, _super);
    function props() {
        var _this = _super.call(this) || this;
        _this.bloodpack = new egret.Bitmap;
        _this.bloodpack.texture = RES.getRes("hpadd_png");
        _this.buff = new egret.Bitmap;
        _this.buff.texture = RES.getRes("power_png");
        _this.initProps();
        return _this;
    }
    //初始化道具
    props.prototype.initProps = function () {
        var timer = new egret.Timer(200); //建立新的计时器，每150毫秒触发一次
        timer.addEventListener(egret.TimerEvent.TIMER, this.create_bloodpack, this); //每次到时间，就触发一次bullet_new函数，用于新建一颗子弹
        timer.start(); //定时器开始
    };
    props.prototype.create_bloodpack = function () {
        this.addChild(this.bloodpack);
    };
    //加子弹
    props.prototype.create_buff = function () {
    };
    return props;
}(egret.DisplayObjectContainer));
__reflect(props.prototype, "props");
//# sourceMappingURL=props.js.map