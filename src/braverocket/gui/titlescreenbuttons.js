gui.titlescreenbuttons = {
    obj: null,
    class:
    class GuiTitleScreenButtons {
        constructor() {
            // init buttons
            this.buttons = [
                // settings button
                new GuiSmallButton(0,0, 1, function() {
                    alert('out of service >:(');
                }),
                // player custom button
                new GuiSmallButton(0,0, 0, function() {
                    loopStates[0].showPlayerMenu();
                }),
                // fun button
                new GuiSmallButton(0,0, 5, function() {
                    entities.push(spawnAnimalProp());
                }),

                // right arrow button
                // new GuiArrowButton(0,0, 0, function() {
                //     camX += 5;
                // }),
                // // left arrow button
                // new GuiArrowButton(0,0, 1, function() {
                //     camX -= 5;
                // }),
            ];

            // button positions
            var buttonoffset = 0;
            for (var i = 0; i < this.buttons.length; i++) {
                var button = this.buttons[i];
                buttonoffset += button.w + 1;
                button.x = canvas.width - 4 - buttonoffset;
                button.y = canvas.height - 6 - (button.h);
            }

            // this.buttons.push(new GuiTextButton(new Text(0,0, ['uwu'], 16,'#4C4C4C',true), 4,6, false,0, function() {
            //     entities.push(spawnMeteor());
            // }));
        }

        hide() {
            for (var i = 0; i < this.buttons.length; i++) {
                this.buttons[i].hide();
            }
        }
        unhide() {
            for (var i = 0; i < this.buttons.length; i++) {
                this.buttons[i].unhide();
            }
        }

        update() {
            for (var i = 0; i < this.buttons.length; i++) {
                this.buttons[i].update();
            }
        }

        updateSprite() {
            for (var i = 0; i < this.buttons.length; i++) {
                this.buttons[i].updateSprite();
            }
        }
        draw() {
            for (var i = 0; i < this.buttons.length; i++) {
                this.buttons[i].updateSprite();
                this.buttons[i].draw();
            }
        }
    }
};