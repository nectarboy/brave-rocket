gui.titlescreenfooter = {
    obj: null,
    class:
    class GuiTitleScreenFooter {
        constructor() {
            const offy = 9;

            this.x = canvas.width/2;
            this.y = canvas.height - offy;

            this.text = new Text(0,0, [`2022 - ${gameversion}`], 12, '#ffffff', true);
        }

        update() {

        }

        updateSprite() {
            this.text.x = this.x;
            this.text.y = this.y;
        }
        draw() {
            this.updateSprite();
            bufferFrame(this.text, 2);
        }
    }
};