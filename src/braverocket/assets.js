const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const assets = {};

function loadAssets(assetBundle, onFinish) {
    printText(['loading ...', `0/${assetBundle.length}`]);

    var assetsLoaded = 0;
    for (var i = 0; i < assetBundle.length; i++) {
        var assetPack = assetBundle[i]; // ['name', Type, 'src']

        assets[assetPack[0]] = new assetPack[1];
        assets[assetPack[0]].onload = function() {
            assetsLoaded++;
            console.log(assetsLoaded);

            if (assetsLoaded === assetBundle.length) {
                console.log('loaded assets');
                printText(['done :D', '', 'please wait !', 'while the lil goblins in', 'your pc set up the game']);
                onFinish();
            }
            else {
                printText(['loading ...', `\n${assetsLoaded}/${assetBundle.length}`]);
            }
        };

        assets[assetPack[0]].onerror = function() {
            printText(['error loading x_x', 'uhh try reloading']);
        };

        assets[assetPack[0]].src = assetPack[2];
    }

}