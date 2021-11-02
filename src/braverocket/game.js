var globalpaused = false;
var paused = false;
var running = false;
var requestedframe = false;
var resetflag = false;

// game components
var loopstate = 0;
var tick = 0;
var spritebuffer = [];

var camX = 0;
var camY = 0;

function correctCamX(x) {
    return x - camX;
}
function correctCamY(y) {
    return y - camY;
}

// game logic
function gameUpdateEvents() {

}
function gameUpdate() {
    loopStates[loopstate].update();
    gameUpdateEvents();
    DEBUGUPDATE();

    tick++;

    if (resetflag) {
        gameReset();
    }
}
function gameDraw() {
    if (requestedframe) return;

    spritebuffer.length = 0;

    loopStates[loopstate].draw();
    DEBUGDRAW();
}
function gameReset() {
    resetflag = false;
    loopstate = 0;
    tick = 0;
    spritebuffer.length = 0;

    camX = 0;
    camY = 0;

    // reset everything
    resetCloudSpawn();
    resetPlayer();
    resetEntities();
    resetBackgrounds();

    DEBUGRESET();
}

function drawFrame() {
    requestedframe = false;

    for (var i = 0; i < spritebuffer.length; i++) {
        spritebuffer[i].draw(ctx);
    }

    // DEBUG HITBOX
    // ctx.strokeStyle = 'red';
    // for (var i = 0; i < entities.length; i++) {
    //     ctx.strokeRect(entities[i].x-0.5, correctCamY(entities[i].y-0.5), entities[i].w, entities[i].h);
    // }
}
function requestFrame() {
    if (requestedframe) return;
    requestedframe = true;

    requestAnimationFrame(() => {
        drawFrame();
    });
}

function gameLoop() {
    if (globalpaused) return;

    gameUpdate();
    gameDraw();
    requestFrame();
}
function gameStart() {
    if (running) return;
    running = true;

    setInterval(() => {
        gameLoop();
    }, GAME_INTERVAL);
}

// DEBUG
var debugThing = {};

function DEBUGRESET() {
    debugThing = new Entity(0, 0, 1, 1);
    debugThing.sprite = new Sprite(assets['entities'], 0,0,16,16, 32, 0);
}

function DEBUGUPDATE() {
    debugThing.x = controller.x;
    debugThing.y = controller.y;
    
    debugThing.sprite.centerOnto(debugThing.x, debugThing.y, debugThing.w, debugThing.h);
}

function DEBUGDRAW() {
    printText([tick]);
    spritebuffer.push(debugThing.sprite);
}