class Player extends Entity {
    constructor(x, y) {
        super(x, y, 12, 12);
        this.minVy = -1; // -1.5
        this.maxVy = -15;
        this.vy = 0;

        this.resetstartpositionflag = false;

        this.sprite = new Sprite(assets['entities'], 0,0, 16,16, 0, 2);
    }

    resetStartPosition() {
        this.resetstartpositionflag = false;
        this.y = canvas.height - PLAYER_BOTTOM_OFFSET - this.h;
    }

    updatePosition() {
        this.x = controller.x - this.w*0.5;
        if (this.x < 0) {
            this.x = 0;
        }
        else {
            const edge = canvas.width - this.w;
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
        camY = -(canvas.height - (PLAYER_BOTTOM_OFFSET + this.y));
    }

    update() {
        this.updateVelocity();
        this.updatePosition();
        this.updateCamera();
    }

    updateSprite() {
       this.sprite.centerOnto(correctCamX(this.x), correctCamY(this.y), this.w, this.h); 
    }
    draw() {
        this.updateSprite();
        spritebuffer.push(this.sprite);
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
            resetflag = true;
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
            spritebuffer.push(this.sprites[i]);
        }
    }
}

class FloorProp extends Entity {
    constructor(x, y) {
        super(x, y, 0, 0);

        this.x = x;
        this.y = y;

        this.sprite = new WholeSprite(assets['floor'], 0,0, 2);
        this.w = this.sprite.asset.w;
    }

    update() {
        if (camY + canvas.height < this.y) {
            this.shouldkill = true;
            console.log('floor ded !');
        }
    }

    updateSprite() {
        this.sprite.y = correctCamY(this.y);
    }
    draw() {
        this.updateSprite();
        spritebuffer.push(this.sprite);
    }
}