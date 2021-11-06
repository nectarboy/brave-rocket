var framebuffer = [];
function flushFrameBuffer() {
    framebuffer.length = 0;
}
function bufferFrame(obj) {
    framebuffer.push(obj);
}

function drawFrameBuffer() {
    for (var i = 0; i < framebuffer.length; i++) {
        framebuffer[i].draw(ctx);
    }

    // DEBUG HITBOX
    // ctx.strokeStyle = 'blue';
    // ctx.strokeRect(player.x-0.5, correctCamY(player.y-0.5), player.w, player.h);

    // ctx.strokeStyle = 'red';
    // for (var i = 0; i < entities.length; i++) {
    //     ctx.strokeRect(entities[i].x-0.5, correctCamY(entities[i].y-0.5), entities[i].w, entities[i].h);
    // }
}