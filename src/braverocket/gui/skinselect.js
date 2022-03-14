gui.textbox = {
    obj: null,
    class:
    class GuiTextBox {
        constructor() {
            this.sprite = new WholeSprite(assets['text_box'], 0,0, 2);

            this.x = this.x1;
            this.y = canvas.height/2;
            this.shouldanimate = true;
        }

        updateAnimation() {
            if (!this.shouldanimate)
                return;

            this.x += (this.x2 - this.x) * this.transition;
        }

        update() {
            this.updateAnimation();
        }

        updateSprite() {
            this.sprite.centerOnto(this.x, this.y, 0, 0);
            this.flewtext.x = this.x + this.flewtextoffx;
            this.flewtext.y = this.y + this.flewtextoffy;
            this.scoretext.x = this.x + this.scoretextoffx;
            this.scoretext.y = this.y + this.scoretextoffy;
            this.yousawtext.x = this.x + this.yousawtextoffx;
            this.yousawtext.y = this.y + this.yousawtextoffy;
        }
        draw() {
            this.updateSprite();
            bufferFrame(this.sprite, 2);
            bufferFrame(this.flewtext, 2);
            bufferFrame(this.scoretext, 2);
            bufferFrame(this.yousawtext, 2);
        }
    }
};