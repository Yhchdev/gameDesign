class sound_play{
    public constructor(sound_name:string){    
        var sound_obj :egret.Sound = RES.getRes(sound_name);
        sound_obj.play(0,1);
    }
}