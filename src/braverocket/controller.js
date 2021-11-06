const controller = {
    x: 0,
    y: 0,
    clicking: false,
    touching: false
};

function setXY(pageX, pageY) {
    const rect = canvas.getBoundingClientRect();
    const scalemul = canvas.width / rect.width;

    const x = scalemul * (pageX - rect.left);
    const y = scalemul * (pageY - rect.top);

    controller.x = x;
    controller.y = y;
}

function onMouseMove(e) {
    setXY(e.x, e.y);
}
function onMouseDown(e) {
    controller.clicking = true;
}
function onMouseUp(e) {
    controller.clicking = false;
}

function onTouchMove(e) {
    setXY(e.touches[0].pageX, e.touches[0].pageY);
}
function onTouchDown(e) {
    controller.touching = true;
    controller.clicking = true;
}
function onTouchUp(e) {
    controller.touching = false;
    controller.clicking = false;
} 

document.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', onTouchDown);
document.addEventListener('mouseup', onTouchUp);

canvas.addEventListener('touchmove', onTouchMove);
canvas.addEventListener('touchstart', onMouseDown);
canvas.addEventListener('touchend', onMouseUp);