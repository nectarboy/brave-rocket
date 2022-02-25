gui.logonumber = {
    obj: null,
    class:
    class GuiLogoNumber {
        constructor() {
            this.logoOffX = 60;
            this.logoOffY = 40;

            this.sprite = new WholeSprite(assets['number_two'], 0,0, 2);

            this.x = 0;
            this.y = 0;

            this.sincounter = 0;
            this.sindiv = 12;
            this.sinX = 0;
            this.sinY = 0;
            this.circleradius = 10;
        };

        updateAnimation() {
            const sininput = this.sincounter / this.sindiv;
            this.sinX = Math.sin(sininput) * this.circleradius;
            this.sinY = Math.cos(sininput) * this.circleradius;

            this.sincounter++;
        }

        updatePosition() {
            this.x = gui.braverocketlogo.obj.x + this.logoOffX + this.sinX;
            this.y = gui.braverocketlogo.obj.y + this.logoOffY + this.sinY;
        }

        update() {
            this.updatePosition();
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