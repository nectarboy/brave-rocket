var cloudTick = 0;

function cloudSpawnEvent() {
    entities.push(spawnCloud());
}
function checkCloudSpawn() {
    if (tick % 30 === 0) {
        cloudSpawnEvent();
    }
}
function resetCloudSpawn() {
    cloudTick = 0;
}