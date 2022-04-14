const controller = {
    x: 0,
    y: 0,
    clicking: false,
    firstclick: false, // set by game
    touching: false
};

function setXY(pageX, pageY) {
    const rect = canvas.getBoundingClientRect();
    const scalemulx = canvas.width / rect.width;
    const scalemuly = canvas.height / rect.height;

    const x = scalemulx * (pageX - rect.left);
    const y = scalemuly * (pageY - rect.top);

    controller.x = x;
    controller.y = y;
}

function onMouseMove(e) {
    setXY(e.x, e.y);
}
function onMouseDown(e) {
    controller.clicking = true;
    controller.firstclick = true;
    setXY(e.x, e.y);
}
function onMouseUp(e) {
    controller.clicking = false;
}

function onTouchMove(e) {
    setXY(e.touches[0].pageX, e.touches[0].pageY);
    e.preventDefault();
}
function onTouchDown(e) {
    controller.firstclick = !controller.touching;
    controller.touching = true;
    controller.clicking = true;
    onTouchMove(e);
    e.preventDefault();
}
function onTouchUp(e) {
    controller.touching = false;
    controller.clicking = false;
    e.preventDefault();
} 

document.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);

canvas.ontouchmove = onTouchMove;
canvas.ontouchstart = onTouchDown;
canvas.ontouchend = onTouchUp;
