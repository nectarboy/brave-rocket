var gameversion = '0.4.0';

var globalpaused = false;
var paused = false;
var running = false;
var requestedframe = false;
var resetflag = false;

// game components
var loopstate = 0;
var tick = 0;

var camX = 0;
var camY = 0;

function correctCamX(x) {
    return x - Math.round(camX);
}
function correctCamY(y) {
    return y - Math.round(camY);
}

// game logic
function gameUpdate() {
    updateEvents();
    loopStates[loopstate].update();
    DEBUGUPDATE();

    tick++;

    // if (resetflag) {
    //     gameReset();
    // }
}
function gameDraw() {
    if (requestedframe) return;

    flushFrameBuffer();

    loopStates[loopstate].draw();
    DEBUGDRAW();
}
function gameReset() {
    resetflag = false;
    tick = 0;
    //flushFrameBuffer();

    camX = 0;
    camY = 0;

    // reset everything
    resetEvents();
    resetCloudSpawn();
    resetPlayer();
    resetEntities();
    resetParticles();
    resetBackgrounds();
    resetGui();
    prepareLoopState(0);
    DEBUGRESET();

    // EXTRA STUFF
    // earthquake mode
    if (EARTHQUAKEMODE) {
        var etick = 0;
        addEvent(() => {
            if (etick++ === 6) {
                etick = 0;
                cameraShake(20, 0.9);
            }
            return !EARTHQUAKEMODE;
        });
    }

    // dog rain mode
    if (COINRAINMODE) {
        var etick = 0;
        addEvent(() => {
            if (etick++ === 6) {
                etick = 0;
                entities.push(spawnFallingCoin());
            }
            return !COINRAINMODE;
        });
    }

    // meteor shower mode
    if (METEORSHOWERMODE) {
        METEOR_CHANCE = 1;
    }

    // floor prop
    entities.push(spawnFloorProp());
}

function drawFrame() {
    requestedframe = false;
    drawFrameBuffer();
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
    debugThing.sprite = new Sprite(assets['entities'], 0,0,16,16, 64, 0);
}

function DEBUGUPDATE() {
    // debugThing.x = controller.x;
    // debugThing.y = controller.y;
    
    // debugThing.sprite.centerOnto(debugThing.x, debugThing.y, debugThing.w, debugThing.h);
}

function DEBUGDRAW() {
    //printText([tick]);
    // bufferFrame(debugThing.sprite);
}