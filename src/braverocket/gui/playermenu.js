gui.playermenu = {
    obj: null,
    class:
    class GuiPlayerMenu {
        constructor() {
            var playermenu = this;

            this.sprite = new WholeSprite(assets['text_box'], 0,0, 2);
            this.w = this.sprite.w * this.sprite.scale;
            this.h = this.sprite.h * this.sprite.scale;

            // - COMPONENTS
            // textbox title
            class TextboxTitle {
                constructor() {
                    this.obj = new StillProp(0,0, 'gui_icons', 65,14, 0,64, 2,1);
                    this.offx = 5;
                    this.offy = 6;

                    this.setType(0);
                };

                setType(val) {
                    this.obj.sprite.chary = 64 + val * this.obj.sprite.h;
                }

                update() {
                    this.obj.x = playermenu.x + this.offx;
                    this.obj.y = playermenu.y + this.offy;
                }

                updateSprite() {
                    this.obj.updateSprite();
                }
                draw() {
                    this.obj.draw();
                }
            }

            // exit button
            class ExitButton {
                constructor() {
                    this.obj = new GuiSmallButton(0,0, 4, function() {
                        loopStates[0].hidePlayerMenuCutscene();
                    });

                    this.offx = playermenu.w - 20;
                    this.offy = 4;
                };

                update() {
                    this.obj.update();
                }

                updateSprite() {
                    this.obj.x = playermenu.x + this.offx;
                    this.obj.y = playermenu.y + this.offy;
                }
                draw() {
                    this.updateSprite();
                    this.obj.draw();
                }
            };

            // arrow buttons
            class ArrowButtons {
                constructor() {
                    this.buttons = [
                        // left
                        new GuiArrowButton(0,0, 1, function() {
                            playermenu.decSkin();
                        }),
                        // right
                        new GuiArrowButton(0,0, 0, function() {
                            playermenu.incSkin();
                        }),
                    ];

                    this.offx = 16;
                    this.offy = 100;
                };

                updatePosition() {
                    this.buttons[0].x = playermenu.x + this.offx;
                    this.buttons[0].y = playermenu.y + this.offy;
                    this.buttons[1].x = playermenu.x + playermenu.w - this.offx - this.buttons[1].w;
                    this.buttons[1].y = playermenu.y + this.offy;
                }
                updateButtons() {
                    for (var i = 0; i < this.buttons.length; i++) {
                        this.buttons[i].update();
                    }   
                }

                update() {
                    this.updatePosition();
                    this.updateButtons();
                }

                updateSprite() {
                    for (var i = 0; i < this.buttons.length; i++) {
                        this.buttons[i].updateSprite();
                    }
                }
                draw() {
                    for (var i = 0; i < this.buttons.length; i++) {
                        this.buttons[i].draw(); // they update sprite themselves within draw
                    }
                }
            }

            // player preview
            class SkinPreview {
                constructor() {
                    this.objs = [new Player(0,0), new Player(0,0)]; // for slide animations, we cycle between 0 and 1, if not, we just use 0

                    this.objspritew = this.objs[0].w * this.objs[0].sprite.scale;
                    this.sliderate = 0.1;
                    this.objdistance = 32;
                    this.explosionrate = 90;
                    this.offx = playermenu.w/2 - this.objs[0].w/2;
                    this.offy = 80;

                    this.currentobj = 0;
                    this.current = {
                        skin: 0,
                        particle: 0,
                        deathexplosion: 0
                    };
                    this.skinlength = 0;
                    this.objstodraw = 0;
                    this.type = ''; // 'skin', 'particle', 'deathexplosion'
                    this.shouldanimate = true;
                    this.explosioninc = 0;
                    this.sliderange = 0;
                    this.slidedest = 0;

                    this.setType('skin');
                };

                setType(type) {
                    this.type = type;
                    //this.currentskin
                    this.skinlength = this.objs[0].animations[type].length;
                    this.shouldanimate = (type === 'skin');
                    this.objstodraw = 2//1 + (type === 'skin');

                    if (this.currentobj === 1) {
                        var obj1 = this.objs[1];
                        this.objs[1] = this.objs[0];
                        this.objs[0] = obj1;
                    }
                    this.currentobj = 0;             

                    // reset anim
                    this.explosioninc = 0;
                    this.sliderange = 0;
                    this.slidedest = 0;
                }
                incSkin() {
                    var previousskin = this.current[this.type]++;
                    if (this.current[this.type] === this.skinlength)
                        this.current[this.type] = 0;

                    if (this.shouldanimate) {
                        this.objs[0].equippedanims.skin = this.objs[0].animations[this.type][previousskin];
                        this.objs[1].equippedanims.skin = this.objs[1].animations[this.type][this.current.skin];
                        this.currentobj = 1;

                        // animation
                        this.sliderange = 0;
                        this.slidedest = -1;
                    }
                    else {
                        this.objs[0].equippedanims[this.type] = this.objs[0].animations[this.type][this.current[this.type]];
                        this.explosioninc = 0; // in case were on explosions 
                    }
                }
                decSkin() {
                    var previousskin = this.current[this.type]--;
                    if (this.current[this.type] < 0)
                        this.current[this.type] = this.skinlength-1;

                    if (this.shouldanimate) {
                        this.objs[1].equippedanims.skin = this.objs[1].animations[this.type][previousskin];
                        this.objs[0].equippedanims.skin = this.objs[0].animations[this.type][this.current.skin];
                        this.currentobj = 0;

                        // animation
                        this.sliderange = -1;
                        this.slidedest = 0;
                    }
                    else {
                        this.objs[0].equippedanims[this.type] = this.objs[0].animations[this.type][this.current[this.type]];
                        this.explosioninc = 0; // in case were on explosions 
                    }
                }
                buySkin() {

                }

                updateAnimation() {
                    if (this.shouldanimate) {
                        this.sliderange += (this.slidedest - this.sliderange) * this.sliderate;
                    }
                    else {
                        this.sliderange = 0;
                    }
                }
                updateObjs() {
                    // animation
                    for (var i = 0; i < this.objstodraw; i++) {
                        this.objs[i].equippedanims.skin.func();
                    }

                    switch (this.type) {
                        case 'particle': {
                            // since currentobj is always gonna be zero when type is particle/explosion no need for loops :D
                            this.objs[0].equippedanims.particle.func(2);
                            break;
                        }
                        case 'deathexplosion': {
                            if (this.explosioninc++ % this.explosionrate === 0) {
                                this.objs[0].equippedanims.deathexplosion.func(15, 2);
                            }

                            break;
                        }
                    }

                    // position
                    for (var i = 0; i < this.objstodraw; i++) {
                        this.objs[i].layer = 2;

                        // sliding effect + position
                        var distance = this.sliderange * this.objdistance;
                        this.objs[i].x = playermenu.x + this.offx + distance + i*this.objdistance;
                        this.objs[i].y = playermenu.y + this.offy;

                        var scale = 2 * Math.abs(Math.cos(Math.PI * (this.sliderange - i)*0.5));
                        //var scale = (1 + this.sliderange - i);
                        if (scale > 1.99)
                            scale = 2;
                        this.objs[i].sprite.scale = scale;
                    }
                }

                update() {
                    this.updateObjs();
                    this.updateAnimation();
                }

                updateSprite() {
                    for (var i = 0; i < this.objstodraw; i++) {
                        this.objs[i].updateSprite();
                    }
                }
                draw() {
                    for (var i = 0; i < this.objstodraw; i++) {
                        this.objs[i].draw(); // they update their sprites on their own
                    }
                }
            }

            // yea
            this.exitbutton = new ExitButton();
            this.textboxtitle = new TextboxTitle();
            this.arrowbuttons = new ArrowButtons();
            this.skinpreview = new SkinPreview();
            this.components = [this.exitbutton, this.textboxtitle, this.arrowbuttons, this.skinpreview];

            // constants
            this.x1 = canvas.width + 120;
            this.x2 = canvas.width/2 - this.w/2;
            this.yposition = canvas.height/2 - this.h/2;
            this.motionrate = 0.1;

            // properties
            this.x = 0;
            this.y = 0;
            this.goingright = false;
            this.offstage = false;
        };

        // preview methods
        setSkinType(type) {
            this.skinpreview.setType(type);

            // textbox title
            const typeenums = {
                'skin': 0,
                'particle': 1,
                'deathexplosion': 2
            };
            this.textboxtitle.setType(typeenums[type]);
        }
        incSkin() {
            this.skinpreview.incSkin();
        }
        decSkin() {
            this.skinpreview.decSkin();
        }

        updateAnimation() {
            if (this.goingright) {
                this.x += this.motionrate * (this.x1 - this.x);
                this.offstage = (this.x + 1 >= this.x1);
            }
            else {
                this.x += this.motionrate * (this.x2 - this.x);
                this.offstage = false;
            }
            this.y = this.yposition;
        }

        updateComponents() {
            for (var i = 0; i < this.components.length; i++) {
                this.components[i].update();
            }
        }

        update() {
            this.updateComponents();
            this.updateAnimation();
        }

        updateSprite() {
            this.sprite.centerOnto(this.x, this.y, this.w, this.h);
        }
        draw() {
            this.updateSprite();
            bufferFrame(this.sprite, 1); // layer one so other stuff like entities can pass thru ,,, im bad

            for (var i = 0; i < this.components.length; i++) {
                this.components[i].draw();
            }
        }
    }
};