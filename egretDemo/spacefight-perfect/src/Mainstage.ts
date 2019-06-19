class mainStage extends egret.DisplayObjectContainer{

    public label  = new egret.TextField;  //提示的文字
    public label2 = new egret.TextField;
    public label3 = new egret.TextField;  
    public label4 = new egret.TextField;
    public count = 0; 
    public count2 = 0;
    public count3 = 0;
    public count4 = 0;

    public touch:touch_location = new touch_location(200,800);   //设置一开始的触摸位置
   
    public bullet_array:bullet[] = [];   //新建一个子弹数组，用于子弹的管理
    public enemy1_array:enemy1[] = [];   //新建一个敌机数组，用于敌机的管理
    
    public myplane1:myplane;    //声明一个我机，注意只是声明，但是还没有被创建
    
    public recycle_bullet:bullet[] = [];    //新建一个回收子弹的数组，用于回收子弹及重用
    public recycle_enemy1:enemy1[] = [];    //新建一个回收敌机的数组，用于回收敌机及重用
    
    public constructor(){    //mainStage的构造函数，初始化主舞台
        super();
        this.touchEnabled = true;    //主舞台设置为可触摸
        var bg = new backGround(RES.getRes("bg2_jpg"));    //引入背景
        this.addChild(bg);    //把背景绑定到主舞台
        
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touch_location,this);    //添加触摸的移动监听
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touch_location,this);    //添加触摸的开始监听
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touch_location,this);     //添加触摸监听    
        this.bullet_creat();     //创建子弹
        this.enemy1_creat();     //创建敌机
        this.addEventListener(egret.Event.ENTER_FRAME,this.hit_target,this);    //主舞台添加逐帧监听，每刷新一帧，都自动执行一次hit_target函数来进行碰撞检测和回收检测
        this.myplane1 = new myplane;    //创建我机
        this.myplane1.x = 300;     //我机的初始位置
        this.myplane1.y = 900;
        this.addChild(this.myplane1);    //绑定我机到主舞台  
        this.myplane1.addEventListener(egret.Event.ENTER_FRAME,this.myplane_move,this);    //我机添加逐帧监听，每刷新一帧，就调用移动函数来改变位移
    }

    public touch_location(touch_now:egret.TouchEvent){     //获取屏幕点击位置
          this.touch.x = touch_now.stageX;
          this.touch.y = touch_now.stageY;
    }

    public myplane_move(){     //对我机进行位移
          if(this.myplane1.x<this.touch.x){this.myplane1.x += this.myplane1.speed;}
          if(this.myplane1.x>this.touch.x){this.myplane1.x -= this.myplane1.speed;}
          if(this.myplane1.y<this.touch.y){this.myplane1.y += this.myplane1.speed;}
          if(this.myplane1.y>this.touch.y){this.myplane1.y -= this.myplane1.speed;}
    }

    public bullet_creat(){     //创建子弹
         var timer:egret.Timer = new egret.Timer(150);     //建立新的计时器，每150毫秒触发一次
         timer.addEventListener(egret.TimerEvent.TIMER,this.bullet_new, this);     //每次到时间，就触发一次bullet_new函数，用于新建一颗子弹
         timer.start();    //定时器开始
    }

    public bullet_new(){     //创建子弹函数
          
          if(this.recycle_bullet.length!=0){ //如果回收数组存在元素
          
          var bullet_Obj = this.recycle_bullet.shift(); //则取出回收数组的第一个元素，然后在回收数组中删除该元素
          bullet_Obj.initial(this.myplane1.x,this.myplane1.y); //对取出的子弹进行初始化      
          this.bullet_array.push(bullet_Obj); //把该子弹装入子弹数组

          this.count2 ++;
          this.label2.text = "重用的子弹数为="+this.count2;
          this.addChild(this.label2);
          }
          
          else{      //如果回收数组为空
          bullet_Obj = new bullet(this.myplane1.x,this.myplane1.y);     //新建一颗子弹
          this.bullet_array.push(bullet_Obj);     //把该子弹装入子弹数组

          this.count ++;
          this.label.text = "新建的子弹数为="+this.count;
          this.label.y = 30;
          this.addChild(this.label);
          }
          
          this.addChild(bullet_Obj);     //把新建的子弹绑定到主舞台   
    }


    public enemy1_creat(){     //创建敌机
         var timer:egret.Timer = new egret.Timer(300);     //建立新的计时器，每300毫秒触发一次
         timer.addEventListener(egret.TimerEvent.TIMER,this.enemy1_new, this);     //每次到时间，就触发一次enemy1_create函数，用于创建一个敌机
         timer.start();
    }

    public enemy1_new(){     //创建敌机函数
          var position_y = 0;    //敌机的纵坐标为0
          var position_x = Math.random()*600;     //计算敌机的横坐标，为随机数
                   
          var enemy1_Obj = this.recycle_enemy1[0];    //获取回收敌机数组的第一个元素
         
          if(enemy1_Obj != undefined){     //如果该元素存在
              this.recycle_enemy1.shift();     //在回收敌机数组中删除该元素
              enemy1_Obj.initial(position_x,position_y);    //初始化该敌机元素
              this.enemy1_array.push(enemy1_Obj);   //把该敌机装入敌机数组

               this.count3 +=1;     
               this.label3.text = "敌机重用数为="+this.count3; 
               this.label3.y = 60;
               this.addChild(this.label3);
          }
          else{     //如果回收敌机数组为空
          this.count4 ++;
          enemy1_Obj = new enemy1(position_x,position_y);    //则新建一个敌机对象
          enemy1_Obj.count = this.count4;
          
          this.enemy1_array.push(enemy1_Obj);    //把新建的敌机装入敌机数组
          
          this.label4.text = "新建的敌机数为="+this.count4;
          this.label4.y = 90;
          this.addChild(this.label4);
          }
          this.addChild(enemy1_Obj);     //把创建的敌机绑定到主舞台
    }

    public hit_target(){    //该函数做两件事儿，首先进行碰撞检测，然后进行回收检测，这个函数每刷新一帧都会自动进行
          
          for(var i=0; i<this.bullet_array.length; i++){    //遍历子弹数组
                for(var j=0; j<this.enemy1_array.length; j++){    //遍历敌机数组
                      //碰撞检测/////////////////
                      if(this.bullet_array[i]!=undefined&&this.enemy1_array[j]!=undefined){
                          if(this.hitTest(this.bullet_array[i],this.enemy1_array[j])==true&&this.enemy1_array[j].hit==false&&this.bullet_array[i].hit==false){    //如果是初次击中
                             
                               this.bullet_array[i].hit = true;  //当前子弹标为hit=true
                               this.enemy1_array[j].hit = true;  //当前敌机标为hit=true                                      
                     
                           }//if  
                      }//if    

                      //回收检测，注意回收检测是单独的，是碰撞检测结束后进行 
                      if(this.enemy1_array[j]!=undefined&&this.enemy1_array[j].recycle==true){   //判断敌机是否可回收
                                  this.recycle_enemy1.push(this.enemy1_array[j]);     //把该敌机回收至回收敌机数组
                                  this.enemy1_array.splice(j,1);     //把该敌机从敌机数组删除   
                      }
                       if(this.bullet_array[i]!=undefined&&this.bullet_array[i].recycle==true){   //判断子弹是否可回收
                             this.recycle_bullet.push(this.bullet_array[i]);     //把该子弹回收至回收子弹数组 
                             this.bullet_array.splice(i,1);     //把该子弹从子弹数组中删除           
                        }
                                           
                }//for
          }//for
                
    }//hit_target


     //碰撞检测函数////////////////////
    public  hitTest(obj1:egret.Sprite,obj2:egret.Sprite):boolean  
        {  
            if(obj1!=undefined&&obj2!=undefined){
            var rect1: egret.Rectangle = obj1.getBounds();  
            var rect2: egret.Rectangle = obj2.getBounds();  
            rect1.x = obj1.x;  
            rect1.y = obj1.y;  
            rect2.x = obj2.x;  
            rect2.y = obj2.y;  
            return rect1.intersects(rect2); 
            }  
            else{
            return false;      
            }
             
        }  

}