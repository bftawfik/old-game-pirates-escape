function BoyFigure(gsr){
  //--
  this.gameScaleRatio = gsr;
  this.x = 0;
  this.y = 0;
  this.alpha = 0;
  this.rotation = 0;
  this.currentFrame = 0;
  this.currentRealFrame = 0;
  this.frFix = 30/100; //-- increase the x (x/100) to get faster --//
  this.currentState = 'off';
  this.velocity = -1;
  // this.rotation = 0;
  // this.gravity = 0;
  this.states = {
    off:{
      name: 'off',
      axis: {x:-100,y:-246},
      alpha:0,
      velocity:0,
      frames: [0],
    },
    standing:{
      name: 'standing',
      axis: {x:100,y:246},
      alpha:0,
      velocity:-2,
      frames: [0],
    },
    walking:{
      name: 'walking',
      axis: {x:100,y:246},
      alpha:100,
      velocity:-4,
      frames: [0,1,2,1,0,3,4,3],
    },
    jumping:{
      name: 'jumping',
      axis: {x:100,y:246},
      alpha:100,
      velocity:-4,
      frames: [5,6,7,7,7,7,7,7,7,7,7,8,5],
      framesY: [0,35,70,100,130,130,130,130,130,100,70,35,0],
    },
    killed:{
      name: 'killed',
      axis: {x:100,y:246},
      alpha:100,
      rotation:-10,
      frames: [9],
    },
  };
  //---------------------------------------------------------------
  this.changeState = function(state){
    switch (state.name){
      case this.states.standing.name:
        this.currentState = this.states.standing.name;
        this.currentRealFrame = 0;
        this.currentFrame = Math.floor(this.currentRealFrame*this.frFix) % this.states[this.currentState].frames.length;
      break;
      case this.states.walking.name:
        this.currentState = this.states.walking.name;
      break;
      case this.states.jumping.name:
        if(this.currentState != this.states.jumping.name){
          this.currentState = this.states.jumping.name;
          this.currentRealFrame = 0;
          this.currentFrame = Math.floor(this.currentRealFrame*this.frFix) % this.states[this.currentState].frames.length;
          this.jumpSound();
        }
      break;
      case this.states.killed.name:
        if(this.currentState != this.states.killed.name){
          this.currentState = this.states.killed.name;
          this.currentRealFrame = 0;
          this.currentFrame = Math.floor(this.currentRealFrame*this.frFix) % this.states[this.currentState].frames.length;
        }
      break;
      case this.states.off.name:
        if(this.currentState != this.states.off.name){
          this.currentState = this.states.off.name;
          this.currentRealFrame = 0;
          this.currentFrame = Math.floor(this.currentRealFrame*this.frFix) % this.states[this.currentState].frames.length;
        }
      break;
    }
    this.x = this.states[this.currentState].axis.x;
    this.y = this.states[this.currentState].axis.y;
    this.alpha = this.states[this.currentState].alpha;
    this.velocity = this.states[this.currentState].velocity;
  };
  //---------------------------------------------------------------
  this.update = function(gsr){
    this.gameScaleRatio = gsr;
    this.currentRealFrame++;
    this.currentFrame = Math.floor(this.currentRealFrame*this.frFix) % this.states[this.currentState].frames.length;
    this.x = this.states[this.currentState].axis.x;
    this.y = this.states[this.currentState].axis.y;
    if(this.currentState == this.states.standing.name){
      if(this.alpha >= 100){
        this.alpha = 100;
      }else{
        this.alpha -= this.velocity;
      }
    }else if(this.currentState == this.states.jumping.name) {
      if(this.currentFrame == this.states[this.currentState].frames.length-1){
        this.changeState(this.states.walking);
        this.landSound();
        this.currentRealFrame = 0;
        this.currentFrame = Math.floor(this.currentRealFrame*this.frFix) % this.states[this.currentState].frames.length;
      }
    }else if(this.currentState == this.states.killed.name) {

      if(this.rotation > -90){
        this.rotation += this.states[this.currentState].rotation;
      }else if(this.rotation < -90){
        this.rotation = -90;
      }else if(this.rotation == -90){
        if(this.alpha > 0){
          this.alpha -=5;
        }else{
          this.alpha = 0;
          this.changeState(this.states.off);
        }
      }
    }
  };
  //---------------------------------------------------------------
  this.draw = function(gameCntx){
    if (this.currentState == this.states.standing.name) {
      gameCntx.save();
      gameCntx.globalAlpha = (this.alpha/100);
      gameGFX.boyFigure.sprites[this.states[this.currentState].frames[this.currentFrame]].draw(gameCntx, (this.x*this.gameScaleRatio), (this.y*this.gameScaleRatio), this.gameScaleRatio);
      gameCntx.restore();
    }else if (this.currentState == this.states.walking.name) {
      //console.log(this.currentFrame);
      gameGFX.boyFigure.sprites[this.states[this.currentState].frames[this.currentFrame]].draw(gameCntx, (this.x*this.gameScaleRatio), (this.y*this.gameScaleRatio), this.gameScaleRatio);
    }else if (this.currentState == this.states.jumping.name) {
      //console.log(this.currentState);
      gameGFX.boyFigure.sprites[this.states[this.currentState].frames[this.currentFrame]].draw(gameCntx, (this.x*this.gameScaleRatio), (this.y*this.gameScaleRatio)- (this.states[this.currentState].framesY[this.currentFrame]*this.gameScaleRatio), this.gameScaleRatio);
    }else if (this.currentState == this.states.killed.name) {
      //console.log(this.states[this.currentState].frames[this.currentFrame]);
      gameCntx.save();
      gameCntx.globalAlpha = (this.alpha/100);
      var dSprite = gameGFX.boyFigure.sprites[this.states[this.currentState].frames[this.currentFrame]];
      var dx = this.x +0;
      var dy = this.y + (dSprite.height * 1);
      gameCntx.translate((dx*this.gameScaleRatio), (dy*this.gameScaleRatio));
      gameCntx.rotate(this.rotation*Math.PI/180);
      gameCntx.translate((dSprite.width * -0.5*this.gameScaleRatio), (dSprite.height * -1*this.gameScaleRatio));
      dSprite.draw(gameCntx, 0, 0,this.gameScaleRatio);
      gameCntx.translate((dSprite.width * 0.5*this.gameScaleRatio), (dSprite.height *this.gameScaleRatio));
      gameCntx.restore();
    }else if (this.currentState == this.states.off.name) {

    }
  };
  //---------------------------------------------------------------
  this.getRectangle = function(){
    var tempSprite =  gameGFX.boyFigure.sprites[this.states[this.currentState].frames[this.currentFrame]];
    var tempObj = {
      x:(this.x*this.gameScaleRatio),
      y:(this.y*this.gameScaleRatio),
      width:(tempSprite.width*this.gameScaleRatio),
      height:(tempSprite.height*this.gameScaleRatio),
    }
    if(this.currentState == this.states.jumping.name){
      tempObj.y = (this.y*this.gameScaleRatio) - (this.states[this.currentState].framesY[this.currentFrame]*this.gameScaleRatio);
    }
    return tempObj;
  }
  //---------------------------------------------------------------
  this.jumpSound = function(){
    playJumpSound();
  }
  //---------------------------------------------------------------
  this.landSound = function(){
  	playLandSound();
  }
}
