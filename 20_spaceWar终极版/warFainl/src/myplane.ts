class myplane extends egret.Sprite{
    public me:egret.Bitmap;
    public speed = 12;
    public constructor(){
        super();
        this.myplane_build();    
    }
    public myplane_build(){
        this.me = new egret.Bitmap;
        this.me.texture = RES.getRes("me_png");
        //等比缩放
        this.me.scaleX = 0.25;
        this.me.scaleY = 0.25;

        //修改飞机锚点位置
        //this.me.anchorOffsetX = 250;
        

        this.addChild(this.me);
    }
}