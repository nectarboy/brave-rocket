function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min+1)) + min;
}
function randNum(min, max) {
    return Math.random() * (max - min) + min;
}

function printText(lines) {
    const textsize = 20;

    ctx.fillStyle = '#333333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = textsize + 'px times new roman';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#888888';

    for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], canvas.width/2, canvas.height/2 - lines.length*textsize/2 + i*textsize);
    }
}