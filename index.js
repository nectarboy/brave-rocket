// start game
loadAssets(
    [
        ['entities', Image, 'src/braverocket/gfx/entities.png'],
        ['particles', Image, 'src/braverocket/gfx/particles.png'],
        ['bg_top', Image, 'src/braverocket/gfx/bg/bg_top.png'],
        ['bg_bottom', Image, 'src/braverocket/gfx/bg/bg_bottom.png'],

        ['floor', Image, 'src/braverocket/gfx/floor.png'],
        ['braverocket_logo', Image, 'src/braverocket/gfx/braverocket_logo.png'],
        ['number_two', Image, 'src/braverocket/gfx/number_two.png'],
        ['click_to_play', Image, 'src/braverocket/gfx/click_to_play.png'],
        ['game_over_screen', Image, 'src/braverocket/gfx/game_over_screen.png']
    ],
    // when done
    () => {
        console.log('onto the game');
        gameReset();
        gameStart();
    }
);