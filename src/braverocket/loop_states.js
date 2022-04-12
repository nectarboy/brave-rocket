var incutscene = false;

function prepareLoopState(id) {
    loopstate = id;
    loopStates[loopstate].prepare();
}

const loopStates = {
    // title screen
    0: {
        update: function() {
            updatePlayer();
            player.resetStartPosition();
            player.updateCamera();
            player.vy = 0;
            updateParticles();
            updateEntities();
            updateGuiBuffer();

            // check to play
            if (controller.firstclick) {
                controller.firstclick = false;
                this.startGameCutscene();
            }
        },
        draw: function() {
            drawBackgrounds();
            drawEntities();
            drawParticles();
            drawPlayer();
            drawGuiBuffer();
        },
        prepare: function() {
            incutscene = false;

            flushGuiBuffer();
            // free stuff from main game
            freeGui('gameoverscreen');
            // buffer stuff
            bufferGui('braverocketlogo');
            gui.braverocketlogo.obj.animtype = 2;
            gui.braverocketlogo.obj.y = gui.braverocketlogo.obj.offstageY;
            bufferGui('logonumber');
            bufferGui('clicktoplay');
            bufferGui('titlescreenfooter');
            bufferGui('titlescreenbuttons');
        },

        startGameCutscene() {
            if (incutscene)
                return;
            incutscene = true;

            // gui
            gui.braverocketlogo.obj.animtype = 3;
            gui.titlescreenfooter.obj.text.invisible = true;
            gui.clicktoplay.obj.sprite.invisible = true;
            gui.titlescreenbuttons.obj.hide();

            var etick = 0;
            addEvent(() => {
                if (etick++ === MAINGAME_DELAY) {
                    prepareLoopState(1);
                    return true;
                }
                else {
                    //adjust player offset (as an animation - it gets set on gamestart anyway)
                    player.offy -= player.offyrate * (player.offy - PLAYER_MAINGAME_BOTTOM_OFFSET);
                    return false;
                }
            });
        },

        showPlayerMenu() {
            if (incutscene)
                return;
            incutscene = true;

            // set gui
            gui.braverocketlogo.obj.animtype = 5;
            gui.titlescreenfooter.obj.text.invisible = true;
            gui.clicktoplay.obj.sprite.invisible = true;
            gui.titlescreenbuttons.obj.hide();

            // spawn player menu
            bufferGui('playermenu');
            gui.playermenu.obj.x = gui.playermenu.obj.x1;
        },
        hidePlayerMenuCutscene() {
            if (!incutscene)
                return;
            incutscene = false;

            // set gui
            gui.braverocketlogo.obj.animtype = 4;
            gui.titlescreenfooter.obj.text.invisible = false;
            gui.clicktoplay.obj.sprite.invisible = false;
            gui.titlescreenbuttons.obj.unhide();

            gui.playermenu.obj.goingright = true;
            addEvent(() => {
                if (gui.playermenu.obj === null) {
                    return true;
                }
                if (gui.playermenu.obj.offstage) {
                    unbufferGui('playermenu');
                    return true;
                }
                return false;
            })
        }
    },

    // main game
    1: {
        update: function() {
            checkCloudSpawn();
                
            updatePlayer();
            updateParticles();
            updateEntities();
            updateGuiBuffer();
        },
        draw: function() {
            drawBackgrounds();
            drawEntities();
            drawParticles();
            drawPlayer();
            drawGuiBuffer();
        },
        prepare: function() {
            incutscene = false;

            flushGuiBuffer();
            // free gui from main menu (note :: might decrease performance cuz I CANT FREE THEM INSTANTLY ;-;)
            freeGui('braverocketlogo');
            freeGui('logonumber');
            freeGui('clicktoplay');
            freeGui('titlescreenfooter');
            freeGui('titlescreenbuttons');

            // set player offset
            player.offy = PLAYER_MAINGAME_BOTTOM_OFFSET;
            player.prepareForMainGame();
        }
    },

    // settings menu
    // player customization menu
};