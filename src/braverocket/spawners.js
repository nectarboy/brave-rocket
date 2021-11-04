function spawnPlayer() {
    var player = new Player(0, 0);
    player.x = canvas.width/2 - player.w/2;
    player.resetStartPosition();
    player.updateSprite();
        
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

function spawnFloorProp() {
    var floorprop = new FloorProp(0, 0);
    floorprop.y = player.sprite.y + player.sprite.scale*player.sprite.h;
    floorprop.updateSprite();

    return floorprop;
}