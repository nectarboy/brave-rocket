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
                    this.offx = 6;
                    this.offy = 12;

                    this.setType(0);
                };

                setType(val) {
                    this.obj.sprite.chary = 64 + val * this.obj.sprite.h;
                }

                updatePosition() {
                    this.obj.x = playermenu.x + this.offx;
                    this.obj.y = playermenu.y + this.offy;
                }

                update() {
                    this.updatePosition();
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

                updatePosition() {
                    this.obj.x = playermenu.x + this.offx;
                    this.obj.y = playermenu.y + this.offy;
                }

                update() {
                    this.updatePosition();
                    this.obj.update();
                }

                updateSprite() {
                    this.obj.updateSprite();
                }
                draw() {
                    this.obj.draw();
                }
            };

            class SkinTypeButtons {
                constructor() {
                    var skintypebuttons = this;

                    // generate buttons
                    this.buttons = [];
                    this.typeenums = {
                        'skin': 0,
                        'particle': 1,
                        'deathexplosion': 2
                    };

                    [['skin', 'Skins'], ['particle', 'Particles'], ['deathexplosion', 'Explosions']].forEach(function(pack) {
                        var button = new GuiTextButton(new Text(0,0, [pack[1]],10,'#4C4C4C',true), 0,0, 48,0, () => {
                            skintypebuttons.setType(pack[0]);
                        });

                        skintypebuttons.buttons.push(button);
                    });

                    // properties
                    this.currenttype = '';
                    this.offx = 7;
                    this.offy = 48;
                };

                setType(type) {
                    if (type === this.currenttype)
                        return;

                    this.currenttype = type;
                    playermenu.setSkinType(type);
                }         

                updatePosition() {
                    var y = playermenu.y + this.offy;
                    var buttondistance = playermenu.w / this.buttons.length;
                    for (var i = 0; i < this.buttons.length; i++) {
                        this.buttons[i].x = playermenu.x + buttondistance*i - (this.buttons[i].w - buttondistance)*0.5;
                        this.buttons[i].y = y;
                    }
                }
                updateButtons() {
                    for (var i = 0; i < this.buttons.length; i++) {
                        this.buttons[i].update();
                    }
                }
                updateButtonStyles() {
                    for (var i = 0; i < this.buttons.length; i++) {
                        this.buttons[i].setIconIndex(1);
                    }
                    this.buttons[this.typeenums[this.currenttype]].setIconIndex(0);
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

                    this.offx = 16; // unused el oh el
                    this.offy = 95;
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
                    this.equippedcurrentskin = false;
                    this.skinlength = 0;
                    this.objstodraw = 0;
                    this.type = 'skin'; // 'skin', 'particle', 'deathexplosion'
                    this.shouldanimate = true;
                    this.explosioninc = 0;
                    this.sliderange = 0;
                    this.slidedest = 0;
                };

                setType(type) {
                    // reset currently equipped anims
                    this.current.skin = savedata.equippedanims.skin;
                    this.current.particle = savedata.equippedanims.particle;
                    this.current.deathexplosion = savedata.equippedanims.deathexplosion; 

                    // fix currentobj
                    if (this.currentobj === 1) {
                        var obj1 = this.objs[1];
                        this.objs[1] = this.objs[0];
                        this.objs[0] = obj1;
                    }
                    this.currentobj = 0; 

                    // update preview of previous type
                    this.updatePreview();

                    this.checkShouldEquipCurrent();
                    this.type = type;
                    this.skinlength = this.objs[0].animations[type].length;
                    this.shouldanimate = (type === 'skin');
                    this.objstodraw = 2//1 + (type === 'skin');   

                    // reset anim
                    this.explosioninc = 0;
                    this.sliderange = 0;
                    this.slidedest = 0;

                    // update our current preview :)
                    this.updatePreview();
                }

                updatePreview() {
                    this.objs[this.currentobj].equippedanims[this.type] = this.objs[this.currentobj].animations[this.type][this.current[this.type]];
                }

                incSkin() {
                    var previousskin = this.current[this.type]++;
                    if (this.current[this.type] === this.skinlength)
                        this.current[this.type] = 0;

                    // if selected skin is unlocked, equip it
                    this.checkShouldEquipCurrent();

                    // updating preview
                    if (this.shouldanimate) {
                        this.currentobj = 1;
                        this.objs[0].equippedanims.skin = this.objs[0].animations[this.type][previousskin];
                        //this.objs[1].equippedanims.skin = this.objs[1].animations[this.type][this.current.skin];
                        this.updatePreview();

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

                    // if selected skin is unlocked, equip it
                    this.checkShouldEquipCurrent();

                    // updating preview
                    if (this.shouldanimate) {
                        this.currentobj = 0;
                        this.objs[1].equippedanims.skin = this.objs[1].animations[this.type][previousskin];
                        //this.objs[0].equippedanims.skin = this.objs[0].animations[this.type][this.current.skin];
                        this.updatePreview();

                        // animation
                        this.sliderange = -1;
                        this.slidedest = 0;
                    }
                    else {
                        this.objs[0].equippedanims[this.type] = this.objs[0].animations[this.type][this.current[this.type]];
                        this.explosioninc = 0; // in case were on explosions 
                    }
                }
                checkShouldEquipCurrent() {
                    // if selected skin is unlocked, equip it
                    var animindex = this.current[this.type];
                    if (savedata.unlockedanims[this.type][animindex] === true) {
                        writeSaveData(['equippedanims', this.type], animindex);
                        player.equippedanims[this.type] = player.animations[this.type][animindex]; // update actual players skin in realtime
                        this.equippedcurrentskin = true;
                    }
                    else {
                        this.equippedcurrentskin = false;
                    }
                }
                buyCurrent() {
                    var equippedanim = this.objs[this.currentobj].equippedanims[this.type];
                    var animcost = equippedanim.cost;
                    var animindex = this.current[this.type];

                    // can buy
                    if (savedata.coins >= animcost) {
                        writeSaveData(['coins'], savedata.coins - animcost);

                        // unlock anim
                        writeSaveData(['unlockedanims', this.type, animindex], true);
                        this.checkShouldEquipCurrent();
                        return true;
                    }
                    // cant buy
                    else {
                        return false;
                    }
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
                }
                updatePosition() {
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
                    this.updatePosition();
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

            // skin info
            class SkinInfo {
                constructor() {
                    this.skintitle = {
                        sprite: new Text(0,0, ['"skin name"'],16,'black',true),
                        offx: playermenu.w / 2,
                        offy: 145
                    };
                    this.skindescription = {
                        sprite: new Text(0,0, ['(two lines of)', '(description go here)'],9,'black',true),
                        offx: playermenu.w / 2,
                        offy: 162
                    };
                    this.skincosticon = {
                        sprite: new Sprite(assets['entities'], 0,0, 16,16, 0,16, 1),
                        offx: 58,
                        offy: 175
                    };
                    this.skincost = {
                        sprite: new Text(0,0, ['x [cost]'],11,'#4C4C4C',false),
                        offx: 76,
                        offy: 187
                    };
                    this.skinindex = {
                        sprite: new Text(0,0, ['1 / 1'],9,'#4C4C4C',true),
                        offx: playermenu.w / 2,
                        offy: 128
                    };
                    this.currentcoinsicon = {
                        sprite: new Sprite(assets['entities'], 0,0, 16,16, 0,16, 1),
                        offx: 40,
                        offy: 229
                    };
                    this.currentcoins = {
                        sprite: new Text(0,0, ['you have: [amt]'],11,'#4C4C4C',false),
                        offx: 58,
                        offy: 240
                    };

                    this.components = [this.skintitle, this.skindescription, this.skincosticon, this.skincost, this.skinindex, this.currentcoinsicon, this.currentcoins];
                };

                updateInfo() {
                    var skinpreview = playermenu.skinpreview;
                    var equippedanim = skinpreview.objs[skinpreview.currentobj].equippedanims[skinpreview.type];

                    var skintitlestring = equippedanim.name;
                    var skindescriptionstrings = equippedanim.description;
                    var skinccostnum = equippedanim.cost;
                    var currentcoinsnum = savedata.coins;

                    this.skintitle.sprite.text[0] = `"${skintitlestring}"`;
                    this.skindescription.sprite.text = skindescriptionstrings;
                    this.skincost.sprite.text[0] = skinccostnum === 0 ? '× FREE' : `× $${skinccostnum}`;
                    this.skinindex.sprite.text[0] = `${skinpreview.current[skinpreview.type]+1} / ${skinpreview.skinlength}`;
                    this.currentcoins.sprite.text[0] = `you have: ${currentcoinsnum}`;
                }

                update() {

                }

                updateComponentSprite(component) {
                    component.sprite.x = playermenu.x + component.offx;
                    component.sprite.y = playermenu.y + component.offy;
                }

                updateSprite() {
                    for (var i = 0; i < this.components.length; i++) {
                        this.updateComponentSprite(this.components[i]);
                    }
                }
                draw() {
                    for (var i = 0; i < this.components.length; i++) {
                        this.updateComponentSprite(this.components[i]);
                        bufferFrame(this.components[i].sprite, 2);
                    } 
                }
            }

            // buy button
            class BuyButton {
                constructor() {
                    var buybutton = this;

                    this.button = new GuiTextButton(new Text(0,0, ['...'],15,'#22492D',true), 0,0, 128,3, () => {
                        if (buybutton.selected)
                            return;

                        playermenu.buyCurrentAnim();
                    });
                    this.offy = 200;

                    this.selected = false;
                };

                updateButton() {
                    var skinpreview = playermenu.skinpreview;
                    var equippedanim = skinpreview.objs[skinpreview.currentobj].equippedanims[skinpreview.type];

                    this.selected = skinpreview.equippedcurrentskin; // (equippedanim.cost === 0); // should be true when free or already purchased

                    // button style
                    // when free or already purchased
                    if (this.selected) {
                        this.button.setIconIndex(2);
                        this.button.text.text[0] = 'Selected !';
                        this.button.text.color = '#AF676B';
                    }
                    // when unpurchased
                    else {
                        this.button.setIconIndex(3);
                        this.button.text.text[0] = 'BUY';
                        this.button.text.color = '#22492D';
                    }
                }

                updatePosition() {
                    this.button.x = playermenu.x + playermenu.w*0.5 - this.button.w*0.5;
                    this.button.y = playermenu.y + this.offy;
                }

                update() {
                    this.updatePosition();
                    this.button.update();
                }

                updateSprite() {
                    this.button.updateSprite();
                }
                draw() {
                    this.button.draw();
                }
            };

            // yea
            this.exitbutton = new ExitButton();
            this.textboxtitle = new TextboxTitle();
            this.skintypebuttons = new SkinTypeButtons();
            this.arrowbuttons = new ArrowButtons();
            this.skinpreview = new SkinPreview();
            this.skininfo = new SkinInfo();
            this.buybutton = new BuyButton();

            this.skinpreview.setType('skin');
            this.skintypebuttons.setType('skin');
            this.buybutton.updateButton();
            this.components = [this.exitbutton, this.textboxtitle, this.skintypebuttons, this.arrowbuttons, this.skinpreview, this.skininfo, this.buybutton];

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
        updateWholePreview() {
            this.skintypebuttons.updateButtonStyles();
            this.skininfo.updateInfo();
            this.buybutton.updateButton();
        }
        incSkin() {
            this.skinpreview.incSkin();
            this.skininfo.updateInfo();
            this.buybutton.updateButton();
        }
        decSkin() {
            this.skinpreview.decSkin();
            this.skininfo.updateInfo();
            this.buybutton.updateButton();
        }

        setSkinType(type) {
            const typeenums = {
                'skin': 0,
                'particle': 1,
                'deathexplosion': 2
            };

            // update all components
            this.skinpreview.setType(type);
            this.textboxtitle.setType(typeenums[type]);
            this.updateWholePreview();
        }
        buyCurrentAnim() {
            // success
            if (this.skinpreview.buyCurrent()) {
                this.updateWholePreview();
            }
            // fail
            else {
                cameraShake(13, 0.8);
            }
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