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
            updateEntities();

            // gui
            updateGuiBuffer();

            // playing
            if (!incutscene && controller.clicking) {
                incutscene = true;

                var etick = 0;
                gui.braverocketlogo.obj.shouldanimate = false;
                addEvent(() => {
                    if (etick++ === MAINGAME_DELAY) {
                        prepareLoopState(1);
                        return true;
                    }
                    else {
                        // player
                        player.offy -= player.offyrate * (player.offy - PLAYER_MAINGAME_BOTTOM_OFFSET);

                        // gui
                        gui.braverocketlogo.obj.y -= gui.braverocketlogo.obj.stageExitRate * (gui.braverocketlogo.obj.y - gui.braverocketlogo.obj.offstageY);
                        gui.titlescreenfooter.obj.text.invisible = true;
                        gui.clicktoplay.obj.sprite.invisible = true;
                        return false;
                    }
                });
            }
        },
        draw: function() {
            drawBackgrounds();
            drawEntities();
            drawPlayer();
            drawGuiBuffer();
        },
        prepare: function() {
            incutscene = false;

            flushGuiBuffer();
            bufferGui('braverocketlogo');
            bufferGui('logonumber');
            bufferGui('clicktoplay');
            bufferGui('titlescreenfooter');
        }
    },

    // main game
    1: {
        update: function() {
            checkCloudSpawn();
                
            updateGuiBuffer();
            updatePlayer();
            updateEntities();
        },
        draw: function() {
            drawBackgrounds();
            drawEntities();
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