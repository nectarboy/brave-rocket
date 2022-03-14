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
            bufferGui('braverocketlogo');
            gui.braverocketlogo.obj.animtype = 2;
            gui.braverocketlogo.obj.y = gui.braverocketlogo.obj.offstageY;
            bufferGui('logonumber');
            bufferGui('clicktoplay');
            bufferGui('titlescreenfooter');
            bufferGui('funbutton');
            bufferGui('playerbutton');
        },

        startGameCutscene() {
            if (incutscene)
                return;
            incutscene = true;

            // gui
            gui.braverocketlogo.obj.animtype = 3;
            gui.titlescreenfooter.obj.text.invisible = true;
            gui.clicktoplay.obj.sprite.invisible = true;
            gui.funbutton.obj.hide();
            gui.playerbutton.obj.hide();

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
            gui.funbutton.obj.hide();
            gui.playerbutton.obj.hide();

            // spawn player menu
        },
        hidePlayerMenuCutscene() {
            if (!incutscene)
                return;
            incutscene = false;

            // set gui
            gui.braverocketlogo.obj.animtype = 4;
            gui.titlescreenfooter.obj.text.invisible = false;
            gui.clicktoplay.obj.sprite.invisible = false;
            gui.funbutton.obj.unhide();
            gui.playerbutton.obj.unhide();
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
            
            player.offy = PLAYER_MAINGAME_BOTTOM_OFFSET;
            player.prepareForMainGame();
        }
    }
};