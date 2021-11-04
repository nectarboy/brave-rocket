class GuiBraveRocketLogo {
    constructor(x, y) {
        this.sprite = new WholeSprite(assets['braverocket_logo'], 0,0, 2);

        this.x = x;
        this.y = y;

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
        spritebuffer.push(this.sprite);
    }
}

var gui = {
    braverocket_logo: null
};

function resetGui() {
    gui.braverocket_logo = new GuiBraveRocketLogo(0, 0);
    gui.braverocket_logo.x = canvas.width/2;
    gui.braverocket_logo.y = BRAVEROCKET_LOGO_OFFSTAGE_Y;
    gui.braverocket_logo.updateSprite();
}