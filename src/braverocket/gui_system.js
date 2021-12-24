class GuiTitleScreenFooter {
    constructor() {
        this.yOffset = 3;

        this.x = canvas.width/2;
        this.y = canvas.height - this.yOffset;

        this.text = new Text(0,0, ['2021 - 1.2.4'], 12, '#ffffff', true);
    }

    updateText() {
        this.text.x = this.x;
        this.text.y = this.y;
    }
    draw() {
        this.updateText();
        bufferFrame(this.text);
    }
}

class GuiBraveRocketLogo {
    constructor() {
        this.offstageY = -90;
        this.stageExitRate = 0.05;
        this.offstage = true;
        this.beginningSindiv = 30;
        this.endSindiv = 20;

        this.sprite = new WholeSprite(assets['braverocket_logo'], 0,0, 2);

        this.x = canvas.width/2;
        this.y = this.offstageY;

        this.yposition = 75;
        this.ydip = 90;
        this.sincounter = 0;

        this.sindiv = this.beginningSindiv;

        this.shouldanimate = true;
    };

    updateAnimation() {
        if (!this.shouldanimate) return;

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
        this.x = gui.braverocketlogo.x + this.logoOffX + this.sinX;
        this.y = gui.braverocketlogo.y + this.logoOffY + this.sinY;
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

var gui = {
    braverocketlogo: null,
    logonumber: null,
    titlescreenfooter: null
};

function resetGui() {
    gui.braverocketlogo = new GuiBraveRocketLogo();
    gui.braverocketlogo.updateSprite();

    gui.logonumber = new GuiLogoNumber();
    gui.logonumber.updateSprite();

    gui.titlescreenfooter = new GuiTitleScreenFooter();
    gui.titlescreenfooter.updateText();
}