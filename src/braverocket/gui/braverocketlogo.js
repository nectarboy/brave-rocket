gui.braverocketlogo = {
    obj: null,
    class:
    class GuiBraveRocketLogo {
        constructor() {
            this.sprite = new WholeSprite(assets['braverocket_logo'], 0,0, 2);

            this.offstageY = -90;
            this.stageExitRate = 0.05;
            this.offstage = true;
            this.beginningSindiv = 30;
            this.endSindiv = 20;
            this.yposition = 75;
            this.ydip = 90;

            this.sincounter = 0;
            this.sindiv = this.beginningSindiv;

            this.x = canvas.width/2;
            this.y = this.offstageY;

            this.shouldanimate = true;
        };

        updateAnimation() {
            if (!this.shouldanimate)
                return;

            if (this.offstage) {
                this.y = this.offstageY + (Math.sin(this.sincounter/this.sindiv) * (this.ydip - this.offstageY));
                if (this.y >= this.ydip - 1) {
                    this.offstage = false;
                    this.sindiv = this.endSindiv;
                }
            }
            else {
                this.y = this.yposition + (Math.sin(this.sincounter/this.sindiv) * (this.ydip - this.yposition));
            }

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