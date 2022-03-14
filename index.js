// start game
loadAssets(
    [
        // gfx
        ['entities', 'image', 'src/braverocket/assets/gfx/entities.png'],
        ['particles', 'image', 'src/braverocket/assets/gfx/particles.png'],
        ['bg_top', 'image', 'src/braverocket/assets/gfx/bg/bg_top.png'],
        ['bg_bottom', 'image', 'src/braverocket/assets/gfx/bg/bg_bottom.png'],


        ['floor', 'image', 'src/braverocket/assets/gfx/floor.png'],
        ['braverocket_logo', 'image', 'src/braverocket/assets/gfx/braverocket_logo.png'],
        ['number_two', 'image', 'src/braverocket/assets/gfx/number_two.png'],
        ['click_to_play', 'image', 'src/braverocket/assets/gfx/click_to_play.png'],
        ['game_over_screen', 'image', 'src/braverocket/assets/gfx/game_over_screen.png'],
        ['text_box', 'image', 'src/braverocket/assets/gfx/game_over_screen.png'],
        ['icons', 'image', 'src/braverocket/assets/gfx/icons.png'],

        // sfx
        //['sfx_fallingcoinfall', 'audio', 'src/braverocket/assets/sfx/fallingcoinfall.ogg'],
        //['sfx_revive', 'audio', 'src/braverocket/assets/sfx/revive.ogg'],
    ],
    // when done
    () => {
        console.log('booting game !');
        gameReset();
        gameStart();
    }
);