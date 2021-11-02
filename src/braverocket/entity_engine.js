class Entity {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.shouldkill = false;
    }

    insideEnt(ent) {
        return (
            this.x > ent.x - this.w && this.x < ent.x + ent.w &&
            this.y > ent.y - this.h && this.y < ent.y + ent.h
        );
    }
}