function spawnPlayer() {
    var player = new Player(0, 0);
    player.x = canvas.width/2 - player.w/2;
    player.y = canvas.height - PLAYER_BOTTOM_OFFSET - player.h;
    
    return player;
}

function spawnCloud() {
    var cloud = new Cloud(0, 0);
    cloud.x = randInt(-cloud.w/2, canvas.width + cloud.w/2);
    cloud.y = camY - cloud.h;

    return cloud;
}