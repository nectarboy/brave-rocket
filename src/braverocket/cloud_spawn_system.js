var cloudTick = 0;
var currentSpawnTick = 0;

function renewSpawnTick() {
    // player considered at slow speed
    if (player.vy >= player.minVy - PLAYER_SLOW_SPEED) {
        currentSpawnTick = randInt(CLOUD_SLOWMIN_SPAWN, CLOUD_SLOWMAX_SPAWN);
        //console.log('SLOW ASS');
    }
    // player considered at normal speed
    else {
        currentSpawnTick = randInt(CLOUD_MIN_SPAWN, CLOUD_MAX_SPAWN);
    }
}
function cloudSpawnEvent() {
    renewSpawnTick();
    cloudTick = 0;

    // if dead and cam stopped scrolling - or if we didnt reach minimum spawn threshold, dont spawn
    if ((player.dead && player.deathscroll < 1) || -player.y < CLOUD_SPAWN_H)
        return;

    // meteor
    if (Math.random() <= METEOR_CHANCE)
        entities.push(spawnMeteor());
    // cloud
    else
        entities.push(spawnCloud());

    // TODO - meteor shower

    // special spawns
    var fallingcoinchance = FALLINGCOIN_CHANCE_MIN + (FALLINGCOIN_CHANCE_MAX - FALLINGCOIN_CHANCE_MIN) * (1-player.getVelRange());
    //console.log(fallingcoinchance.toFixed(3))
    if (Math.random() <= 0.5)
        entities.push(spawnFallingCoin());
}
function checkCloudSpawn() {
    if (cloudTick >= currentSpawnTick) {
        cloudSpawnEvent();
    }
    else {
        cloudTick++;
    }
}
function resetCloudSpawn() {
    cloudTick = 0;
    renewSpawnTick();
}