const framebuffer = [];
for (var i = 0; i < FRAMEBUFFER_LAYERS; i++) {
    framebuffer[i] = [];
}

function flushFrameBuffer() {
    for (var i = 0; i < FRAMEBUFFER_LAYERS; i++) {
        framebuffer[i].length = 0;
    }
}
function bufferFrame(obj, layer) {
    framebuffer[layer].push(obj);
}

function drawFrameBuffer() {
    for (var i = 0; i < FRAMEBUFFER_LAYERS; i++) {
        for (var ii = 0; ii < framebuffer[i].length; ii++) {
            framebuffer[i][ii].draw(ctx);
        }
    }

    // DEBUG HITBOX
    // ctx.strokeStyle = 'blue';
    // ctx.strokeRect(player.x-0.5, correctCamY(player.y-0.5), player.w, player.h);

    // ctx.strokeStyle = 'red';
    // for (var i = 0; i < entities.length; i++) {
    //     ctx.strokeRect(entities[i].x-0.5, correctCamY(entities[i].y-0.5), entities[i].w, entities[i].h);
    // }
}