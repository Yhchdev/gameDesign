class winfire extends egret.Sprite{
 
    //boss爆炸的影片剪辑
    public bossexp:egret.MovieClip;

    public constructor(x,y){
        super();
        this.boss_build();  
        this.x = x-200;
        this.y = y-100;
    }

    public boss_build(){        
        var data = RES.getRes("fire_json");     //获取mc1帧动画的配置
        var txtr = RES.getRes("fire_png");     //获取mc1帧动画的png图片
        var mcFactory = new egret.MovieClipDataFactory( data, txtr );     //创建帧动画对象
        this.bossexp = new egret.MovieClip( mcFactory.generateMovieClipData("bossexpp"));    //载入帧动画
        
        //等比的缩放大小
        this.bossexp.scaleX = 1.2;
        this.bossexp.scaleY = 1.2 ;    
        this.addChild( this.bossexp);     //把帧动画绑定至该容器
        this.bossexp.gotoAndPlay(0,1);    //让帧动画停在第一帧
        
        //移除动画
        this.bossexp.addEventListener(egret.Event.COMPLETE, function (e:egret.Event):void { //监听动画播放完毕事件，然后激活回调函数function
              if(this.parent){ //如果当前对象的父对象存在
                this.parent.removeChild(this); //调用父对象删除自己
              } }, this);
    }
}