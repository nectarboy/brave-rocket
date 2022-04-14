const gui = {};

// buffer
const guibuffer = [];
function flushGuiBuffer() {
    guibuffer.length = 0;
}
function bufferGui(name) {
    refreshGui(name);
    gui[name].obj.bufferid = guibuffer.length;
    guibuffer.push(gui[name].obj);
}
function unbufferGui(name) {
    var bufferid = gui[name].obj.bufferid;
    guibuffer.splice(bufferid, 1);
    // fix all other gui buffer ids
    for (var i = bufferid; i < guibuffer.length; i++) {
        guibuffer[i].bufferid--;
    }
    
    freeGui(name);
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
function freeGui(name) {
    gui[name].obj = null; // flag it for deletion
}

function resetGui() {
    flushGuiBuffer();
}