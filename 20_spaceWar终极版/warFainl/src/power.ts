class power extends egret.Sprite{
    public turnLeft = 1;
    public turnRight = 0;

    public hit = false;
    public recycle = false;

    public bpower:egret.Bitmap;

    public constructor(){
        super();
        this.box_build();
        this.x = 0;
        this.y = 0;
    }

    public box_build(){
        this.bpower = new egret.Bitmap;
        this.bpower.texture = RES.getRes("power_png");
        this.addEventListener(egret.Event.ENTER_FRAME,this.box_move,this);

        this.addChild(this.bpower);
    }

    public box_move(){
        //如果尚未产生碰撞
        if(this.hit == false){
            if(this.turnLeft == 1){
                this.y += 10;
                this.x += Math.random() *(10 - 5) + 5
                if(this.x > 550){
                    this.turnLeft = 0;
                    this.turnRight = 1;
                }
            };
            if(this.turnRight == 1){
              this.y += 10;
              this.x -= Math.random() *(10 - 5) + 5;
            }
        }
        else{ //如果击中，则hit==true，然后移除当前的enter_frame函数
            this.recycle = true; //修改标识位recycle=true，告诉主场景，自己可以被回收
            this.parent.removeChild(this); //在父级容器中移除自己，这里的父级容器其实就是主场景
            this.removeEventListener(egret.Event.ENTER_FRAME,this.box_move,this); //移除自身的enter_frame，当对象被移除后，一定要手动移除它自身绑定的监听事件
        }
        
        if(this.y > 1200 && this.parent){    //如果敌机超出主舞台，同时其父容器存在
            this.parent.removeChild(this);    //调用父级容器删除自己
            this.removeEventListener(egret.Event.ENTER_FRAME,this.box_move,this);    //移除帧监听，即不让它再移动
            this.recycle = true;    //修改标识符recycle=true，告诉主场景，本敌机可回收
        }
    }
        public initial(){     //敌机的初始化函数，每一次被从回收数组中拿出来重用时调用
        this.hit = false;
        this.recycle = false;
        this.addEventListener(egret.Event.ENTER_FRAME,this.box_move,this);  
    }

}