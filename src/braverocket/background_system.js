class BgObj {
    constructor(assetname, offset, scale) {
        this.sprite = new Sprite(assets[assetname], 0,0, BG_PORTION_W,assets[assetname].height, 0,0, scale);

        this.offset = offset;
        this.w = this.sprite.scale * this.sprite.w;
        this.h = this.sprite.scale * this.sprite.h;
    }

    draw() {
        var y = (canvas.height-this.h) - camY * (this.h / (canvas.height*2) * BG_PARALLAX);
        var bgportion = 0|((y - (this.offset * this.h) + (this.h - canvas.height)) / this.h);
        y -= bgportion * this.h;

        this.sprite.x = camX;
        this.sprite.y = y;
        this.sprite.offset = bgportion;
        bufferFrame(this.sprite, 0);
    }
}

const backgrounds = [];
function resetBackgrounds() {
    backgrounds.length = 0;

    const scale = 2;
    backgrounds.push(new BgObj('bg_bottom', 0, 2));
    backgrounds.push(new BgObj('bg_bottom', -1, 2));
    backgrounds.push(new BgObj('bg_top', 0, 2));
    backgrounds.push(new BgObj('bg_top', -1, 2));
}
function drawBackgrounds() {
    for (var i = 0; i < backgrounds.length; i++) {
        backgrounds[i].draw();
        backgrounds[i].draw();
    }
}