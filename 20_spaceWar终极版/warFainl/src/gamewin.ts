class gamewin extends egret.Sprite{

    public winPoint:egret.Bitmap;

    public constructor(){
        super();
        this.winPoint = new egret.Bitmap;
        this.winPoint.texture = RES.getRes("winPoint_png")
        this.x = 0
        this.y = 500
        this.winPoint.width = 650
        this.addChild(this.winPoint);
    }
}