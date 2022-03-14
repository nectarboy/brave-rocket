class GuiButton {
    constructor(x, y, onclick) {
        this.sprite = new Sprite(assets['icons'], 0,0, 16,16, 0,0, 1);

        this.x = x;
        this.y = y;
        this.w = 16;
        this.h = 16;
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
        bufferFrame(this.sprite, 3);
    }
}