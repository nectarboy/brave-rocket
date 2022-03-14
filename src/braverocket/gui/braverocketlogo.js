gui.braverocketlogo = {
    obj: null,
    class:
    class GuiBraveRocketLogo {
        constructor() {
            this.sprite = new WholeSprite(assets['braverocket_logo'], 0,0, 2);

            this.offstageY = -90;
            this.offstageX = -160;
            this.yposition = 75;
            this.xposition = canvas.width/2;
            this.ydip = 90;
            this.stageEnterRate = 0.06;
            this.stageExitRate = 0.05;
            this.anim2sindiv = 20;

            this.x = 0;
            this.y = 0;
            this.sincounter = 0;
            this.animtype = 0;
        };

        updateAnimation() {
            switch (this.animtype) {
                case 1: { // normal anim
                    this.x = this.xposition;
                    this.y = this.yposition + (Math.sin(this.sincounter/this.anim2sindiv) * (this.ydip - this.yposition));
                    this.sincounter++;
                    break;
                }

                case 2: { // falling down --> normal
                    this.x = this.xposition;
                    this.y += this.stageEnterRate * ((this.ydip+10) - this.y);
                    if (this.y >= this.ydip - 1) {
                        this.animtype = 1;
                        this.sincounter = 0|(this.anim2sindiv * Math.PI / 2);
                    }
                    break;
                }
                case 3: { // going up offstage
                    this.x = this.xposition;
                    this.y += this.stageExitRate * (this.offstageY - this.y);
                    break;
                }

                case 4: { // sliding right --> normal
                    this.x += this.stageEnterRate * (this.xposition - this.x);
                    if (this.x >= this.xposition - 1) {
                        this.animtype = 1;
                    }
                    break;
                }
                case 5: { // sliding left offstage
                    this.x += this.stageExitRate * (this.offstageX - this.x);
                    break;
                }

                // anything else like 0 is no anim
            }
        }

        update() {
            this.updateAnimation();
        }

        updateSprite() {
            this.sprite.centerOnto(this.x, this.y, 0, 0);
        }
        draw() {
            this.updateSprite();
            bufferFrame(this.sprite, 2);
        }
    }
};