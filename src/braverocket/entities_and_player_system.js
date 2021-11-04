var player = {};
var entities = [];

function updatePlayer() {
    player.update();
}
function drawPlayer() {
    player.draw();
}
function resetPlayer() {
    player = spawnPlayer();
}

function updateEntities() {
    for (var i = 0; i < entities.length; i++) {
        entities[i].update();

        if (entities[i].shouldkill) {
            entities.splice(i, 1);
            i--;
        }
    }
}
function drawEntities() {
    for (var i = 0; i < entities.length; i++) {
        entities[i].draw();
    }
}
function resetEntities() {
    entities.length = 0;
}