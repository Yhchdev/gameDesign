class sound_play{
    public constructor(sound_name:string){    
        var sound_obj :egret.Sound = RES.getRes(sound_name);
        //从0秒   播放1次
        sound_obj.play(0,1);
    }
}