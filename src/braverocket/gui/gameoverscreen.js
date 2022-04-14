gui.gameoverscreen = {
    obj: null,
    class:
    class GuiGameOverScreen {
        constructor() {
            this.sprite = new WholeSprite(assets['game_over_screen'], 0,0, 2);
            this.w = this.sprite.w * this.sprite.scale;
            this.h = this.sprite.h * this.sprite.scale;

            this.flewtext = new Text(0,0, ['0m'], 10, 'black', false);
            this.flewtextoffx = -10;
            this.flewtextoffy = -36;

            this.scoretext = new Text(0,0, ['0'], 10, 'black', false);
            this.scoretextoffx = -10;
            this.scoretextoffy = -22;

            this.yousawtext = new Text(0,0, ['a birdie'], 10, 'black', false);
            this.yousawtextoffx = -2;
            this.yousawtextoffy = -8;

            this.x1 = -80 - this.w/2;
            this.x2 = canvas.width/2 - this.w/2;
            this.yposition = canvas.height/2 - this.h/2;
            this.transition = 0.1;

            this.x = this.x1;
            this.y = this.yposition;
            this.shouldanimate = true;
        }

        updateAnimation() {
            if (!this.shouldanimate)
                return;

            this.x += (this.x2 - this.x) * this.transition;
        }

        checkShouldRestartGame() {
            if (!controller.firstclick)
                return;

            // play again
            if (
                // clicking outside of box
                (controller.x <= this.x || controller.x >= this.x + this.w ||
                controller.y <= this.y || controller.y >= this.y + this.h)
                ||
                // clicking play again button
                (controller.x >= this.x + 4*this.sprite.scale && controller.x <= this.x + 30*this.sprite.scale &&
                controller.y >= this.y + 58*this.sprite.scale && controller.y <= this.y + 71*this.sprite.scale)
            )
            {  
                // play again
                gameReset();
                prepareLoopState(1);
                controller.firstclick = false;
            }

            // quit
            else if (
                // clicking quit button
                (controller.x >= this.x + 33*this.sprite.scale && controller.x <= this.x + 59*this.sprite.scale &&
                controller.y >= this.y + 58*this.sprite.scale && controller.y <= this.y + 71*this.sprite.scale)
            )
            {
                // titlescreen
                gameReset();
                prepareLoopState(0);
                controller.firstclick = false;
            }
        }
        
        update() {
            this.checkShouldRestartGame();
            this.updateAnimation();
        }

        updateSprite() {
            this.sprite.centerOnto(this.x, this.y, this.w, this.h);

            const x = this.x + this.w/2;
            const y = this.y + this.h/2;
            this.flewtext.x = x + this.flewtextoffx;
            this.flewtext.y = y + this.flewtextoffy;
            this.scoretext.x = x + this.scoretextoffx;
            this.scoretext.y = y + this.scoretextoffy;
            this.yousawtext.x = x + this.yousawtextoffx;
            this.yousawtext.y = y + this.yousawtextoffy;
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