const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const assets = {};

function loadAssets(assetBundle, onFinish) {
    displayText(['loading ...', '', `0/${assetBundle.length}`]);
    displayLoadingBar(0);

    // text / display
    function displayText(lines) {
        const textsize = 20;

        ctx.fillStyle = '#333333';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = textsize + 'px times new roman';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#888888';

        for (var i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], canvas.width/2, canvas.height/2 - lines.length*textsize/2 + i*textsize);
        }
    }

    function displayLoadingBar(range) {
        const width = 80;
        const height = 14;
        const offset = 15;

        ctx.fillStyle = '#888888';
        ctx.strokeStyle = '#cccccc';

        ctx.fillRect(canvas.width/2 - width/2, canvas.height/2 - height/2 - offset, width * range, height);
        ctx.strokeRect(canvas.width/2 - width/2 - 0.5, canvas.height/2 - height/2 - offset - 0.5, width, height);
    } 

    // loading handlers
    var assetsLoaded = 0;
    var erroroccured = false;
    function onAssetLoad() {
        if (erroroccured)
            return;

        assetsLoaded++;
        console.log('load', assetsLoaded);

        if (assetsLoaded === assetBundle.length) {
            console.log('load assets  !');
            displayText(['done :D', '', 'please wait !', 'while the lil goblins in', 'your pc set up the game']);
            //setTimeout(onFinish, 1000);

            try {
                onFinish();
            }
            catch(e) {
                onLoadingError('exception launching game');
                throw (e);
            }
        }
        else {
            displayText(['loading ...', '', `\n${assetsLoaded}/${assetBundle.length}`]);
            displayLoadingBar(assetsLoaded / assetBundle.length);
        }
    }
    function onLoadingError(reason='???') {
        console.log(`error -- ${reason}`);
        displayText(['error occured x_x', 'uhh try reloading ??']);
        erroroccured = true;
    };

    // loading assets
    for (var i = 0; i < assetBundle.length; i++) {
        var assetPack = assetBundle[i]; // ['name', 'type', 'src']
        var name = assetPack[0];
        var type = assetPack[1];
        var src = assetPack[2];

        switch (type) {
            case 'image': {
                assets[name] = new Image();
                assets[name].onload = onAssetLoad;
                assets[name].onerror = () => onLoadingError(`error loading asset i${i}`);
                assets[name].src = src;
                break;
            }
            case 'audio': {
                assets[name] = new Audio();

                var condition = 0;
                function conditionMet() {
                    condition++;
                    if (condition === 2) {
                        condition = 0;
                        onAssetLoad();
                    }
                }

                assets[name].oncanplay = conditionMet;
                assets[name].onloadeddata = conditionMet;
                assets[name].onerror = () => onLoadingError(`error loading asset i${i}`);
                assets[name].src = src;
                break;
            }
            case 'font': {
                assets[name] = new FontFace(name, `url('${src}')`);

                assets[name].load().then(font => {
                    document.fonts.add(font);
                    onAssetLoad();
                }).catch(e => {
                    onLoadingError(`error loading font i${i}, details: ${e}`);
                });
                break;
            }

            default: {
                onLoadingError(`unknown asset type '${assetPack[1]}' i${i}`);
            }
        }
    }

}

function playSound(name) {
    if (!assets[name].paused) {
        assets[name].currentTime = 0; // fix for mobile ??
    }
    assets[name].play();
}