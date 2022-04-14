gui.playerbutton = {
    obj: null,
    class: class GuiPlayerButton extends GuiButton {
        constructor() {
            super(0,0, function() {
                // logo animation
                loopStates[0].showPlayerMenu();
            });
            this.x = canvas.width - 10 - this.w;
            this.y = canvas.height - 6 - this.h;

            this.sprite.offset = 0;
        }
    }
};