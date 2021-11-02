const controller = {
    x: 0,
    y: 0,
    clicking: false
};

function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const scalemul = canvas.width / rect.width;

    const x = scalemul * (e.x - rect.left);
    const y = scalemul * (e.y - rect.top);

    controller.x = x;
    controller.y = y;
}
function onMouseDown(e) {
    controller.clicking = true;
}
function onMouseUp(e) {
    controller.clicking = false;
}

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);