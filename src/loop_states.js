const loopStates = {
    // title screen
    0: {
        update: function() {
            //updatePlayer();

            if (controller.clicking) {
                loopstate = 1;
            }
        },
        draw: function() {
            drawBackgrounds();
            drawPlayer();
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
            drawPlayer();
            drawEntities();
        }
    }
}