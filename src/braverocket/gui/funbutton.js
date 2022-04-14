gui.funbutton = {
    obj: null,
    class: class GuiFunButton extends GuiButton {
        constructor() {
            super(0,0, function() {
                entities.push(spawnAnimalProp());
            });
            this.x = canvas.width - 10 - this.w*2 - 1;
            this.y = canvas.height - 6 - this.h;

            this.sprite.offset = 5;
        }
    }
};