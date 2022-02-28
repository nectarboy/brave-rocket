function spawnPlayer() {
    var player = new Player(0, 0);
    player.x = canvas.width/2 - player.w/2;
    player.offy = PLAYER_TITLESCREEN_BOTTOM_OFFSET;
    player.resetStartPosition();
    player.updateSprite();
    player.updateCamera();
        
    return player;
}

function spawnCloud() {
    var cloud = new Cloud(0, 0);
    cloud.x = randInt(-cloud.w/2, canvas.width - cloud.w/2);
    cloud.y = camY - cloud.h * 2;
    cloud.generateSprites();
    cloud.updateSprite();

    return cloud;
}

function spawnMeteor() {
    var meteor = new Meteor(0, 0);
    meteor.fakex = randInt(meteor.w, canvas.width);
    meteor.fakey = -meteor.h * 2;
    meteor.updateSprite();

    return meteor;
}

function spawnFallingCoin() {
    var fallingcoin = new FallingCoin(0, 0);
    fallingcoin.fakex = randInt(canvas.width/2, canvas.width);
    fallingcoin.fakey = -fallingcoin.h * 2;
    fallingcoin.updateSprite();

    return fallingcoin;
}

function spawnFloorProp() {
    var floorprop = new FloorProp(0, 0);
    floorprop.y = player.sprite.y + player.sprite.scale*player.sprite.h;
    floorprop.updateSprite();

    return floorprop;
}