//����������־λ
bgoneroll = 1;
bgtworoll = 0;

//��ʱ��
timer = 0;
//��������
stari = 0;

//�ҵ��ӵ���
mbi = 0;
//�����ӵ��ٶ�
zdss = 10;

//�л���
enemyi = 0
//�л��ӵ���
enemyBulletCount = 0

//�÷�
score = 0

//buff��־λ
getBuff = 0
buffi = 0
//���buff���ʹ�ô���
buffcount = 0

//boss�Ƿ����
bossIsCome = false

//boss �����ƶ���־
boss_left = 1
boss_right = 0

//boss �ӵ�
bossPoweri = 0 
bosshp = 150

//�ҵ�Ѫ��
myhp = 100

hpwidth = bar._xscale
// ���/myhp
wbhp = hpwidth/myhp 

//Ѫ������
bloodi = 0



onEnterFrame = function(){
	timer++;
	
	//�����滻
	bgReplace();
	//��������
	createStar();
	//�����ҵķɻ�
	
	controlMylife();
	
	//bossû�� ����>���ɵл�
	if(!bossIsCome){
		createEnemy();
	}
	
	//����buff
	createBuff();
	//��ȡÿһ�ܵл�
	iterEplane();
	//boss����
	bossAppears();
	
	//��Ѫ��ת��Ϊ���
	plotHP();
	
	if(myhp<= 0 && _root.me._currentframe ==1){
		_root.me.gotoAndPlay(2);
	}
	
	// Ѫ������
	bloodpack();
}



// ����1: �����滻
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

//����2: ��������
function createStar(){ 
	if (timer>=random(20)) {
		stari++;
		duplicateMovieClip("star", "star_"+stari, this.getNextHighestDepth());
		this["star_"+stari]._y = -5;
		this["star_"+stari]._x = random(540)+5;
	}	
}

//����3:���Ʒɻ�
function controlMylife(){
	//��10����1���ܽ�����Ӧ�����¼�
	mybulletV -=1 ;
	if(mybulletV <=0){
		//�����ӵ�
		if(Key.isDown(Key.SPACE)){
			//��buff�ӳɵ��ӵ�Ч��
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
				//��boss
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
				//��boss
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
		//����Ϊ10
		mybulletV = zdss;
	}
}

//����4: ���ɵл�
function createEnemy(){
	if( timer % 100 ==0){
		duplicateMovieClip("enemy","p"+enemyi,200+enemyi);
		_root["p"+enemyi]._x =random(450);
		_root["p"+enemyi]._y = -100;
		_root["p"+enemyi].onEnterFrame = function(){
			this._y += 2;
			//������Ļ������
			if(this._y > 1000){
				this.swapDepths(0);
				this.removeMovieClip();
			}
		};
		enemyi++;
	}
}


// ����5: buff�ĳ�����ʹ��;
function createBuff(){
	if( timer % 800 ==0){
		duplicateMovieClip("buff","buff"+buffi,300+buffi);
		_root["buff"+buffi]._x =random(450);
		_root["buff"+buffi]._y = -100;
		_root["buff"+buffi].onEnterFrame = function(){
			this._y += 4;
			//�Ե�buff
			if(this.hitTest(_root.me)){
				//��ǻ��buff
				getBuff = 1 ;
				//����ʹ��8��;
				buffcount = 8;
				
				this.swapDepths(0);
				this.removeMovieClip();
			};
			//������Ļ������
			if(this._y>1000){
				this.swapDepths(0);
				this.removeMovieClip();
			}
		};
		buffi++;
	}
}


//����6:������ȡÿһ�ܵл�
function iterEplane() {
	for (i = 0; i < enemyi; i ++) {
		plane = _root["p" + i];
		if (plane == undefined) {
			continue;
		}
		initBullet(plane);
	}
}


//����7: ����ÿ�ܵл��ӵ�
function initBullet(ep) {
	enemyBulletCount ++;
	if(timer % 60 ==0){
		duplicateMovieClip("ebullet", "ebullet" + enemyBulletCount, enemyBulletCount + 20000);
		//��ȡ�����ɵ��ӵ�����
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


//����8: booss����
function bossAppears(){
	if(score >= 150){
		//boss������
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
				//boss�����ƶ�
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


//����9��boss�Ļ��� 10
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

//����10��boss�Ļ��� 30
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

// ����11����Ѫ��ת��Ϊ���
function plotHP(){
	if(myhp>=0){
		_root.bar._xscale = wbhp * myhp;
	}
}

//// ����12: bloodpackge�ĳ�����ʹ��;
function bloodpack(){
	if( timer % 600 ==0){
		duplicateMovieClip("blood","blood"+bloodi,400000000+bloodi);
		_root["blood"+bloodi]._x =random(450);
		_root["blood"+bloodi]._y = -100;
		_root["blood"+bloodi].onEnterFrame = function(){
			this._y += 5;
			
			//�Ե�Ѫ��
			if(this.hitTest(_root.me)){
				myhp += 10 ;
				this.swapDepths(0);
				this.removeMovieClip();
			};
			//������Ļ������
			if(this._y>1000){
				this.swapDepths(0);
				this.removeMovieClip();
			}
		};
		bloodi++;
	}
}




