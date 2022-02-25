// proud works of nectarboy ^w^

class Sprite {
    constructor(asset, x, y, w, h, charx, chary, scale) {
        this.asset = asset;

        this.off = 0;
        this.invisible = false;

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.charx = charx;
        this.chary = chary;
        this.scale = scale;

        this.rotation = false;
        this.rotdeg = 0;
    };

    centerOnto(x, y, w, h) {
        this.x = x - this.scale * (this.w*0.5) + w*0.5;
        this.y = y - this.scale * (this.h*0.5) + h*0.5;
    }

    draw() {
        if (this.invisible)
            return;

        var assetWidth = this.asset.width / this.w;
        var tx = this.charx + (0|(this.offset % assetWidth))*this.w;
        var ty = this.chary + (0|(this.offset / assetWidth))*this.w;
        var w = 0|(this.scale * this.w);
        var h = 0|(this.scale * this.h);

        ctx.imageSmoothingEnabled = false;
        if (this.rotation) {
            ctx.save();
            ctx.translate(Math.round(this.x + w*0.5), Math.round(this.y + h*0.5));
            ctx.rotate((this.rotdeg) * Math.PI / 180);

            ctx.drawImage(
                this.asset,
                tx, ty,
                this.w, this.h,
                -(0|(w*0.5)), -(0|(h * 0.5)),
                w, h
            );

            ctx.restore();
        }
        else {
            ctx.drawImage(
                this.asset,
                tx, ty,
                this.w, this.h,
                Math.round(this.x), Math.round(this.y),
                w, h
            );
        }
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
            ctx.fillText(
                this.text[i],
                Math.round(this.x), Math.round(this.y - (this.text.length-1) * this.size*0.5 + i*this.size)
            );
        }
    }
}