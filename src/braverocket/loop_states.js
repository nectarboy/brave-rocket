var incutscene = false;

function prepareTitleScreen() {
    loopstate = 0;

    incutscene = false;
    entities.push(spawnFloorProp());
}
function prepareMainGame() {
    loopstate = 1;

    incutscene = false;
    player.bottomoffset = PLAYER_MAINGAME_BOTTOM_OFFSET;
}

const loopStates = {
    // title screen
    0: {
        update: function() {
            player.resetstartpositionflag = true;
            updatePlayer();
            updateEntities();

            // gui
            gui.braverocketlogo.update();
            gui.logonumber.update();

            // playing
            if (!incutscene && controller.clicking) {
                incutscene = true;

                var etick = 0;
                gui.braverocketlogo.shouldanimate = false;
                addEvent(() => {
                    if (etick === MAINGAME_DELAY) {
                        prepareMainGame();
                        return true;
                    }
                    else {
                        etick++;

                        // player
                        player.bottomoffset -= player.bottomoffsetRate * (player.bottomoffset - PLAYER_MAINGAME_BOTTOM_OFFSET);
                        // gui
                        gui.braverocketlogo.y -= gui.braverocketlogo.stageExitRate * (gui.braverocketlogo.y - gui.braverocketlogo.offstageY);
                        gui.titlescreenfooter.text.invisible = true;

                        return false;
                    }
                });
            }
        },
        draw: function() {
            drawBackgrounds();
            drawEntities();
            drawPlayer();

            // gui
            gui.braverocketlogo.draw();
            gui.logonumber.draw();
            gui.titlescreenfooter.draw();
        }
    },

    // main game
    1: {
        update: function() {
            checkCloudSpawn();
            
            updatePlayer();
            updateEntities();
        },
        draw: function() {
            drawBackgrounds();
            drawEntities();
            drawPlayer();
        }
    }
};