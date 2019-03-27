status = 'right'
speed = 5
onEnterFrame= function(){
	if(status=='right' && !_root.box.hitTest(_root.wall2)){
		_root.box._x +=5;
		}else{
			_root.box.gotoAndPlay(2)
			status = 'left'
			}
	if(status=='left' && !_root.box.hitTest(_root.wall1)){
		_root.box._x -=5;
		}else{
			_root.box.gotoAndPlay(3)
			status = 'left'
			}
	}