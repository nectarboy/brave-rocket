class Particle extends Entity {
    constructor(x, y, w, h, vx,vy,vm, char,charoffset, animspeed, animlength) {
        super(x, y, 0, 0);
        this.vx = vx;
        this.vy = vy;
        this.vm = vm;

        this.animspeed = animspeed;
        this.animlength = animlength;
        this.tick = 0;
        this.step = 0|(0|(charoffset * this.animlength * w) / w);

        this.sprite = new Sprite(assets['particles'], 0,0,w,h, char, 2);
        this.sprite.offset = this.step * (this.sprite.w/TILE_W);
    }

    updateAnimation() {
        if (this.tick >= this.animspeed) {
            this.tick = 0;

            if (this.step >= this.animlength) {
                this.shouldkill = true;
            }
            else {
                this.step++;
                this.sprite.offset = this.step * (this.sprite.w/TILE_W);
            }
        }
        else {
            this.tick++;
        }
    }

    updatePosition() {
        this.x += this.vx;
        this.y += this.vy;

        this.vx *= this.vm;
        this.vy *= this.vm;
    }
    update() {
        this.updatePosition();
        this.updateAnimation();
    }

    updateSprite() {
        this.sprite.centerOnto(correctCamX(this.x), correctCamY(this.y), this.w, this.h);
    }
    draw() {
        this.updateSprite();
        bufferFrame(this.sprite);
    }
}

const particleSpawners = {
    // fire
    fire: function(x, y, charoffset) {
        var animspeed = randInt(3, 6);
        var vx = randNum(-2, 2);
        var vy = randNum(0, 1);

        var particle = new Particle(x,y, 16,16, 0,vy,1, 0,charoffset, animspeed,PARTICLE_0_LENGTH);
        particle.updateSprite();

        return particle;
    },

    smoke: function(x, y, charoffset) {
        var animspeed = 8;
        var vx = randNum(-3, 3);
        var vy = randNum(0, 3);

        var particle = new Particle(x,y, 16,16, vx,vy,0.95, 32,charoffset, animspeed,PARTICLE_0_LENGTH);
        particle.updateSprite();

        return particle;
    },

    combust: function(x, y) {
        var animspeed = randInt(2, 16);
        var vx = randNum(-12, 12);
        var vy = randNum(-10, 10);

        var particle = new Particle(x,y, 16,16, vx,vy,1, 0,0, animspeed,PARTICLE_0_LENGTH);
        particle.updateSprite();

        return particle;
    },

    boom: function(x, y) {
        var animspeed = randInt(4, 6);

        var particle = new Particle(x,y, 32,24, 0,0,1, 64,0, animspeed,PARTICLE_1_LENGTH);
        particle.sprite.scale = 3;
        particle.updateSprite();

        return particle;
    },
};