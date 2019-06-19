var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bloodpack = (function (_super) {
    __extends(bloodpack, _super);
    function bloodpack() {
        var _this = _super.call(this) || this;
        _this.turnLeft = 1;
        _this.turnRight = 0;
        _this.hit = false;
        _this.recycle = false;
        _this.box_build();
        _this.x = Math.random() * 400;
        _this.y = 0;
        return _this;
    }
    bloodpack.prototype.box_build = function () {
        this.bloodp = new egret.Bitmap;
        this.bloodp.texture = RES.getRes("hpadd_png");
        this.bloodp.scaleX = 1.2;
        this.bloodp.scaleX = 1.2;
        this.addChild(this.bloodp);
        this.addEventListener(egret.Event.ENTER_FRAME, this.box_move, this);
    };
    bloodpack.prototype.box_move = function () {
        //如果尚未产生碰撞
        if (this.hit == false) {
            this.y += 10;
        }
        else {
            //egret.log("销毁了");
            this.recycle = true; //修改标识位recycle=true，告诉主场景，自己可以被回收
            this.parent.removeChild(this); //在父级容器中移除自己，这里的父级容器其实就是主场景
            this.removeEventListener(egret.Event.ENTER_FRAME, this.box_move, this); //移除自身的enter_frame，当对象被移除后，一定要手动移除它自身绑定的监听事件
        }
        if (this.y > 1200 && this.parent) {
            this.parent.removeChild(this); //调用父级容器删除自己
            this.removeEventListener(egret.Event.ENTER_FRAME, this.box_move, this); //移除帧监听，即不让它再移动
            this.recycle = true; //修改标识符recycle=true，告诉主场景，本敌机可回收
        }
    };
    bloodpack.prototype.initial = function () {
        this.hit = false;
        this.recycle = false;
        this.addEventListener(egret.Event.ENTER_FRAME, this.box_move, this);
    };
    return bloodpack;
}(egret.Sprite));
__reflect(bloodpack.prototype, "bloodpack");
//# sourceMappingURL=bloodpack.js.map