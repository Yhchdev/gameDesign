var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var recycle = (function () {
    function recycle() {
        this.recycle_array = [];
    }
    recycle.prototype.recycle_in = function (enemy) {
        enemy.recycle = true;
        this.recycle_array.push(enemy);
    };
    recycle.prototype.recycle_out = function () {
        for (var i = 0; i < this.recycle_array.length; i++) {
            if (this.recycle_array[i].recycle == true) {
                this.enemy_out = this.recycle_array[i];
                this.recycle_array.splice(i, 1);
                break;
            }
        }
    };
    return recycle;
}());
__reflect(recycle.prototype, "recycle");
//# sourceMappingURL=recycle.js.map