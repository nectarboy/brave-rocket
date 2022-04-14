// page resize function
(function() {
    function onresize() {
        var canvas = document.getElementById('gameCanvas');
        var scale = Math.max(2, Math.min(0|(window.innerWidth/canvas.width), 0|(window.innerHeight/canvas.height)));
        var ratio = canvas.width / canvas.height;

        var width = canvas.width * scale;
        var height = canvas.height * scale;

        if (window.innerHeight < height) {
            height = window.innerHeight;
            width = height * ratio;
        }
        if (window.innerWidth < width) {
            width = window.innerWidth;
            height = width / ratio;
        }

        canvas.style.height = height + 'px';
        canvas.style.width = width + 'px';
    }

    window.addEventListener('resize', onresize);
    onresize();
})();

// start game
loadAssets(
    [
        // - GFX
        ['entities', 'image', 'src/braverocket/assets/gfx/entities.png'],
        ['particles', 'image', 'src/braverocket/assets/gfx/particles.png'],
        ['floor', 'image', 'src/braverocket/assets/gfx/floor.png'],
        // bg
        ['bg_top', 'image', 'src/braverocket/assets/gfx/bg/bg_top.png'],
        ['bg_bottom', 'image', 'src/braverocket/assets/gfx/bg/bg_bottom.png'],
        // gui
        ['braverocket_logo', 'image', 'src/braverocket/assets/gfx/gui/braverocket_logo.png'],
        ['number_two', 'image', 'src/braverocket/assets/gfx/gui/number_two.png'],
        ['click_to_play', 'image', 'src/braverocket/assets/gfx/gui/click_to_play.png'],
        ['game_over_screen', 'image', 'src/braverocket/assets/gfx/gui/game_over_screen.png'],
        ['text_box', 'image', 'src/braverocket/assets/gfx/gui/text_box.png'],
        ['gui_icons', 'image', 'src/braverocket/assets/gfx/gui/gui_icons.png'],

        // - SFX
        //['sfx_fallingcoinfall', 'audio', 'src/braverocket/assets/sfx/fallingcoinfall.ogg'],
        //['sfx_revive', 'audio', 'src/braverocket/assets/sfx/revive.ogg'],

        // - FONT
        ['font_delfino', 'font', 'src/assets/Delfino.ttf']
    ],
    // when done
    () => {
        // save data stuff
        localstoragesystem.reloadSaveData();
        if (savedata.version !== gameversion) {
            writeSaveData(['version'], gameversion);
        }
        // snippet of code that makes sure current session is not lost
        window.onbeforeunload = function() {
            if (localstoragesystem.exportRequested) {
                localstoragesystem.exportSaveData(savedata);
            }
        };

        // now boot the game :)
        console.log('booting game !');
        console.log('------------------------');
        gameReset();
        gameStart();
    }
);