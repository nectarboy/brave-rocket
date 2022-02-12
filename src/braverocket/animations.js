function cameraShake(intensity, durability) {
    camX = intensity;
    addEvent(() => {
        camX = -camX * durability;
        if (camX < 1 && camX > -1) {
            camX = 0;
            return true;
        }
        return false;
    })
}