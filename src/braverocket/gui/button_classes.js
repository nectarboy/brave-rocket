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
        this.sprite.chary = this.iconindex * this.h;

        // update width for use
        this.w = this.sprite.w * this.sprite.scale;
        this.h = this.sprite.h * this.sprite.scale;
    }
}

class GuiTextButton extends GuiButton {
    constructor(text, x, y, isbig,iconindex, onclick) {
        var w = 32 * (0|(isbig)+1);

        super('gui_icons', x,y, w,12, 0,0, 2, onclick);
        this.isbig = isbig;
        this.iconindex = iconindex;

        this.sprite.charx = this.isbig * 32;
        this.sprite.chary = this.iconindex * this.h;

        // update width for use
        this.w = this.sprite.w * this.sprite.scale;
        this.h = this.sprite.h * this.sprite.scale;
        this.text = text; // a text *object*
    }

    hide() {
        this.hidden = true;
        this.sprite.invisible = true;
        this.text.invisible = true;
    }
    unhide() {
        this.hidden = false;
        this.sprite.invisible = false;
        this.text.invisible = false;
    }

    updateSprite() {
        this.sprite.centerOnto(this.x, this.y, this.w, this.h);
        this.text.x = this.x + this.w*0.5;
        this.text.y = this.y + this.h*0.5 + this.text.size*0.25;
    }
    draw() {
        this.updateSprite();
        bufferFrame(this.sprite, 2);
        bufferFrame(this.text, 2);
    }
}