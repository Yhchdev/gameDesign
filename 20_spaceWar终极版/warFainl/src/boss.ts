class boss extends egret.Sprite{
    public speed = 2;

    //横向移动基速度
    public hSpeed = 1;

    //向左向右标志位
    public turnLeft = 1;
    public turnRight =0;

    //碰撞标志位
    public hit = false ;

    //销毁标记
    public bossRemove = false;

    public boss1:egret.Bitmap;
    
    //受伤的影片剪辑
    public bossInjured:egret.MovieClip;

    public constructor(){
        super();
        this.boss_build();  
        this.x = 200;
        this.y = 0;
    }

    public boss_build(){
        this.boss1 = new egret.Bitmap;
        this.boss1.texture = RES.getRes("boss_png");

        //等比缩放
        this.boss1.scaleX = 1.2;
        this.boss1.scaleY = 1.2 ;
        this.addChild(this.boss1);
        
        
        var data = RES.getRes("boosHit_json");     //获取mc1帧动画的配置
        var txtr = RES.getRes("boosHit_png");     //获取mc1帧动画的png图片
        var mcFactory = new egret.MovieClipDataFactory( data, txtr );     //创建帧动画对象
        this.bossInjured = new egret.MovieClip( mcFactory.generateMovieClipData("mc_hurt"));    //载入帧动画
        
        //等比的缩放大小
        this.bossInjured.scaleX = 1.2;
        this.bossInjured.scaleY = 1.2 ;    
        this.addChild( this.bossInjured);     //把帧动画绑定至该容器
        this.bossInjured.gotoAndStop(1);    //让帧动画停在第一帧

        this.boss1.addEventListener(egret.Event.ENTER_FRAME,this.boss_move,this);
    }

    public boss_move(){ 
        //左右位移
        if(this.y < 120 ){
            this.y += this.speed;
        }
        if(this.y>=120){
            //向左
            if(this.turnLeft == 1 ){
                this.x -= this.hSpeed + Math.random()*2;
                if(this.x <0){
                    this.turnLeft = 0;
                    this.turnRight = 1;
                }
            }
            //向右
            if(this.turnRight == 1){
                this.x += this.hSpeed + Math.random()*2;
                if(this.x > 400){
                    this.turnLeft = 1;
                    this.turnRight = 0;
                }
            }
        }
        if(this.hit == true){
            this.hit = false;
            this.bossInjured.gotoAndPlay(1);
        }

        if(this.bossRemove == true){
            this.parent.removeChild(this)
            this.boss1.removeEventListener(egret.Event.ENTER_FRAME,this.boss_move,this);
        }
    }  
}