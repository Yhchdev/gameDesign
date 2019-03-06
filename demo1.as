onClipEvent(load){
	status = "right"
	}

onClipEvent(enterFrame){
	if(status="right" and this._x<550){
		this.x+=5;
	}
	if(this._x>=550){
		status="left";
		}
	if(status="left" and this._x>0){
		this.x-=5;
		}
	if(this._x<0){
		status="right";
		}
}