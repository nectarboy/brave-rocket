// start game
loadAssets(
    [
        ['entities', Image, 'src/gfx/entities.png'],
        ['background_top', Image, 'src/gfx/background_top.png'],
        ['background_bottom', Image, 'src/gfx/background_bottom.png'],
    ],
    // when done
    () => {
        console.log('onto the game');
        gameReset();
        gameStart();
    }
);