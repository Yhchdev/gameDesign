var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var winfire = (function (_super) {
    __extends(winfire, _super);
    function winfire(x, y) {
        var _this = _super.call(this) || this;
        _this.boss_build();
        _this.x = x - 200;
        _this.y = y - 100;
        return _this;
    }
    winfire.prototype.boss_build = function () {
        var data = RES.getRes("fire_json"); //获取mc1帧动画的配置
        var txtr = RES.getRes("fire_png"); //获取mc1帧动画的png图片
        var mcFactory = new egret.MovieClipDataFactory(data, txtr); //创建帧动画对象
        this.bossexp = new egret.MovieClip(mcFactory.generateMovieClipData("bossexpp")); //载入帧动画
        //等比的缩放大小
        this.bossexp.scaleX = 1.2;
        this.bossexp.scaleY = 1.2;
        this.addChild(this.bossexp); //把帧动画绑定至该容器
        this.bossexp.gotoAndPlay(0, 1); //让帧动画停在第一帧
        //移除动画
        this.bossexp.addEventListener(egret.Event.COMPLETE, function (e) {
            if (this.parent) {
                this.parent.removeChild(this); //调用父对象删除自己
            }
        }, this);
    };
    return winfire;
}(egret.Sprite));
__reflect(winfire.prototype, "winfire");
//# sourceMappingURL=winfire.js.map