var cloudTick = 0;
var currentSpawnTick = 0;

function renewSpawnTick() {
    // player considered at slow speed
    if (player.vy >= player.minVy - PLAYER_SLOW_SPEED) {
        currentSpawnTick = randInt(CLOUD_SLOWMIN_SPAWN, CLOUD_SLOWMAX_SPAWN);
        console.log('SLOW ASS');
    }
    // player considered at normal speed
    else {
        currentSpawnTick = randInt(CLOUD_MIN_SPAWN, CLOUD_MAX_SPAWN);
    }
}
function cloudSpawnEvent() {
    renewSpawnTick();
    cloudTick = 0;

    if ((player.dead && player.deathscroll < 0.2) || -player.y < CLOUD_SPAWN_H) return;
    entities.push(spawnCloud());
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