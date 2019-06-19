var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var sound_play = (function () {
    function sound_play(sound_name) {
        var sound_obj = RES.getRes(sound_name);
        sound_obj.play(0, 1);
    }
    return sound_play;
}());
__reflect(sound_play.prototype, "sound_play");
//# sourceMappingURL=sound_play.js.map