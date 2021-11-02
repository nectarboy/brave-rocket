const loopStates = {
    // title screen
    0: {
        update: function() {
            player.resetstartpositionflag = true;
            updatePlayer();

            if (controller.clicking) {
                loopstate = 1;
            }
        },
        draw: function() {
            drawBackgrounds();
            drawPlayer();
            drawEntities();
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