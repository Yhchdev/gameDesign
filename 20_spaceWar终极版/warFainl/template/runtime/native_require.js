
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"polyfill/promise.js",
	"bin-debug/bloodpack.js",
	"bin-debug/hpBorder.js",
	"bin-debug/boss.js",
	"bin-debug/bossBullet.js",
	"bin-debug/bullet.js",
	"bin-debug/bulletAdd.js",
	"bin-debug/enemy1.js",
	"bin-debug/enemybullet.js",
	"bin-debug/gameover.js",
	"bin-debug/gamewin.js",
	"bin-debug/background.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/location.js",
	"bin-debug/Main.js",
	"bin-debug/Mainstage.js",
	"bin-debug/myplane.js",
	"bin-debug/power.js",
	"bin-debug/props.js",
	"bin-debug/recycle.js",
	"bin-debug/sound_play.js",
	"bin-debug/winfire.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: true,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};