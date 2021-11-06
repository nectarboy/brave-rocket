class Player extends Entity {
    constructor(x, y) {
        super(x, y, 12, 16);
        this.minVy = -1; // -1.5
        this.maxVy = -15; // -15
        this.vy = 0;

        this.dead = false;
        this.resetstartpositionflag = false;

        this.bottomoffset = 0;
        this.bottomoffsetRate = 0.1;
        
        this.deathscroll = 0;

        this.particletick = 0;
        this.particlerate = 3;

        this.sprite = new Sprite(assets['entities'], 0,0, 16,16, 0, 2);
    }

    resetStartPosition() {
        this.resetstartpositionflag = false;
        this.y = canvas.height - PLAYER_TITLESCREEN_BOTTOM_OFFSET - this.h;
    }

    deathScrollCamera() {
        camY += this.deathscroll;
        this.deathscroll *= DEATHSCROLL_SLOWDOWN_MUL;
    }
    deathAnimation() {
        this.sprite.invisible = true;

        var x = this.x + this.w*0.5;
        var y = this.y + this.h*0.5;
        var velrange = 1 - (this.vy - this.maxVy) / (this.minVy - this.maxVy);

        // explosion
        var explosionammount = PLAYER_EXPLOSION_MIN + velrange * (PLAYER_EXPLOSION_MAX - PLAYER_EXPLOSION_MIN);
        for (var i = 0; i < explosionammount; i++) {
            entities.push(particleSpawners.combust(x, y));
        }

        // boom
        entities.push(particleSpawners.boom(x, y));
    }
    die() {
        if (GODMODE || this.dead) return;
        this.dead = true;

        this.deathscroll = this.vy * DEATHSCROLL_VEL_MUL;
        this.deathAnimation();
    }
    checkShouldRestartGame() {
        if (!controller.clicking) return;

        gameReset();
        prepareMainGame();
    }

    updateParticles() {
        if (this.particletick >= this.particlerate) {
            this.particletick = 0;

            var x = this.x + this.w*0.5;
            var y = this.y + this.sprite.scale * this.sprite.h;
            var velrange = (this.vy - this.maxVy) / (this.minVy - this.maxVy);
            var fireCharOffset = randNum(velrange*0.1, velrange*0.5);
            var smokeCharOffset = randNum(0, velrange*0.75);
            entities.push(particleSpawners.smoke(x, y, smokeCharOffset));
            entities.push(particleSpawners.fire(x, y, fireCharOffset));
        }
        else {
            this.particletick++;
        }
    }
    updatePosition() {
        this.x = controller.x - this.w*0.5;
        if (this.x < 0) {
            this.x = 0;
        }
        else {
            var edge = canvas.width - this.w;
            if (this.x > edge)
                this.x = edge;
        }

        if (this.resetstartpositionflag) {
            this.resetStartPosition();
        }
        else {
            this.y += this.vy;
        }
    }
    updateVelocity() {
        var conY = controller.y;
        if (conY > PLAYER_VEL_BOTTOM)
            conY = PLAYER_VEL_BOTTOM;
        else if (conY < PLAYER_VEL_TOP)
            conY = PLAYER_VEL_TOP;

        var range = 1 - (conY - PLAYER_VEL_TOP) / (PLAYER_VEL_BOTTOM - PLAYER_VEL_TOP);
        this.vy = (this.minVy + range * (this.maxVy - this.minVy));
    }
    updateCamera() {
        camY = -(canvas.height - (this.bottomoffset + this.y));
    }

    update() {
        if (!this.dead) {
            this.updateVelocity();
            this.updatePosition();
            this.updateParticles();
            this.updateCamera();
        }
        else {
            this.checkShouldRestartGame();
            this.deathScrollCamera();
        }
    }

    updateSprite() {
       this.sprite.centerOnto(correctCamX(this.x), correctCamY(this.y), this.w, this.h); 
    }
    draw() {
        this.updateSprite();
        bufferFrame(this.sprite);
    }
}

class Cloud extends Entity {
    constructor(x, y) {
        var randW = randInt(CLOUD_MIN_W, CLOUD_MAX_W);
        super(x, y, randW, 8);

        this.sprites = [];
    }

    generateSprites() {
        this.sprites.length = 0;

        var centerSpritePieceAmt = Math.floor(this.w / CLOUD_SPRITE_W) - 2; // we subtract 2 because 2 ends on cloud
        this.sprites.push(new Sprite(assets['entities'], 0,0, 8,16, 2, 2)); // left
        for (var i = 0; i < centerSpritePieceAmt; i++) {
            this.sprites.push(new Sprite(assets['entities'], 0,0, 8,16, 3, 2)); // middle
        }
        this.sprites.push(new Sprite(assets['entities'], 0,0, 8,16, 4, 2)); // right
    }

    checkTouchingPlayer() {
        if (this.insideEnt(player)) {
            player.die();
        }
    }
    checkShouldKill() {
        if (camY + canvas.height < this.y) {
            this.shouldkill = true;
            console.log('cloud ded !');
        }
    }

    update() {
        this.checkTouchingPlayer();
        this.checkShouldKill();
    }

    updateSprite() {
        var lengthM1 = this.sprites.length - 1;
        
        this.sprites[0].centerOnto(correctCamX(this.x), correctCamY(this.y), CLOUD_SPRITE_W, this.h);
        this.sprites[lengthM1].centerOnto(correctCamX(this.x + this.w - CLOUD_SPRITE_W), correctCamY(this.y), CLOUD_SPRITE_W, this.h);
        for (var i = 1; i < lengthM1; i++) {
            this.sprites[i].centerOnto(correctCamX(this.x + i * (CLOUD_SPRITE_W)), correctCamY(this.y), CLOUD_SPRITE_W, this.h)
        }
    }
    draw() {
        this.updateSprite();
        for (var i = 0; i < this.sprites.length; i++) {
            bufferFrame(this.sprites[i]);
        }
    }
}

class FloorProp extends Entity {
    constructor(x, y) {
        super(x, y, 0, 0);
        this.sprite = new WholeSprite(assets['floor'], 0,0, 2);
    }

    checkShouldKill() {
        if (camY + canvas.height < this.y) {
            this.shouldkill = true;
            console.log('floor ded !');
        }
    }

    update() {
        this.checkShouldKill();
    }

    updateSprite() {
        this.sprite.y = correctCamY(this.y);
    }
    draw() {
        this.updateSprite();
        bufferFrame(this.sprite);
    }
}