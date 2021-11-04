class BackgroundObj {
    constructor(assetname, x, y, scale) {
        this.sprite = new WholeSprite(assets[assetname], 0,0, scale);

        this.x = x;
        this.y = y;

        this.h = this.sprite.scale * this.sprite.h;
    }

    draw() {
        this.y = (canvas.height - this.h) - camY * ((this.h - canvas.height) / canvas.height * BG_PARALLAX);

        this.sprite.x = this.x;
        this.sprite.y = this.y;
        spritebuffer.push(this.sprite);
    }
}

const backgrounds = [];
function resetBackgrounds() {
    backgrounds.length = 0;

    backgrounds.push(new BackgroundObj('background_bottom', 0,0, 2));
    backgrounds.push(new BackgroundObj('background_top', 0,0, 2));

    for (var i = 0; i < backgrounds.length; i++)
        backgrounds[i].y = canvas.height - backgrounds[i].sprite.asset.height;
}
function drawBackgrounds() {
    for (var i = 0; i < backgrounds.length; i++) {
        backgrounds[i].draw();
    }
}