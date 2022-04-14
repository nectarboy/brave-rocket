var savedata = {};

const localstoragesystem = {
    exportRequested: false,
    exportRequestCooldown: 10000,

    resetSaveData() {
        // (!) THIS RESETS THE SAVE DATA TO DEFAULT !!!
        console.log('RESET SAVE DATA.');
        savedata = {
            version: gameversion,

            highscore_score: 0,
            highscore_meters: 0,

            coins: 0,
            equippedanims: {
                skin: 0,
                particle: 0,
                deathexplosion: 0,
            },
            unlockedanims: {
                skin: [true, false, false, false, false, false],
                particle: [true],
                deathexplosion: [true, false]
            }
        };
        this.exportSaveData(savedata);
    },
    reloadSaveData() {
        console.log('loading save data ...');
        var data = window.localStorage.getItem('braverocket');

        // if data was not made yet, make it
        if (data === null) {
            this.resetSaveData();
        }
        // if data is available, import it
        else {
            try {
                this.importSaveData(data);
            }
            catch {
                // corrupted save data found
                console.log('(!) corrupted save data found !');
                console.log('it will be overwritten back to normal :(');

                this.resetSaveData();                
            }
        }
    },

    importSaveData(data) {
        console.log('imported save data');
        var obj = JSON.parse(data);
        savedata = obj;
    },
    exportSaveData(data) {
        console.log('exported save data');
        var jsonString = JSON.stringify(data);
        window.localStorage.setItem('braverocket', jsonString);
    },

    requestExport() {
        if (this.exportRequested)
            return;

        console.log('requesting to export save data ...');
        this.exportRequested = true;

        var that = this;
        setTimeout(() => {
            that.exportRequested = false;
            that.exportSaveData(savedata);
        }, this.exportRequestCooldown);
    }
};

function writeSaveData(keys, val) {
    var obj = savedata;

    var lengthM1 = keys.length-1;
    for (var i = 0; i < lengthM1; i++) {
        obj = obj[keys[i]];
    }

    obj[keys[lengthM1]] = val;
    localstoragesystem.requestExport();   
}