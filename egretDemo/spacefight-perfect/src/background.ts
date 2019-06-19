class backGround extends egret.DisplayObjectContainer{
    public bgstage:egret.Stage = egret.MainContext.instance.stage;
    public bg:egret.Bitmap;
    public constructor(texture:egret.Texture){
        super();
        
        this.bg = new egret.Bitmap;  
        this.bg.texture = texture;

        this.bg.width = this.bgstage.stageWidth;
        this.bg.height = this.bgstage.stageHeight;   

        this.addChild(this.bg);

        var sound_obj :egret.Sound = RES.getRes('bg_music');
        sound_obj.play();
       
    }
    
}