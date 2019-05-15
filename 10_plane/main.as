//背景滚动标志位
bgoneroll = 1;
bgtworoll = 0;

//计时器
timer = 0;
//星星数量
stari = 0;

//我的子弹数
mbi = 0;
//控制子弹速度
zdss = 10;

//敌机数
enemyi = 0
//敌机子弹数
enemyBulletCount = 0

//得分
score = 0

//buff标志位
getBuff = 0
buffi = 0
//获得buff后的使用次数
buffcount = 0

//boss是否出现
bossIsCome = false

//boss 左右移动标志
boss_left = 1
boss_right = 0

//boss 子弹
bossPoweri = 0 
bosshp = 150

//我的血量
myhp = 100

hpwidth = bar._xscale
// 宽度/myhp
wbhp = hpwidth/myhp 

//血包数量
bloodi = 0



onEnterFrame = function(){
	timer++;
	
	//背景替换
	bgReplace();
	//生成星星
	createStar();
	//控制我的飞机
	
	controlMylife();
	
	//boss没来 ——>生成敌机
	if(!bossIsCome){
		createEnemy();
	}
	
	//生成buff
	createBuff();
	//获取每一架敌机
	iterEplane();
	//boss出现
	bossAppears();
	
	//将血量转化为宽度
	plotHP();
	
	if(myhp<= 0 && _root.me._currentframe ==1){
		_root.me.gotoAndPlay(2);
	}
	
	// 血量增加
	bloodpack();
}



// 函数1: 背景替换
function bgReplace(){
	//bg1
	if(bgoneroll == 1){
		background1._y += 3;
		if(background1._y > 0){
			bgtworoll = 1;
		};
		if(background1._y >=800){
			background1._y = -800;
			bgoneroll = 0;
		};
	};
	//bg2
	if(bgtworoll == 1){
		background2._y += 3;
		if(background2._y > 0){
			bgoneroll = 1;
		};
		if(background2._y >= 800){
			background2._y = -800;
		}
	};
}

//函数2: 生成星星
function createStar(){ 
	if (timer>=random(20)) {
		stari++;
		duplicateMovieClip("star", "star_"+stari, this.getNextHighestDepth());
		this["star_"+stari]._y = -5;
		this["star_"+stari]._x = random(540)+5;
	}	
}

//函数3:控制飞机
function controlMylife(){
	//从10减到1才能进入响应键盘事件
	mybulletV -=1 ;
	if(mybulletV <=0){
		//发射子弹
		if(Key.isDown(Key.SPACE)){
			//有buff加成的子弹效果
			if(buffcount < 0){
				getBuff = 0;
			}
			if(getBuff == 1){
				buffcount --;
				duplicateMovieClip("myb","b"+mbi,mbi);
				_root["b"+mbi]._x =_root.me._x+40;
				_root["b"+mbi]._y = _root.me._y;
				_root["b"+mbi].onEnterFrame = function(){
					this._y -=10;
					for(ei =0;ei< enemyi;ei++){
					if(this.hitTest(_root["p"+ei]) && _root["p"+ei]._currentframe ==1 ){
						_root["p"+ei].gotoAndPlay(2);
						score += 10;
						this.swapDepths(0);
						this.removeMovieClip();
					}
					if(this._y <0){
						this.swapDepths(0);
						this.removeMovieClip();
					}
				}
				//打boss
				if( bossIsCome && this.hitTest(_root.boss)){
					this.swapDepths(0);
					this.removeMovieClip();
					if(bosshp > 0 && _root.boss._currentframe ==1 ){
						bosshp -=10;
						_root.boss.gotoAndPlay(2);
					}
					if(bosshp == 0){
						bossIsCome = false;
						//_root.boss.gotoAndPlay(23);
						gotoAndStop(5);
					}
				
				}
				};
				mbi++
			};
			if(getBuff == 0){
			duplicateMovieClip("mybullet","b"+mbi,mbi);
			_root["b"+mbi]._x =_root.me._x+40;
			_root["b"+mbi]._y = _root.me._y;
			_root["b"+mbi].onEnterFrame = function(){
				this._y -=10;
				for(ei =0;ei< enemyi;ei++){
					if(this.hitTest(_root["p"+ei]) && _root["p"+ei]._currentframe ==1 ){
						_root["p"+ei].gotoAndPlay(2);
						score += 10;
						this.swapDepths(0);
						this.removeMovieClip();
					}
				if(this._y <0){
						this.swapDepths(0);
						this.removeMovieClip();
					}
				}
				//打boss
				if( bossIsCome && this.hitTest(_root.boss)){
					this.swapDepths(0);
					this.removeMovieClip();
					if(bosshp > 0 && _root.boss._currentframe ==1 ){
						bosshp -=10;
						_root.boss.gotoAndPlay(2);
					}
					if(bosshp == 0){
						bossIsCome = false;
						_root.boss.gotoAndPlay(23);
					}
				
				}
			};
			mbi++;
		}
		}
		//重置为10
		mybulletV = zdss;
	}
}

//函数4: 生成敌机
function createEnemy(){
	if( timer % 100 ==0){
		duplicateMovieClip("enemy","p"+enemyi,200+enemyi);
		_root["p"+enemyi]._x =random(450);
		_root["p"+enemyi]._y = -100;
		_root["p"+enemyi].onEnterFrame = function(){
			this._y += 2;
			//超出屏幕，销毁
			if(this._y > 1000){
				this.swapDepths(0);
				this.removeMovieClip();
			}
		};
		enemyi++;
	}
}


// 函数5: buff的出现与使用;
function createBuff(){
	if( timer % 800 ==0){
		duplicateMovieClip("buff","buff"+buffi,300+buffi);
		_root["buff"+buffi]._x =random(450);
		_root["buff"+buffi]._y = -100;
		_root["buff"+buffi].onEnterFrame = function(){
			this._y += 4;
			//吃到buff
			if(this.hitTest(_root.me)){
				//标记获得buff
				getBuff = 1 ;
				//可以使用8次;
				buffcount = 8;
				
				this.swapDepths(0);
				this.removeMovieClip();
			};
			//超出屏幕，销毁
			if(this._y>1000){
				this.swapDepths(0);
				this.removeMovieClip();
			}
		};
		buffi++;
	}
}


//函数6:遍历获取每一架敌机
function iterEplane() {
	for (i = 0; i < enemyi; i ++) {
		plane = _root["p" + i];
		if (plane == undefined) {
			continue;
		}
		initBullet(plane);
	}
}


//函数7: 生成每架敌机子弹
function initBullet(ep) {
	enemyBulletCount ++;
	if(timer % 60 ==0){
		duplicateMovieClip("ebullet", "ebullet" + enemyBulletCount, enemyBulletCount + 20000);
		//获取到生成的子弹对象
		eb = _root["ebullet" + enemyBulletCount];
		eb._x = ep._x + 35;
		eb._y = ep._y + 25;
		
	}
	eb.onEnterFrame = function () {
		this._y += random(5)+5;
		if (this.hitTest(_root.me)) {
			if(this._currentframe == 1){
				myhp -= 5;
				this.gotoAndPlay(3);
			}
		}
	}
}


//函数8: booss出现
function bossAppears(){
	if(score >= 150){
		//boss出现了
		bossIsCome = true;
		boss = _root.boss
		boss.onEnterFrame = function(){
			if(timer % 30 ==0 && random(30)>15){
				bossPower10();
			}
			if(timer % 100 ==0){
				bossPower30();
			}
			if(boss._y<70){
				boss._y +=1;
			}else{
				//boss左右移动
				if(boss_left ==1){
					boss._x -= random(4)+ 1;
					if(boss._x < 5){
						boss_left = 0;
						boss_right = 1
					}
				}
				if(boss_right == 1){
					boss._x += random(4)+ 1;
					if(boss._x > 350){
						boss_right = 0;
						boss_left = 1
					}
				}
			};
		}
	}
}


//函数9：boss的火力 10
function bossPower10(){
	duplicateMovieClip("ebullet","bb"+bossPoweri,bossPoweri+6000);
	_root["bb"+bossPoweri]._x =_root.boss._x+90;
	_root["bb"+bossPoweri]._y = _root.boss._y+150;
	_root["bb"+bossPoweri].onEnterFrame = function(){
		this._y +=10;
		
		if(this.hitTest(_root.me) && this._currentframe == 1 ){
			myhp -= 10;
			this.gotoAndPlay(3);
		}
	}
	bossPoweri++;
}

//函数10：boss的火力 30
function bossPower30(){
	duplicateMovieClip("ebullet","bb"+bossPoweri,bossPoweri+6000);
	_root["bb"+bossPoweri]._x =_root.boss._x+90;
	_root["bb"+bossPoweri]._y = _root.boss._y+150;
	_root["bb"+bossPoweri].onEnterFrame = function(){
		this._y +=10;
		this._x += 4
		if(this.hitTest(_root.me) && this._currentframe == 1 ){
			myhp -= 10;
			this.gotoAndPlay(3);
		}
	}
	bossPoweri++;
}

// 函数11：将血量转化为宽度
function plotHP(){
	if(myhp>=0){
		_root.bar._xscale = wbhp * myhp;
	}
}

//// 函数12: bloodpackge的出现与使用;
function bloodpack(){
	if( timer % 600 ==0){
		duplicateMovieClip("blood","blood"+bloodi,400000000+bloodi);
		_root["blood"+bloodi]._x =random(450);
		_root["blood"+bloodi]._y = -100;
		_root["blood"+bloodi].onEnterFrame = function(){
			this._y += 5;
			
			//吃到血包
			if(this.hitTest(_root.me)){
				myhp += 10 ;
				this.swapDepths(0);
				this.removeMovieClip();
			};
			//超出屏幕，销毁
			if(this._y>1000){
				this.swapDepths(0);
				this.removeMovieClip();
			}
		};
		bloodi++;
	}
}




