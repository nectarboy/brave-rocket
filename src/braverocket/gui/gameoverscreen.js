gui.gameoverscreen = {
    obj: null,
    class:
    class GuiGameOverScreen {
        constructor() {
            this.sprite = new WholeSprite(assets['game_over_screen'], 0,0, 2);

            this.flewtext = new Text(0,0, ['0m'], 10, 'black', false);
            this.flewtextoffx = -10;
            this.flewtextoffy = -36;

            this.scoretext = new Text(0,0, ['0'], 10, 'black', false);
            this.scoretextoffx = -10;
            this.scoretextoffy = -22;

            this.yousawtext = new Text(0,0, ['a birdie'], 10, 'black', false);
            this.yousawtextoffx = -2;
            this.yousawtextoffy = -8;

            this.x1 = -80;
            this.x2 = canvas.width/2;
            this.transition = 0.1;

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
            bufferFrame(this.sprite);
            bufferFrame(this.flewtext);
            bufferFrame(this.scoretext);
            bufferFrame(this.yousawtext);
        }
    }
};