class enemyBullet extends egret.Sprite{

    public hit = false; //碰撞标识符，默认值为false

    public recycle = false; //回收标识符，默认值为false
    //子弹的主体
    public bullet:egret.Bitmap;

    //敌机的位置 touch_x ,touch_y
    public constructor(touch_x,touch_y){
        super();

        //创建子弹
        this.bullet_build(); 
        
        this.x = touch_x; 
        this.y = touch_y;         
    }

    //构建子弹
    public bullet_build(){ 
        this.bullet = new egret.Bitmap;
        this.bullet.texture = RES.getRes("eb_png");
        //this.bullet.scaleX = 1
        //this.bullet.scaleY = 1

        this.addChild(this.bullet);
        this.addEventListener(egret.Event.ENTER_FRAME,this.box_move,this); //增加enter_frame监听，让自己每一帧都能调用函数，实现向下移动
    }
    
    public box_move(){ 
        if(this.hit == false){ //还没有碰撞，则继续往上移动
            this.y += 12 ; //这里非常重要！错就错这了！注意了，这里的坐标应该是this的，而不是this.box的，因为this是整个容器，而box只是其中的一个对象，所以这里需要整体移动！
        }
        else{ //产生了碰撞
           if(this.parent){ //查看自身的父级容器是否存在
               this.recycle = true; //修改标识位recycle=true，告诉主场景，自己可以被回收
               this.parent.removeChild(this); //在父级容器中移除自己，这里的父级容器其实就是主场景
               this.removeEventListener(egret.Event.ENTER_FRAME,this.box_move,this); //移除自身的enter_frame，当对象被移除后，一定要手动移除它自身绑定的监听事件
           } 
        }
       
        if(this.y > 1200 && this.parent){ //如果子弹的位置超出主场景底部，则进行它自己的消除，回收，注意了这里只是修改recycle的标识位recycle=true，真正进行回收的是主场景
            this.recycle = true; //修改标识符recycle=true，告诉主场景，自己可以被回收
            this.parent.removeChild(this); //这里厉害了，通过自身的parent，即父级容器来消除自己
            this.removeEventListener(egret.Event.ENTER_FRAME,this.box_move,this); //移除自身的enter_frame
        }
    }

    public initial(touch_x,touch_y){ //子弹的初始化，当被主场景再次使用时调用，重置它自己 
        //重用的子弹初始化  操作
        this.hit = false;
        this.recycle = false;
        this.x = touch_x;
        this.y = touch_y;
        this.addEventListener(egret.Event.ENTER_FRAME,this.box_move,this);
    }

}