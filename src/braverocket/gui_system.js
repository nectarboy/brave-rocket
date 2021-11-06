class GuiTitleScreenFooter {
    constructor() {
        this.yOffset = 3;

        this.x = canvas.width/2;
        this.y = canvas.height - this.yOffset;

        this.text = new Text(0,0, ['2021 - 1.2.2'], 12, '#ffffff', true);
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
        this.offstageY = -75;
        this.offstageRate = 0.05;

        this.sprite = new WholeSprite(assets['braverocket_logo'], 0,0, 2);

        this.x = canvas.width/2;
        this.y = this.offstageY;

        this.yPositions = [90, 65];
        this.step = 0;
        this.tick = 0;
        this.rate = 45;
        this.animationMul = 0.05;

        this.shouldanimate = true;
    };

    updateAnimation() {
        if (!this.shouldanimate) return;

        if (this.tick >= this.rate) {
            this.tick = 0;

            this.step++;
            if (this.step >= this.yPositions.length) {
                this.step = 0;
            }
        }
        else {
            this.tick++;
        }

        this.y += this.animationMul * (this.yPositions[this.step] - this.y);
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

var gui = {
    braverocket_logo: null,
    titlescreen_footer: null
};

function resetGui() {
    gui.braverocket_logo = new GuiBraveRocketLogo();
    gui.braverocket_logo.updateSprite();

    gui.titlescreen_footer = new GuiTitleScreenFooter();
    gui.titlescreen_footer.updateText();
}