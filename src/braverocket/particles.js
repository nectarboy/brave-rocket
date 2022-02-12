class Particle extends Entity {
    constructor(x, y, w, h, vx,vy,vm, charx,chary,offset, animspeed, animlength) {
        super(x, y, w, h);
        this.vx = vx;
        this.vy = vy;
        this.vm = vm;

        this.animspeed = animspeed;
        this.animlength = animlength;
        this.tick = 0;
        this.step = 0|(0|(offset * this.animlength * w) / w);

        this.sprite = new Sprite(assets['particles'], 0,0,w,h, charx,chary, 2);
        this.sprite.offset = this.step * (this.sprite.w/this.w);
    }

    updateAnimation() {
        if (this.tick >= this.animspeed) {
            this.tick = 0;

            if (this.step >= this.animlength) {
                this.shouldkill = true;
            }
            else {
                this.step++;
                this.sprite.offset = this.step * (this.sprite.w/this.w);
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
        this.sprite.centerOnto(correctCamX(this.x), correctCamY(this.y), 0, 0);
    }
    draw() {
        this.updateSprite();
        bufferFrame(this.sprite);
    }
}

const particleSpawners = {
    // fire
    fire: function(x, y, offset) {
        var animspeed = randInt(3, 6);
        var vx = randNum(-2, 2);
        var vy = randNum(0, 1);

        var particle = new Particle(x,y, 16,16, 0,vy,1, 0,0,offset, animspeed,PARTICLE_0_LENGTH);
        particle.updateSprite();

        return particle;
    },

    smoke: function(x, y, offset) {
        var animspeed = 8;
        var vx = randNum(-3, 3);
        var vy = randNum(0, 3);

        var particle = new Particle(x,y, 16,16, vx,vy,0.95, 0,16,offset, animspeed,PARTICLE_0_LENGTH);
        particle.updateSprite();

        return particle;
    },

    combust: function(x, y) {
        var animspeed = randInt(2, 16);
        var vx = randNum(-12, 12);
        var vy = randNum(-10, 10);

        var particle = new Particle(x,y, 16,16, vx,vy,1, 0,0,0, animspeed,PARTICLE_0_LENGTH);
        particle.updateSprite();

        return particle;
    },

    boom: function(x, y, vy) {
        var animspeed = 8;
        var vx = randNum(1, -1);

        var particle = new Particle(x,y, 32,24, vx,vy,0.9, 0,32,0, animspeed,PARTICLE_1_LENGTH);
        particle.sprite.scale = 3;
        particle.updateSprite();

        return particle;
    },
};