class hpBorder extends egret.DisplayObjectContainer{
    private hpBorder:egret.Bitmap;
    public constructor(){
        super();
        
        //血条边框
        this.hpBorder = new egret.Bitmap;
        this.hpBorder.texture = RES.getRes("hpb_png")
        this.x = 15
        this.y = 10
        this.scaleX = 0.12
        this.scaleY = 0.05
        this.addChild(this.hpBorder)
    }
}