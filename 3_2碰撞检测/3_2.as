onClipEvent(enterFrame){
	if(!this.hitTest(_root.wall)){
		this._x +=5;
	}else{
		this.stop()
		}
}