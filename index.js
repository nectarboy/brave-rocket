// start game
loadAssets(
    [
        ['entities', Image, 'src/braverocket/gfx/entities.png'],
        ['particles', Image, 'src/braverocket/gfx/particles.png'],
        ['floor', Image, 'src/braverocket/gfx/floor.png'],
        ['background_top', Image, 'src/braverocket/gfx/background_top.png'],
        ['background_bottom', Image, 'src/braverocket/gfx/background_bottom.png'],
        ['braverocket_logo', Image, 'src/braverocket/gfx/braverocket_logo.png']
    ],
    // when done
    () => {
        console.log('onto the game');
        gameReset();
        gameStart();
    }
);