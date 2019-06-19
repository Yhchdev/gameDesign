class backGround extends egret.DisplayObjectContainer{
    public bgstage:egret.Stage = egret.MainContext.instance.stage;
    public bg1:egret.Bitmap;
    public bg2:egret.Bitmap;

    //滚动标志位
    public bg1_roll = 1;
    public bg2_roll = 0;
    
    public constructor(){
        super();
        
        this.bg1 = new egret.Bitmap;  
        this.bg1.texture = RES.getRes("bg_jpg");

        this.bg2 = new egret.Bitmap;
        this.bg2.texture = RES.getRes("bg2_jpg");

        this.bg1.width = this.bgstage.stageWidth;
        this.bg1.height = this.bgstage.stageHeight;

        this.bg2.width = this.bgstage.stageWidth;
        this.bg2.height = this.bgstage.stageHeight;

        this.bg2.y = -(this.bg2.height);

        this.bg1.addEventListener(egret.Event.ENTER_FRAME,this.bgroll,this);
        this.bg2.addEventListener(egret.Event.ENTER_FRAME,this.bgroll,this);

        this.addChild(this.bg1);
        this.addChild(this.bg2);

        var sound_obj :egret.Sound = RES.getRes('bg_music');
        sound_obj.play();
    }

    public bgroll(){
        //背景1
        if(this.bg1_roll == 1){
            this.bg1.y += 4;
            if(this.bg1.y>-4){
                this.bg2_roll = 1;
            }
            if(this.bg1.y >= this.bg1.height){
                
                this.bg1.y = -(this.bg1.height);
                this.bg1_roll = 0;
            }
        }

        //背景2
        if(this.bg2_roll == 1){
            this.bg2.y += 4;
            if(this.bg2.y> -4){
                this.bg1_roll = 1;
            }
            if(this.bg2.y >= this.bg2.height){
                this.bg2.y = -(this.bg2.height);
                this.bg2_roll = 0;
            }
        }
    }   
}