// proud works of nectarboy ^w^

class Sprite {
    constructor(asset, x, y, w, h, char, scale) {
        this.asset = asset;

        this.offset = 0;
        this.invisible = false;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.char = char;
        this.scale = scale;
    };

    centerOnto(x, y, w, h) {
        this.x = x - this.scale * (this.w*0.5) + w*0.5;
        this.y = y - this.scale * (this.h*0.5) + h*0.5;
    }

    draw() {
        if (this.invisible)
            return;

        var char = this.char + this.offset;
        var assetWidth = this.asset.width / 8;
        var tx = (0|(char % assetWidth))*8;
        var ty = (0|(char / assetWidth))*8;

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
            this.asset,
            tx, ty,
            this.w, this.h,
            Math.round(this.x), Math.round(this.y),
            0|(this.scale * this.w), 0|(this.scale * this.h)
        );
    }
}

class WholeSprite {
    constructor(asset, x, y, scale) {
        this.asset = asset;

        this.x = x;
        this.y = y;
        this.w = this.asset.width;
        this.h = this.asset.height;
        this.scale = scale;
        this.invisible = false;
    };

    centerOnto(x, y, w, h) {
        this.x = x - this.scale * (this.w*0.5) + w*0.5;
        this.y = y - this.scale * (this.h*0.5) + h*0.5;
    }

    draw() {
        if (this.invisible)
            return;

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
            this.asset,
            Math.round(this.x), Math.round(this.y),
            0|(this.scale * this.asset.width), 0|(this.scale * this.asset.height)
        );
    }
}

class Text {
    constructor(x, y, text, size, color, center) {
        this.invisible = false;

        this.x = x;
        this.y = y;
        this.text = text;
        this.size = size;
        this.color = color;
        this.center = center;  
    }

    draw() {
        if (this.invisible)
            return;

        ctx.font = this.size + 'px BraveRocketFont';
        ctx.textAlign = this.center ? 'center' : 'start';
        ctx.fillStyle = this.color;
        for (var i = 0; i < this.text.length; i++) {
            ctx.fillText(this.text[i], this.x, this.y - this.text.length * this.size*0.5 + i*this.size);
        }
    }
}