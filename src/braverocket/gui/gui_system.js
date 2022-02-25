const gui = {};

// buffer
const guibuffer = [];
function flushGuiBuffer() {
    guibuffer.length = 0;
}
function bufferGui(name) {
    refreshGui(name);
    guibuffer.push(gui[name].obj);
}

function updateGuiBuffer() {
    for (var i = 0; i < guibuffer.length; i++) {
        guibuffer[i].update();
    }
}
function drawGuiBuffer() {
    for (var i = 0; i < guibuffer.length; i++) {
        guibuffer[i].draw();
    }
}

function refreshGui(name) {
    gui[name].obj = new (gui[name].class)();
    gui[name].obj.updateSprite();
}

function resetGui() {
    flushGuiBuffer();
}