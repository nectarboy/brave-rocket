particleSpawners.fire = function(x,y, range=0,dir=1, layer=0,affectedbycam=true) {
    var animspeed = randInt(3, 6);
    var vx = randNum(-2, 2);
    var vy = randNum(0, 1 * dir);

    pushParticle(x,y,16,16, 0,vy,1, 0,0,2,range, animspeed,6, layer,affectedbycam);
};

particleSpawners.smoke = function(x,y, range=0,dir=1, layer=0,affectedbycam=true) {
    var animspeed = 8;
    var vx = randNum(-3, 3);
    var vy = randNum(0, 3 * dir);

    pushParticle(x,y,16,16, vx,vy,0.95, 0,16,2,range, animspeed,6, layer,affectedbycam);
};

particleSpawners.combust = function(x,y, layer=0, affectedbycam=true) {
    var animspeed = randInt(2, 16);
    var vx = randNum(-12, 12);
    var vy = randNum(-10, 10);

    pushParticle(x,y, 16,16, vx,vy,1, 0,0,2,0, animspeed,6, layer,affectedbycam);
};

particleSpawners.boom = function(x,y, vy, layer=0,affectedbycam=true) {
    var animspeed = 8;
    var vx = randNum(1, -1);

    pushParticle(x,y, 32,24, vx,vy,0.9, 0,32,3,0, animspeed,2, layer,affectedbycam);
};