gui.debugtext = {
    obj: null,
    class:
    class GuiDebugText {
        constructor() {
            this.text = new Text(2,16, ['ur not supposed to see this'], 16, '#0000ff', false);
        };

        update() {}
        updateSprite() {}

        draw() {
            bufferFrame(this.text, 2);
        }
    }
};