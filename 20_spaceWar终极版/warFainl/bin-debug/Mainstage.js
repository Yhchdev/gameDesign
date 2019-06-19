var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mainStage = (function (_super) {
    __extends(mainStage, _super);
    function mainStage() {
        var _this = _super.call(this) || this;
        _this.label = new egret.TextField;
        _this.label2 = new egret.TextField;
        _this.score = 0;
        _this.hpv = 100;
        //游戏状态标志
        _this.gameModel = "goOn";
        //boos上场标志
        _this.bossModel = 0;
        //子弹加成标志
        _this.bulletModel = 0;
        //加成次数限制
        _this.limitAdd = 20;
        //血包加血数量
        _this.bloodAddNum = 18;
        //boss血量
        _this.bosshp = 300;
        _this.touch = new touch_location(200, 800); //设置一开始的触摸位置
        //子弹数组
        _this.bullet_array = [];
        _this.bullet_arrayAdd = [];
        //敌机数组  
        _this.enemy1_array = [];
        //敌机子弹数组
        _this.eb_array = [];
        _this.eboss_array = [];
        _this.recycle_bullet = []; //新建一个回收子弹的数组，用于回收子弹及重用
        _this.recycle_bulletAdd = [];
        _this.recycle_bulletBoss = [];
        _this.recycle_enemy1 = []; //新建一个回收敌机的数组，用于回收敌机及重用
        //敌机子弹回收数组
        _this.recycle_eb = [];
        _this.touchEnabled = true; //主舞台设置为可触摸
        var bg = new backGround(); //引入背景
        _this.addChild(bg); //把背景绑定到主舞台
        //血条边框
        _this.hpborder = new hpBorder();
        _this.addChild(_this.hpborder);
        _this.hpValue = new egret.Bitmap;
        _this.hpValue.texture = RES.getRes("hpv_png");
        _this.hpValue.width = 840;
        _this.hpValue.height = 15;
        _this.hpValue.alpha = 0.7;
        _this.hpValue.x = 30;
        _this.hpValue.y = 12;
        _this.addChild(_this.hpValue);
        //血条变化监听
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.barChange, _this);
        //boos上场监听
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.bossAppears, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.touch_location, _this); //添加触摸的移动监听
        _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touch_location, _this); //添加触摸的开始监听
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touch_location, _this); //添加触摸监听
        //创建道具
        _this.initProps();
        _this.bullet_creat(); //创建子弹
        //敌机子弹
        _this.eb_create();
        //boss子弹创建
        _this.bossBullet_create();
        _this.enemy1_creat(); //创建敌机
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.hit_target, _this); //主舞台添加逐帧监听，每刷新一帧，都自动执行一次hit_target函数来进行碰撞检测和回收检测
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.hit_targetAdd, _this);
        //敌机子弹与我的碰撞 回收
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.hit_ebAndMy, _this);
        _this.myplane1 = new myplane; //创建我机
        _this.myplane1.x = 300; //我机的初始位置
        _this.myplane1.y = 900;
        _this.addChild(_this.myplane1); //绑定我机到主舞台  
        _this.myplane1.addEventListener(egret.Event.ENTER_FRAME, _this.myplane_move, _this); //我机添加逐帧监听，每刷新一帧，就调用移动函数来改变位移
        //碰撞与回收 监听
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.hit_meAndBuff, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.hit_meAndBloodpack, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.hit_bossBulltAndMy, _this);
        //游戏结束 监听
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.gameWin, _this);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.fail, _this);
        return _this;
    }
    //1.获取屏幕点击位置
    mainStage.prototype.touch_location = function (touch_now) {
        this.touch.x = touch_now.stageX;
        this.touch.y = touch_now.stageY;
    };
    //2.对我机进行位移
    mainStage.prototype.myplane_move = function () {
        if (this.myplane1.x < this.touch.x) {
            this.myplane1.x += this.myplane1.speed;
        }
        if (this.myplane1.x > this.touch.x) {
            this.myplane1.x -= this.myplane1.speed;
        }
        if (this.myplane1.y < this.touch.y) {
            this.myplane1.y += this.myplane1.speed;
        }
        if (this.myplane1.y > this.touch.y) {
            this.myplane1.y -= this.myplane1.speed;
        }
    };
    //3.血条动态变化
    mainStage.prototype.barChange = function () {
        // 血量/100
        if (this.hpv >= 0 && this.hpv <= 100) {
            var scale = this.hpv / 100;
            this.hpValue.scaleX = 0.7 * scale;
        }
        if (this.hpv <= 0) {
            this.hpValue.width = 0;
        }
    };
    // 4.我的子弹模式  》计时器
    mainStage.prototype.bullet_creat = function () {
        var timer = new egret.Timer(200); //建立新的计时器，每150毫秒触发一次
        timer.addEventListener(egret.TimerEvent.TIMER, this.judgeModel, this); //每次到时间，就触发一次bullet_new函数，用于新建一颗子弹
        timer.start(); //定时器开始
    };
    //  5. 普通 敌机子弹
    mainStage.prototype.eb_create = function () {
        var timer = new egret.Timer(700);
        timer.addEventListener(egret.TimerEvent.TIMER, this.traverEenemy, this);
        timer.start();
    };
    //6.boos上场
    mainStage.prototype.bossAppears = function () {
        if (this.bossModel == 0 && this.score >= 200) {
            this.bossObj = new boss();
            //根据bossModel 判断是否创建子弹 
            this.bossModel = 1;
            this.addChild(this.bossObj);
        }
    };
    // 7.boss子弹  》 计时器
    mainStage.prototype.bossBullet_create = function () {
        var timer = new egret.Timer(800);
        timer.addEventListener(egret.TimerEvent.TIMER, this.bossb_new, this);
        timer.start();
    };
    // 8.boss子弹
    mainStage.prototype.bossb_new = function () {
        if (this.gameModel == "goOn") {
            if (this.bossModel == 1) {
                //同一时间生成7发子弹
                for (var i = 0; i < 7; i++) {
                    if (this.recycle_bulletBoss.length != 0) {
                        bossbObj = this.recycle_bulletBoss.shift();
                        bossbObj.initial(this.bossObj.x + 100, this.bossObj.y + 100, i);
                        this.eboss_array.push(bossbObj);
                    }
                    else {
                        var bossbObj = new bossBullet(this.bossObj.x + 100, this.bossObj.y + 100, i);
                        this.eboss_array.push(bossbObj);
                    }
                    this.addChild(bossbObj);
                }
            }
        }
    };
    //判断是否加成 
    mainStage.prototype.judgeModel = function () {
        //普通模式
        if (this.bulletModel == 0 && this.gameModel == "goOn") {
            this.bullet_new();
        }
        //加成模式
        if (this.bulletModel == 1 && this.gameModel == "goOn") {
            this.limitAdd -= 1;
            this.bulletAdd_new();
            if (this.limitAdd == 0) {
                this.bulletModel = 0;
                this.limitAdd = 20;
            }
        }
    };
    // 我的子弹(普通)
    mainStage.prototype.bullet_new = function () {
        //如果回收数组存在元素
        if (this.recycle_bullet.length != 0) {
            //则取出回收数组的第一个元素，然后在回收数组中删除该元素
            var bullet_Obj = this.recycle_bullet.shift();
            bullet_Obj.initial(this.myplane1.x + 62, this.myplane1.y); //对取出的子弹进行初始化      
            this.bullet_array.push(bullet_Obj); //把该子弹装入子弹数组
        }
        else {
            bullet_Obj = new bullet(this.myplane1.x + 62, this.myplane1.y); //新建一颗子弹
            this.bullet_array.push(bullet_Obj); //把该子弹装入子弹数组
        }
        //把新建的子弹绑定到主舞台 
        this.addChild(bullet_Obj);
    };
    // 我的子弹(加成)
    mainStage.prototype.bulletAdd_new = function () {
        if (this.recycle_bulletAdd.length != 0) {
            var bulletAdd_Obj = this.recycle_bulletAdd.shift();
            bulletAdd_Obj.initial(this.myplane1.x + 62, this.myplane1.y);
            this.bullet_arrayAdd.push(bulletAdd_Obj); //把该子弹装入子弹数组
        }
        else {
            bulletAdd_Obj = new bulletAdd(this.myplane1.x + 62, this.myplane1.y); //新建一颗子弹
            this.bullet_arrayAdd.push(bulletAdd_Obj); //把该子弹装入子弹数组
        }
        //把新建的子弹绑定到主舞台 
        this.addChild(bulletAdd_Obj);
    };
    //遍历敌机数组
    mainStage.prototype.traverEenemy = function () {
        for (var i = 0; i < this.enemy1_array.length; i++) {
            var x = this.enemy1_array[i].x;
            var y = this.enemy1_array[i].y;
            x += 40;
            y += 40;
            this.eb_new(x, y);
        }
    };
    //创建敌机子弹
    mainStage.prototype.eb_new = function (x, y) {
        //回收数组中有资源
        if (this.recycle_eb.length != 0) {
            var eb = this.recycle_eb.shift();
            eb.initial(x, y);
            this.eb_array.push(eb);
        }
        else {
            var eb = new enemyBullet(x, y);
            this.eb_array.push(eb);
        }
        this.addChild(eb);
    };
    mainStage.prototype.enemy1_creat = function () {
        var timer = new egret.Timer(300); //建立新的计时器，每300毫秒触发一次
        timer.addEventListener(egret.TimerEvent.TIMER, this.enemy1_new, this); //每次到时间，就触发一次enemy1_create函数，用于创建一个敌机
        timer.start();
    };
    mainStage.prototype.enemy1_new = function () {
        //游戏还在进行中
        if (this.gameModel == "goOn") {
            if (this.bossModel == 0) {
                var position_y = 0; //敌机的纵坐标为0
                //敌机横坐标
                var position_x = Math.random() * 550;
                //获取回收敌机数组的首个元素        
                var enemy1_Obj = this.recycle_enemy1[0];
                if (enemy1_Obj != undefined) {
                    this.recycle_enemy1.shift(); //在回收敌机数组中删除该元素
                    enemy1_Obj.initial(position_x, position_y); //初始化该敌机元素
                    this.enemy1_array.push(enemy1_Obj); //把该敌机装入敌机数组
                }
                else {
                    enemy1_Obj = new enemy1(position_x, position_y); //则新建一个敌机对象
                    this.enemy1_array.push(enemy1_Obj); //把新建的敌机装入敌机数组
                }
                this.addChild(enemy1_Obj); //把创建的敌机绑定到主舞台
            }
        }
        else {
            //清空敌机数组
            this.enemy1_array.splice(0, this.enemy1_array.splice.length);
            //清空敌机回收数组
            this.recycle_enemy1.splice(0, this.recycle_enemy1.splice.length);
            //清空敌机子弹数组
            this.eb_array.splice(0, this.eb_array.length);
            this.recycle_eb.splice(0, this.recycle_eb.length);
        }
    };
    //道具 
    mainStage.prototype.initProps = function () {
        // 加成
        var timer = new egret.Timer(6000); //建立新的计时器，每300毫秒触发一次
        timer.addEventListener(egret.TimerEvent.TIMER, this.power_new, this); //每次到时间，就触发一次enemy1_create函数，用于创建一个敌机
        timer.start();
        // 血包
        var timerbp = new egret.Timer(8000 + Math.random() * 6000); //建立新的计时器，每300毫秒触发一次
        timerbp.addEventListener(egret.TimerEvent.TIMER, this.bloodpack_new, this); //每次到时间，就触发一次enemy1_create函数，用于创建一个敌机
        timerbp.start();
    };
    //创建 buff加成
    mainStage.prototype.power_new = function () {
        if (this.gameModel == "goOn") {
            this.buff = new power();
            this.addChild(this.buff);
        }
    };
    // 创建血包
    mainStage.prototype.bloodpack_new = function () {
        if (this.gameModel == "goOn") {
            this.bloodpackObj = new bloodpack();
            this.addChild(this.bloodpackObj);
        }
    };
    //普通子弹  hit 敌机 or boss
    mainStage.prototype.hit_target = function () {
        for (var i = 0; i < this.bullet_array.length; i++) {
            for (var j = 0; j < this.enemy1_array.length; j++) {
                //碰撞检测
                if (this.bullet_array[i] != undefined && this.enemy1_array[j] != undefined) {
                    if (this.hitTest(this.bullet_array[i], this.enemy1_array[j]) == true && this.enemy1_array[j].hit == false && this.bullet_array[i].hit == false) {
                        this.bullet_array[i].hit = true; //当前子弹标为hit=true
                        this.enemy1_array[j].hit = true; //当前敌机标为hit=true
                        this.score += 10;
                        this.label.text = "得分:" + this.score;
                        this.label.y = 1500;
                        this.addChild(this.label);
                    }
                }
                //回收检测，注意回收检测是单独的，是碰撞检测结束后进行 
                if (this.enemy1_array[j] != undefined && this.enemy1_array[j].recycle == true) {
                    this.recycle_enemy1.push(this.enemy1_array[j]); //把该敌机回收至回收敌机数组
                    // 把该敌机从敌机数组删除 删除index为J的元素  
                    this.enemy1_array.splice(j, 1);
                }
                if (this.bullet_array[i] != undefined && this.bullet_array[i].recycle == true) {
                    this.recycle_bullet.push(this.bullet_array[i]); //把该子弹回收至回收子弹数组
                    this.bullet_array.splice(i, 1); //把该子弹从子弹数组中删除      
                }
            }
        }
        //boss 也出現了
        if (this.bossModel == 1) {
            for (var i = 0; i < this.bullet_array.length; i++) {
                //普通子弹 与 boss的碰撞检测
                if (this.bullet_array[i] != undefined) {
                    if (this.hitTest(this.bullet_array[i], this.bossObj)) {
                        this.bullet_array[i].hit = true;
                        this.bossObj.hit = true;
                        this.bosshp -= 5;
                    }
                }
                ;
            }
        }
    };
    //加成子弹 hit 敌机
    mainStage.prototype.hit_targetAdd = function () {
        for (var i = 0; i < this.bullet_arrayAdd.length; i++) {
            for (var j = 0; j < this.enemy1_array.length; j++) {
                if (this.bullet_arrayAdd[i] != undefined && this.enemy1_array[j] != undefined) {
                    if (this.hitTest(this.bullet_arrayAdd[i], this.enemy1_array[j]) == true && this.enemy1_array[j].hit == false && this.bullet_arrayAdd[i].hit == false) {
                        this.bullet_arrayAdd[i].hit = true; //当前子弹标为hit=true
                        this.enemy1_array[j].hit = true; //当前敌机标为hit=true
                        this.score += 10;
                        this.label.text = "得分:" + this.score;
                        this.label.y = 1000;
                        this.addChild(this.label);
                    }
                }
                //回收检测，注意回收检测是单独的，是碰撞检测结束后进行 
                if (this.enemy1_array[j] != undefined && this.enemy1_array[j].recycle == true) {
                    this.recycle_enemy1.push(this.enemy1_array[j]); //把该敌机回收至回收敌机数组
                    // 把该敌机从敌机数组删除 删除index为J的元素  
                    this.enemy1_array.splice(j, 1);
                }
                if (this.bullet_arrayAdd[i] != undefined && this.bullet_arrayAdd[i].recycle == true) {
                    this.recycle_bulletAdd.push(this.bullet_arrayAdd[i]); //把该子弹回收至回收子弹数组
                    this.bullet_arrayAdd.splice(i, 1); //把该子弹从子弹数组中删除      
                }
            }
        }
        //boss 出现了也进行检测
        if (this.bossModel == 1) {
            for (var i = 0; i < this.bullet_arrayAdd.length; i++) {
                //加成子弹 与 boss的碰撞检测
                if (this.bullet_arrayAdd[i] != undefined) {
                    if (this.hitTest(this.bullet_arrayAdd[i], this.bossObj)) {
                        this.bullet_arrayAdd[i].hit = true;
                        this.bossObj.hit = true;
                        this.bosshp -= 8;
                    }
                }
                ;
            }
        }
    };
    //敌机子弹 hit 我
    mainStage.prototype.hit_ebAndMy = function () {
        for (var i = 0; i < this.eb_array.length; i++) {
            //碰撞检测
            if (this.eb_array[i] != undefined) {
                if (this.hitTest(this.eb_array[i], this.myplane1) == true && this.eb_array[i].hit == false) {
                    this.eb_array[i].hit = true; //当前子弹标为hit=true
                    //egret.log("受伤了");
                    this.hpv -= 2;
                    this.label2.text = "HP：" + this.hpv;
                    this.addChild(this.label2);
                }
                if (this.eb_array[i] != undefined && this.eb_array[i].recycle == true) {
                    this.recycle_eb.push(this.eb_array[i]); //把该子弹回收至回收子弹数组
                    this.eb_array.splice(i, 1); //把该子弹从子弹数组中删除       
                }
            }
        }
    };
    //boss子弹 hit 我
    mainStage.prototype.hit_bossBulltAndMy = function () {
        for (var i = 0; i < this.eboss_array.length; i++) {
            //碰撞检测
            if (this.eboss_array[i] != undefined) {
                if (this.hitTest(this.eboss_array[i], this.myplane1) && this.eboss_array[i].hit == false) {
                    this.eboss_array[i].hit = true; //当前子弹标为hit=true
                    this.hpv -= 3;
                    this.label2.text = "HP：" + this.hpv;
                    this.addChild(this.label2);
                }
                if (this.eboss_array[i] != undefined && this.eboss_array[i].recycle == true) {
                    this.recycle_bulletBoss.push(this.eboss_array[i]); //把该子弹回收至回收子弹数组
                    this.eboss_array.splice(i, 1); //把该子弹从子弹数组中删除       
                }
            }
        }
    };
    //我与buff
    mainStage.prototype.hit_meAndBuff = function () {
        if (this.buff != undefined) {
            if (this.hitTest(this.buff, this.myplane1) && this.buff.hit == false) {
                this.buff.hit = true; //当前子弹标为hit=true
                this.bulletModel = 1;
            }
        }
    };
    //我与血包
    mainStage.prototype.hit_meAndBloodpack = function () {
        if (this.bloodpackObj != undefined) {
            if (this.hitTest(this.bloodpackObj, this.myplane1) && this.bloodpackObj.hit == false) {
                this.bloodpackObj.hit = true; //当前子弹标为hit=true
                this.hpv += this.bloodAddNum;
            }
        }
    };
    //游戏结束
    mainStage.prototype.fail = function () {
        //只执行一次
        if (this.hpv <= 0 && this.gameModel == "goOn") {
            this.hpv = 0;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.hit_ebAndMy, this);
            this.gameModel = "over";
            this.overText = new gameover();
            this.addChild(this.overText);
        }
    };
    //游戏胜利
    mainStage.prototype.gameWin = function () {
        if (this.bosshp <= 0 && this.gameModel == "goOn") {
            //boss可以移除了
            this.bossObj.bossRemove = true;
            this.gameModel = "over";
            var celebrate = new winfire(this.bossObj.x, this.bossObj.y);
            this.addChild(celebrate);
            var winText = new gamewin();
            this.addChild(winText);
        }
    };
    //碰撞检测函数
    mainStage.prototype.hitTest = function (obj1, obj2) {
        if (obj1 != undefined && obj2 != undefined) {
            var rect1 = obj1.getBounds();
            var rect2 = obj2.getBounds();
            rect1.x = obj1.x;
            rect1.y = obj1.y;
            rect2.x = obj2.x;
            rect2.y = obj2.y;
            //盒子与盒子的碰撞 
            return rect1.intersects(rect2);
        }
        else {
            return false;
        }
    };
    return mainStage;
}(egret.DisplayObjectContainer));
__reflect(mainStage.prototype, "mainStage");
//# sourceMappingURL=Mainstage.js.map