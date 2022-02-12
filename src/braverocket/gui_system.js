class GuiTitleScreenFooter {
    constructor() {
        const offy = 9;

        this.x = canvas.width/2;
        this.y = canvas.height - offy;

        this.text = new Text(0,0, [`2021 - ${gameversion}`], 12, '#ffffff', true);
    }

    update() {

    }

    updateSprite() {
        this.text.x = this.x;
        this.text.y = this.y;
    }
    draw() {
        this.updateSprite();
        bufferFrame(this.text);
    }
}

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

class GuiGameOverScreen {
    constructor() {
        this.sprite = new WholeSprite(assets['game_over_screen'], 0,0, 2);

        this.flewtext = new Text(0,0, ['0m'], 10, 'black', false);
        this.flewtextoffx = -10;
        this.flewtextoffy = -36;

        this.scoretext = new Text(0,0, ['0'], 10, 'black', false);
        this.scoretextoffx = -10;
        this.scoretextoffy = -22;

        this.yousawtext = new Text(0,0, ['nothing'], 10, 'black', false);
        this.yousawtextoffx = -2;
        this.yousawtextoffy = -8;

        this.x1 = -80;
        this.x2 = canvas.width/2;
        this.transition = 0.1;

        this.x = this.x1;
        this.y = canvas.height/2;
    }

    updateAnimation() {
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

const gui = {
    braverocketlogo: {
        obj: null,
        class: GuiBraveRocketLogo
    },
    logonumber: {
        obj: null,
        class: GuiLogoNumber
    },
    clicktoplay: {
        obj: null,
        class: GuiClickToPlay
    },
    titlescreenfooter: {
        obj: null,
        class: GuiTitleScreenFooter
    },
    gameoverscreen: {
        obj: null,
        class: GuiGameOverScreen
    }
};
    
// buffer
const guibuffer = [];
function flushGuiBuffer() {
    guibuffer.length = 0;
}
function bufferGui(name) {
    refreshGui(name);
    guibuffer.push(gui[name].obj);
}

function updateGuiBuffer() {
    for (var i = 0; i < guibuffer.length; i++) {
        guibuffer[i].update();
    }
}
function drawGuiBuffer() {
    for (var i = 0; i < guibuffer.length; i++) {
        guibuffer[i].draw();
    }
}

function refreshGui(name) {
    gui[name].obj = new (gui[name].class)();
    gui[name].obj.updateSprite();
}

function resetGui() {
    flushGuiBuffer();

    refreshGui('braverocketlogo');
    refreshGui('logonumber');
    refreshGui('clicktoplay');
    refreshGui('titlescreenfooter');
    refreshGui('gameoverscreen');
}