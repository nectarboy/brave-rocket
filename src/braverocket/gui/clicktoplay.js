gui.clicktoplay = {
    obj: null,
    class:
    class GuiClickToPlay {
        constructor() {
            this.sprite = new WholeSprite(assets['click_to_play'], 0,0, 1);

            this.y1 = canvas.height - 40;
            this.y2 = canvas.height - 35;

            this.sincounter = 0;
            this.sindiv = 20;

            this.x = canvas.width/2;
            this.y = this.y1;
        }

        updateAnimation() {
            this.y = gui.braverocketlogo.obj.y + 56;
            this.y = this.y1 + (Math.sin(this.sincounter/this.sindiv) * (this.y2 - this.y1));
            this.sincounter++;
        }

        update() {
            this.updateAnimation();
        }

        updateSprite() {
            this.sprite.centerOnto(this.x, this.y, 0, 0);
        }
        draw() {
            this.updateSprite();
            bufferFrame(this.sprite);
        }
    }
};