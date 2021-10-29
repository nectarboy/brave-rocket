class Player extends Entity {
    constructor(x, y) {
        super(x, y, 10, 10);
        this.minVy = -1; // -1.5
        this.maxVy = -15;
        this.vy = 0;

        this.sprite = new Sprite(assets['entities'], 0,0, 16,16, 0, 2);
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

        this.y += this.vy;
    }
    updateVelocity() {
        var conY = controller.y;
        if (conY > PLAYER_VEL_BOTTOM)
            conY = PLAYER_VEL_BOTTOM;
        else if (conY < PLAYER_VEL_TOP)
            conY = PLAYER_VEL_TOP;

        var range = 1 - (conY - PLAYER_VEL_TOP) / (PLAYER_VEL_BOTTOM - PLAYER_VEL_TOP);
        this.vy = Math.round(this.minVy + range * (this.maxVy - this.minVy));
    }
    updateCamera() {
        camY = -(canvas.height - (PLAYER_BOTTOM_OFFSET + this.y));
    }

    update() {
        this.updateVelocity();
        this.updatePosition();
        this.updateCamera();
    }

    draw() {
        this.sprite.centerOnto(correctCamX(this.x), correctCamY(this.y), this.w, this.h);
        spritebuffer.push(this.sprite);
    }
}

class Cloud extends Entity {
    constructor(x, y) {
        var randW = randInt(CLOUD_MIN_W, CLOUD_MAX_W);
        var centerSpritePieceAmt = Math.ceil(randW / 8);

        super(x, y, randW, 8);

        this.sprites = [];
        this.sprites.push(new Sprite(assets['entities'], 0,0, 8,16, 2, 2)); // left
        for (var i = 0; i < centerSpritePieceAmt; i++) {
            this.sprites.push(new Sprite(assets['entities'], 0,0, 8,16, 3, 2)); // middle
        }
        this.sprites.push(new Sprite(assets['entities'], 0,0, 8,16, 4, 2)); // right
    }

    update() {
        if (camY + canvas.height < this.y) {
            this.shouldkill = true;
            console.log('cloud ded !');
        }
    }

    draw() {
        for (var i = 0; i < this.sprites.length; i++) {
            var sprite = this.sprites[i];

            // this.x - (sprite.w*0.5) * (i - this.sprites.length*0.5)
            sprite.centerOnto(correctCamX(this.x - (sprite.w) * (this.sprites.length*0.5 - i)), correctCamY(this.y), this.w, this.h);
            spritebuffer.push(sprite);
        }
    }
}