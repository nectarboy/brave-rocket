var incutscene = false;

function prepareTitleScreen() {
    loopstate = 0;

    incutscene = false;
    entities.push(spawnFloorProp());
}
function prepareMainGame() {
    loopstate = 1;
    incutscene = false;
}

const loopStates = {
    // title screen
    0: {
        update: function() {
            player.resetstartpositionflag = true;
            updatePlayer();
            updateEntities();

            // gui
            gui.braverocket_logo.update();

            // playing
            if (!incutscene && controller.clicking) {
                incutscene = true;

                var etick = 0;
                var logo = gui.braverocket_logo;
                logo.shouldanimate = false;
                addEvent(() => {
                    if (etick === 60) {
                        prepareMainGame();
                        return true;
                    }
                    else {
                        etick++;

                        // gui
                        logo.y += BRAVEROCKET_LOGO_OFFSTAGE_RATE * (BRAVEROCKET_LOGO_OFFSTAGE_Y - logo.y);

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
            gui.braverocket_logo.draw();
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