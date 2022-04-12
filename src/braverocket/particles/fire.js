particleSpawners.fire = function(x,y, range=0,dir=1, layer=0,affectedbycam=true) {
    var animspeed = randInt(3, 6);
    var vx = randNum(-2, 2);
    var vy = randNum(0, 1 * dir);

    // pushParticle
    var particle = new Particle(x,y,16,16, 0,vy,1, 0,0,2,range, animspeed,6, layer,affectedbycam);
    entities.push(particle); // particle pooling may be inefficient ???
    return particle;
};

particleSpawners.smoke = function(x,y, range=0,dir=1, layer=0,affectedbycam=true) {
    var animspeed = 8;
    var vx = randNum(-3, 3);
    var vy = randNum(0, 3 * dir);

    var particle = new Particle(x,y,16,16, vx,vy,0.95, 0,16,2,range, animspeed,6, layer,affectedbycam);
    entities.push(particle);
    return particle;
};

particleSpawners.combust = function(x,y, layer=0, affectedbycam=true) {
    var animspeed = randInt(2, 16);
    var vx = randNum(-12, 12);
    var vy = randNum(-10, 10);

    var particle = new Particle(x,y, 16,16, vx,vy,1, 0,0,2,0, animspeed,6, layer,affectedbycam);
    entities.push(particle);
    return particle;
};

particleSpawners.boom = function(x,y, vy, layer=0,affectedbycam=true) {
    var animspeed = 8;
    var vx = randNum(1, -1);

    var particle = new Particle(x,y, 32,24, vx,vy,0.9, 0,32,3,0, animspeed,2, layer,affectedbycam);
    entities.push(particle);
    return particle;
};

particleSpawners.animal = function(x,y, vx,vy, layer=0,affectedbycam=true) {
    var particle = new AnimalProp(x, y);
    particle.x -= particle.w*0.5;
    particle.y -= particle.h*0.5;
    particle.vx = vx;
    particle.vy = vy;
    particle.canbounce = false;


    entities.push(particle);
    return particle;
};