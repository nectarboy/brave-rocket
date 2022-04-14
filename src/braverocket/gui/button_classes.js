class GuiButton {
    constructor(assetname, x,y, w,h, charx,chary, scale, onclick) {
        this.sprite = new Sprite(assets[assetname], 0,0, w,h, charx,chary, scale)

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.hidden = false;
        this.onclick = onclick;
    }

    hide() {
        this.hidden = true;
        this.sprite.invisible = true;
    }
    unhide() {
        this.hidden = false;
        this.sprite.invisible = false;
    }

    checkIfClicked() {
        if (
            // not hidden and player clicked somewhere ?
            !this.hidden && controller.firstclick &&
            // collision
            controller.x >= this.x && controller.x <= this.x + this.w &&
            controller.y >= this.y && controller.y <= this.y + this.h
        )
        {
            this.onclick();
            controller.firstclick = false; // so no other buttons can be pressed
        }
    }
    update() {
        this.checkIfClicked();
    }

    updateSprite() {
        this.sprite.centerOnto(this.x, this.y, this.w, this.h); 
    }
    draw() {
        this.updateSprite();
        bufferFrame(this.sprite, 2);
    }
}

class GuiSmallButton extends GuiButton {
    constructor(x, y, iconindex, onclick) {
        super('gui_icons', x,y, 16,16, 0,48, 1, onclick);
        this.iconindex = iconindex;
        this.sprite.charx = this.iconindex * this.w;
    }
}

class GuiArrowButton extends GuiButton {
    constructor(x, y, iconindex, onclick) {
        super('gui_icons', x,y, 24,16, 0,0, 1, onclick);
        this.iconindex = iconindex;
        this.sprite.charx = 96;
        this.sprite.chary = 64 + this.iconindex * this.h;

        // update width for use
        this.w = this.sprite.w * this.sprite.scale;
        this.h = this.sprite.h * this.sprite.scale;
    }
}

class GuiTextButton extends GuiButton {
    constructor(text, x, y, w,iconindex, onclick) {
        super('gui_icons', x,y, w,12, 0,0, 2, onclick);
        this.text = text; // a text *object*

        this.spritescale = this.sprite.scale;
        this.spritepartwidth = 8;

        this.iconindex = iconindex;
        this.sprite.chary = iconindex * this.h;

        this.h = this.sprite.h * this.sprite.scale;

        this.sprites = [];
        this.spritepositions = [];
        this.generateSprites();
    }

    setIconIndex(iconindex) {
        this.iconindex = iconindex;
        var chary = iconindex * this.sprite.h;
        for (var i = 0; i < this.sprites.length; i++) {
            this.sprites[i].chary = chary;
        }
    }

    hide() {
        this.hidden = true;
        //this.sprite.invisible = true;
        this.text.invisible = true;
    }
    unhide() {
        this.hidden = false;
        //this.sprite.invisible = false;
        this.text.invisible = false;
    }

    generateSprites() {
        this.sprites.length = 0;

        // generate sprite
        var centerSpritePieceAmt = Math.floor(this.w/this.spritescale / this.spritepartwidth);
        this.sprites.push(new Sprite(assets['gui_icons'], 0,0, 8,12, 0,0, this.spritescale)); // left
        for (var i = 0; i < centerSpritePieceAmt; i++) {
            this.sprites.push(new Sprite(assets['gui_icons'], 0,0, 8,12, this.spritepartwidth,0, this.spritescale)); // middle
        }
        this.sprites.push(new Sprite(assets['gui_icons'], 0,0, 8,12, this.spritepartwidth*2,0, this.spritescale)); // right

        // find sprite positions
        this.spritepositions = new Array(this.sprites.length);

        var lengthM1 = this.sprites.length - 1;
        this.spritepositions[0] = 0;
        this.spritepositions[lengthM1] = this.w - this.spritepartwidth;
        for (var i = 1; i < lengthM1; i++) {
            this.spritepositions[i] = i * (this.w / this.sprites.length);
        }

        // reset button icon type
        this.setIconIndex(this.iconindex);
    }

    updateSprite() {
        var lengthM1 = this.sprites.length - 1;
        for (var i = 1; i < lengthM1; i++) {
            this.sprites[i].centerOnto(this.x + this.spritepositions[i], this.y, this.spritepartwidth, this.h);
        }
        this.sprites[0].x = this.x;
        this.sprites[0].y = this.y;
        this.sprites[lengthM1].x = this.x + this.w - this.spritepartwidth * this.sprite.scale;
        this.sprites[lengthM1].y = this.y;

        this.text.x = this.x + this.w*0.5;
        this.text.y = this.y + this.h*0.5 + this.text.size*0.25;
    }
    draw() {
        if (this.hidden)
            return;

        this.updateSprite();

        var lengthM1 = this.sprites.length - 1;
        bufferFrame(this.sprites[lengthM1], 2);
        for (var i = 0; i < lengthM1; i++) {
            bufferFrame(this.sprites[i], 2);
        }
        bufferFrame(this.text, 2);
    }
}