class props extends egret.DisplayObjectContainer{
    
    public bloodpack:egret.Bitmap;
    public buff:egret.Bitmap;

    
    public constructor(){
        super();
        
        this.bloodpack = new egret.Bitmap;  
        this.bloodpack.texture = RES.getRes("hpadd_png");

        this.buff = new egret.Bitmap;
        this.buff.texture = RES.getRes("power_png");
        
        this.initProps();
    }

    //初始化道具
    public initProps(){
        var timer:egret.Timer = new egret.Timer(200);     //建立新的计时器，每150毫秒触发一次
         timer.addEventListener(egret.TimerEvent.TIMER,this.create_bloodpack, this);     //每次到时间，就触发一次bullet_new函数，用于新建一颗子弹
         timer.start();    //定时器开始
    }

    public create_bloodpack(){


        this.addChild(this.bloodpack);
    }

    //加子弹
    public create_buff(){


    }


}