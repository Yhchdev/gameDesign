class bullet extends egret.Sprite{

    public hit = false; //碰撞标识符，默认值为false

    public recycle = false; //回收标识符，默认值为false
    
    public box:egret.Shape; //子弹的主体，是一个用shap类绘制的方块

    public constructor(touch_x,touch_y){
        super();
        
        this.box_build(); //创建方块
        
        this.x = touch_x; //获取外部传入的坐标
        this.y = touch_y; 

        var sound = new sound_play("shoot"); //播放声音

        
    }
    public box_build(){ //绘制子弹方块的核心代码
        this.box = new egret.Shape();
        this.box.graphics.beginFill(0xE066FF);
        this.box.graphics.drawRect(-15,-15,30,30);
        this.box.graphics.endFill();
        this.addChild(this.box);
        this.addEventListener(egret.Event.ENTER_FRAME,this.box_move,this); //增加enter_frame监听，让自己每一帧都能调用函数，实现向下移动
    }
    
    public box_move(){ 
        if(this.hit == false){ //还没有碰撞，则继续往上移动
            this.y -=16; //这里非常重要！错就错这了！注意了，这里的坐标应该是this的，而不是this.box的，因为this是整个容器，而box只是其中的一个对象，所以这里需要整体移动！
        }
        else{ //如果产生了碰撞
           if(this.parent){ //查看自身的父级容器是否存在
               this.recycle = true; //修改标识位recycle=true，告诉主场景，自己可以被回收
               this.parent.removeChild(this); //在父级容器中移除自己，这里的父级容器其实就是主场景
               this.removeEventListener(egret.Event.ENTER_FRAME,this.box_move,this); //移除自身的enter_frame，当对象被移除后，一定要手动移除它自身绑定的监听事件
           } 
        }
       
        if(this.y < 0 && this.parent){ //如果子弹的位置超出主场景底部，则进行它自己的消除，回收，注意了这里只是修改recycle的标识位recycle=true，真正进行回收的是主场景
            this.recycle = true; //修改标识符recycle=true，告诉主场景，自己可以被回收
            this.parent.removeChild(this); //这里厉害了，通过自身的parent，即父级容器来消除自己
            this.removeEventListener(egret.Event.ENTER_FRAME,this.box_move,this); //移除自身的enter_frame
        }
    }

    public initial(touch_x,touch_y){ //子弹的初始化，当被主场景再次使用时调用，重置它自己 
        this.hit = false;
        this.recycle = false;
        this.x = touch_x;
        this.y = touch_y;
        this.addEventListener(egret.Event.ENTER_FRAME,this.box_move,this);
        var sound = new sound_play("shoot");
    }

}