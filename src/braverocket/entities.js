class Player extends Entity {
    constructor(x, y) {
        super(x, y, 12, 12);
        this.sprite = new Sprite(assets['entities'], 0,0, 16,16, 0,0, 2);
        this.layer = 1;

        this.minVy = -1; // -1.5
        this.maxVy = -15; // -15
        this.offyrate = 0.1;
        this.particlerate = 3;
        this.titlescreenoff = 80;
        this.maingameoff = 44;
        this.mousetop = 80; // 78
        this.mousebottom = 218;
        this.sizeofameter = 50;

        this.dead = false;
        this.prex = 0;
        this.prey = 0;
        this.vy = 0;
        this.offy = 0;
        this.deathscroll = 0;
        this.particletick = 0;
        this.camerashake = {
            intensity: 0,
            durability: 0,
            explosionammount: 0
        };
        this.resetstartpositionflag = false;
        this.fallingcoinscollected = 0;
        this.inmaingame = false;
    }

    resetStartPosition() {
        this.resetstartpositionflag = false;
        this.y = canvas.height - this.titlescreenoff - this.h;
    }
    prepareForMainGame() {
        this.inmaingame = true;

        flushGuiBuffer();
        //bufferGui('debugtext');
    }

    deathScrollCamera() {
        camY += this.deathscroll;
        this.deathscroll *= DEATHSCROLL_SLOWDOWN_MUL;
    }
    deathAnimation() {
        var x = this.x + this.w*0.5;
        var y = this.y + this.h*0.5;
        //var velrange = 1 - this.getVelRange();

        var etick = 0;
        addEvent(() => {
            if (etick === DEATHSCROLL_DELAY) {
                // explosion
                for (var i = 0; i < this.camerashake.explosionammount; i++) {
                    particleSpawners.combust(x,y, 2,true);
                }

                // boom
                particleSpawners.boom(x, y, this.vy * DEATHSCROLL_VEL_MUL, 2,true);

                // camera shake
                cameraShake(this.camerashake.intensity, this.camerashake.durability);

                // game over screen
                bufferGui('gameoverscreen');
                var gameoverscreen = gui.gameoverscreen.obj;
                gameoverscreen.shouldanimate = false;
                gameoverscreen.flewtext.text[0] = (0|this.getMetersInAir()) + 'm';
                gameoverscreen.yousawtext.text = this.getLandmarkString();

                var eetick = 0;
                addEvent(() => {
                    if (eetick++ === 25) {
                        gameoverscreen.shouldanimate = true;
                        return true;
                    }
                    return false;
                });
            
                this.sprite.invisible = true;
                this.deathscroll = this.vy * DEATHSCROLL_VEL_MUL;
                this.vy = this.minVy;
                return true;
            }
            else {
                etick++;
                return false;
            }
        });

        this.deathscroll = 0;
    }
    die() {
        if (GODMODE || this.dead)
            return false;

        this.dead = true;
        this.deathAnimation();
        return true;
    }
    revive() {
        if (!this.dead)
            return;

        this.dead = false;
        this.sprite.invisible = false;
        this.prepareForMainGame();

        //playSound('sfx_revive');
    }
    checkShouldRestartGame() {
        if (!controller.firstclick)
            return;

        gameReset();
        prepareLoopState(1);
    }

    // info stuff
    getVelRange() {
        return (this.vy - this.maxVy) / (this.minVy - this.maxVy);
    }
    getMetersInAir() {
        return (canvas.height - this.titlescreenoff - this.h - this.y) / this.sizeofameter;
    }
    setMetersInAir(m) {
        this.y = -m * this.sizeofameter + (canvas.height - this.titlescreenoff - this.h);
    }
    getLandmarkString() {
        var meters = this.getMetersInAir();

        if (meters < 30) return ['the hills'];
        if (meters < 130) return ['the clouds'];
        if (meters < 190) return ['floating', 'islands !'];
        if (meters < 290) return ['a tiny', 'cottage'];
        if (meters < 355) return ['clumpy clouds'];
        if (meters < 370) return ['the night sky'];
        if (meters < 490) return ['THE MOON !!'];
        if (meters < 530) return ['amogus space'];
        if (meters < 600) return ['a rock-star', ':D'];
        if (meters < 750) return ['epic space', 'stuff'];
        return ['the void'];
    }

    updateParticles() {
        // particles
        if (this.particletick >= this.particlerate) {
            this.particletick = 0;

            var x = this.x + this.w*0.5;
            var y = this.sprite.y + camY + this.sprite.scale * this.sprite.h;
            var velrange = this.getVelRange();
            var fireCharOffset = randNum(velrange*0.1, velrange*0.5);
            var smokeCharOffset = randNum(0, velrange*0.75);
            particleSpawners.smoke(x,y, smokeCharOffset,1, 1,true);
            particleSpawners.fire(x,y, fireCharOffset,1, 1,true);
        }
        else {
            this.particletick++;
        }
    }
    updatePosition() {
        this.prex = this.x;
        this.prey = this.y;

        this.x = controller.x - this.w*0.5;
        if (this.x < 0) {
            this.x = 0;
        }
        else {
            var edge = canvas.width - this.w;
            if (this.x > edge)
                this.x = edge;
        }

        this.y += this.vy;
    }
    updateVelocity() {
        var conY = controller.y;
        if (conY > this.mousebottom)
            conY = this.mousebottom;
        else if (conY < this.mousetop)
            conY = this.mousetop;

        var range = 1 - (conY - this.mousetop) / (this.mousebottom - this.mousetop);
        this.vy = (this.minVy + range * (this.maxVy - this.minVy));
    }
    updateCamera() {
        camY = -(canvas.height - (this.offy + this.y));
    }

    update() {
        if (!this.dead) {
            this.updateVelocity();
            this.updatePosition();
            this.updateParticles();
            this.updateCamera();

            // this.sprite.rotation = false;
            // if ((tick % 1) === 0) {
            //     this.sprite.rotdeg = 0|((this.sprite.rotdeg + Math.round(this.x - this.prex)) / 2);
            // }
        }
        else {
            //this.checkShouldRestartGame();
            this.deathScrollCamera();
        }

        //if (this.inmaingame)
        //    gui.debugtext.obj.text.text = this.getLandmarkString();
    }

    updateSprite() {
       this.sprite.centerOnto(correctCamX(this.x), correctCamY(this.y), this.w, this.h); 
    }
    draw() {
        this.updateSprite();
        bufferFrame(this.sprite, this.layer);
    }
}

class Cloud extends Entity {
    constructor(x, y) {
        const randW = randInt(CLOUD_MIN_W, CLOUD_MAX_W);
        super(x, y, randW, 8);
        this.spritescale = 2;
        this.spritepartwidth = 8;

        this.sprites = [];
    }

    generateSprites() {
        this.sprites.length = 0;

        var centerSpritePieceAmt = Math.floor(this.w/this.spritescale / this.spritepartwidth) + 1; // +1 for safe meaasure

        this.sprites.push(new Sprite(assets['entities'], 0,0, 8,16, 16,0, this.spritescale)); // left
        for (var i = 0; i < centerSpritePieceAmt; i++) {
            this.sprites.push(new Sprite(assets['entities'], 0,0, 8,16, 24,0, this.spritescale)); // middle
        }
        this.sprites.push(new Sprite(assets['entities'], 0,0, 8,16, 32,0, this.spritescale)); // right
    }

    checkTouchingPlayer() {
        if (!player.dead && this.insideEnt(player)) {
            player.die();
            player.camerashake.intensity = player.vy;
            player.camerashake.durability = 0.9;
            player.camerashake.explosionammount = PLAYER_EXPLOSION_MIN + (1-player.getVelRange()) * (PLAYER_EXPLOSION_MAX - PLAYER_EXPLOSION_MIN);
        }
    }
    checkShouldKill() {
        if (camY + canvas.height < this.y) {
            this.shouldkill = true;
            //console.log('-- cloud ded');
        }
    }

    update() {
        this.checkTouchingPlayer();
        this.checkShouldKill();
    }

    updateSprite() {
        var length = this.sprites.length;
        var lengthM1 = length - 1;
        
        this.sprites[0].centerOnto(correctCamX(this.x), correctCamY(this.y), this.spritepartwidth, this.h);
        this.sprites[lengthM1].centerOnto(correctCamX(this.x + this.w - this.spritepartwidth), correctCamY(this.y), this.spritepartwidth, this.h);
        for (var i = 1; i < lengthM1; i++) {
            this.sprites[i].centerOnto(correctCamX(this.x + i * (this.w / length)), correctCamY(this.y), this.spritepartwidth, this.h)
        }
    }
    draw() {
        this.updateSprite();
        for (var i = 0; i < this.sprites.length; i++) {
            bufferFrame(this.sprites[i], 1);
        }
        //bufferFrame(this.sprites[0], 1); // i like the bugged version more lmao
    }
}

class Meteor extends Entity {
    constructor(x, y) {
        super(0, 0, 24, 24);
        this.sprite = new Sprite(assets['entities'], 0,0, 16,16, 40,0, 2);
        this.sprite.rotation = true;

        this.rotdeginc = -4;
        this.particlerate = 5;

        this.fakex = x;
        this.fakey = y;
        this.targetx = player.x;
        this.vx = -0.4;
        this.minvy = 2.5;
        this.maxvy = 4;
        this.particletick = 0;
    }

    checkShouldKill() {
        if (this.fakey > canvas.height) {
            this.shouldkill = true;
        }
    }

    checkTouchingPlayer() {
        if (!player.dead && this.insideEnt(player) && player.die()) {
            this.shouldkill = true;
            player.camerashake.intensity = 16;
            player.camerashake.durability = 0.91;
            player.camerashake.explosionammount = 60;
        }
    }
    updateVelocity() {
        this.vx = this.vx;
        this.vy = this.minvy + player.getVelRange() * (this.maxvy - this.minvy);
    }
    updatePosition() {
        this.fakex += this.vx;
        this.fakey += this.vy;
        this.x = this.fakex - camX;
        this.y = this.fakey + camY;
    }
    updateAnimation() {
        // rotation
        this.sprite.rotdeg += this.rotdeginc;

        // particles
        if (this.particletick++ >= this.particlerate) {
            this.particletick = 0;

            var x = this.fakex + this.w*0.5;
            var y = this.fakey;
            var smokeCharOffset = randNum(0.5, 0.75);
            var fireCharOffset = randNum(0.1, 0.5);
            particleSpawners.smoke(x,y, smokeCharOffset,-1, 0,false);
            particleSpawners.fire(x,y, fireCharOffset,-1, 0,false);
        }
    }

    update() {
        this.updateVelocity();
        this.updatePosition();
        this.checkTouchingPlayer();
        this.checkShouldKill();
        this.updateAnimation();
    }

    updateSprite() {
        this.sprite.centerOnto(correctCamX(this.x), correctCamY(this.y), this.w, this.h);
    }
    draw() {
        this.updateSprite();
        bufferFrame(this.sprite, 1);
    }
}

class FallingCoin extends Entity {
    constructor(x, y) {
        super(0, 0, 32, 32);
        this.layer = 2;
        this.sprite = new Sprite(assets['entities'], 0,0, 16,16, 0,16, 2);
        this.sprite.rotation = true;

        this.rotdeginc = -16;
        this.bouncevy = -3;
        this.bounceay = 0.05;
        this.scaleshrinkfactor = 0.01;

        this.collected = false;
        this.fakex = x;
        this.fakey = y;
        this.vx = -0.4;
        this.vy = randNum(2, 4);
    }

    beCollected() {
        if (this.collected)
            return;
        this.collected = true;

        this.collected = true;
        player.fallingcoinscollected++;
        this.vy = this.bouncevy;
        this.layer = 0;
    }
    collectedAnimation() {
        this.vy += this.bounceay;

        this.sprite.scale -= this.scaleshrinkfactor;
        if (this.sprite.scale <= 0) {
            this.shouldkill = true;
            console.log('-- falling coin COLLECTED AND GONE :)');
        }
    }

    checkShouldKill() {
        if (this.fakey > canvas.height) {
            this.shouldkill = true;
            //cameraShake(20, 0.9);
            //console.log('-- falling coin GONE :(');
        }
    }
    checkTouchingPlayer() {
        if (!player.dead && this.insideEnt(player)) {
            this.beCollected();
            //cameraShake(5, 0.9);
        }
    }

    updatePosition() {
        this.fakex += this.vx;
        this.fakey += this.vy;
        this.x = this.fakex - camX;
        this.y = this.fakey + camY;
    }
    updateAnimation() {
        this.sprite.rotdeg += this.rotdeginc;
    }

    update() {
        if (!this.collected) {
            this.updatePosition();
            this.checkTouchingPlayer();
            this.checkShouldKill();
            this.updateAnimation();
        }
        else {
            this.collectedAnimation();
            this.updatePosition();
            this.checkShouldKill();
        }
    }

    updateSprite() {
        this.sprite.centerOnto(correctCamX(this.x), correctCamY(this.y), this.w, this.h);
    }
    draw() {
        this.updateSprite();
        bufferFrame(this.sprite, this.layer);
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
            console.log('-- floor ded lol');
        }
    }

    update() {
        this.checkShouldKill();
    }

    updateSprite() {
        this.sprite.x = correctCamX(this.x);
        this.sprite.y = correctCamY(this.y);
    }
    draw() {
        this.updateSprite();
        bufferFrame(this.sprite, 0);
    }
}

class AnimalProp extends Entity {
    constructor(x, y) {
        const type = randInt(0, 11); // 12 different animals
        const isbig = (type >= 8);
        const size = 16 * (isbig+1);
        const charx = isbig
            ? 8*16 + size*(type - 8)
            : type * size;

        super(x, y, size*2, size*2);
        this.sprite = new Sprite(assets['entities'], 0,0, size,size, charx,48, 2);

        this.ay = 0.2;
        this.bouncey = -1.5;
        this.vx = randNum(1, 2.5);
        this.vy = 0;
    }

    checkShouldKill() {
        if (this.x >= canvas.width || this.y >= canvas.height + camY) {
            this.shouldkill = true;
            console.log('-- animal ded lol');
        }
    }

    updateVelocity() {
        this.vy += this.ay;
    }
    updatePosition() {
        this.x += this.vx;
        this.y += this.vy;

        // collision
        const floory = canvas.height - FLOORPROP_OFFSET;
        if (this.y + this.h >= floory) {
            this.y = floory - this.h;
            this.vy = this.bouncey;
        }
    }

    update() {
        this.updateVelocity();
        this.updatePosition();
        this.checkShouldKill();
    }

    updateSprite() {
        this.sprite.x = correctCamX(this.x);
        this.sprite.y = correctCamY(this.y);
    }
    draw() {
        this.updateSprite();
        bufferFrame(this.sprite, 1);
    }
}