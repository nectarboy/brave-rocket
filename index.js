// start game
loadAssets(
    [
        ['entities', Image, 'src/braverocket/assets/gfx/entities.png'],
        ['particles', Image, 'src/braverocket/assets/gfx/particles.png'],
        ['bg_top', Image, 'src/braverocket/assets/gfx/bg/bg_top.png'],
        ['bg_bottom', Image, 'src/braverocket/assets/gfx/bg/bg_bottom.png'],

        ['floor', Image, 'src/braverocket/assets/gfx/floor.png'],
        ['braverocket_logo', Image, 'src/braverocket/assets/gfx/braverocket_logo.png'],
        ['number_two', Image, 'src/braverocket/assets/gfx/number_two.png'],
        ['click_to_play', Image, 'src/braverocket/assets/gfx/click_to_play.png'],
        ['game_over_screen', Image, 'src/braverocket/assets/gfx/game_over_screen.png']
    ],
    // when done
    () => {
        console.log('onto the game');
        gameReset();
        gameStart();
    }
);