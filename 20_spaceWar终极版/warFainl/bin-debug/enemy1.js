var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var enemy1 = (function (_super) {
    __extends(enemy1, _super);
    function enemy1(touch_x, touch_y) {
        var _this = _super.call(this) || this;
        _this.hit = false;
        _this.recycle = false;
        _this.box_build();
        _this.x = touch_x;
        _this.y = touch_y;
        return _this;
    }
    enemy1.prototype.box_build = function () {
        var data = RES.getRes("enemy_json"); //获取mc1帧动画的配置
        var txtr = RES.getRes("enemy_png"); //获取mc1帧动画的png图片
        var mcFactory = new egret.MovieClipDataFactory(data, txtr); //创建帧动画对象
        this.mc = new egret.MovieClip(mcFactory.generateMovieClipData("exp")); //载入帧动画    
        this.addChild(this.mc); //把帧动画绑定至该容器
        this.mc.gotoAndStop(1); //让帧动画停在第一帧
        this.addEventListener(egret.Event.ENTER_FRAME, this.box_move, this);
    };
    enemy1.prototype.box_move = function () {
        if (this.hit == false) {
            this.y += 9;
        }
        else {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.box_move, this); //移除自身的enter_frame监听，停止自身的移动 
            this.mc.gotoAndPlay(2, 2); //播放自身帧动画，实现爆炸效果
            var sound = new sound_play("explosion_small"); //播放爆炸的声音
            var that = this; //用that来表示this，因为在子函数中,this指针会指向子函数本身，而不是对象本身，所以需要增加标示符that来在子函数中指向对象 
            this.mc.addEventListener(egret.Event.COMPLETE, function (e) {
                if (that.parent) {
                    that.parent.removeChild(that); //调用父对象删除自己
                    that.recycle = true; //修改自身的标识符recycle，告知主场景，动画已经播放完毕，可以进行回收
                }
            }, this);
        }
        if (this.y > this.stage.height && this.parent) {
            this.parent.removeChild(this); //调用父级容器删除自己
            this.removeEventListener(egret.Event.ENTER_FRAME, this.box_move, this); //移除帧监听，即不让它再移动
            this.recycle = true; //修改标识符recycle=true，告诉主场景，本敌机可回收
        }
    };
    enemy1.prototype.initial = function (touch_x, touch_y) {
        this.x = touch_x;
        this.y = touch_y;
        this.hit = false;
        this.recycle = false;
        this.mc.gotoAndStop(1);
        this.addEventListener(egret.Event.ENTER_FRAME, this.box_move, this);
    };
    return enemy1;
}(egret.Sprite));
__reflect(enemy1.prototype, "enemy1");
//# sourceMappingURL=enemy1.js.map