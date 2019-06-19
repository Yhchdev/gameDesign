class myplane extends egret.Sprite{
    public box:egret.Shape;
    public speed = 12;
    public constructor(){
        super();
    this.myplane_build();    
    }
    public myplane_build(){
    this.box = new egret.Shape;
    this.box.graphics.beginFill(0x00F5FF);
    this.box.graphics.drawRect(-25,-25,50,50);
    this.box.graphics.endFill();
    this.addChild(this.box);
    }
}