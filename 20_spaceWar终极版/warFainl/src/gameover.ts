class gameover extends egret.Sprite{

    public overPoint:egret.Bitmap;

    public constructor(){
        super();
        this.overPoint = new egret.Bitmap;
        this.overPoint.texture = RES.getRes("over_png")
        this.x = 20
        this.y = 500
        this.overPoint.width = 600
        this.addChild(this.overPoint);
    }
}
