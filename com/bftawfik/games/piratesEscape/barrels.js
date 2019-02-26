//console.log('barrels');
function Barrel(state, gsr, xPos = (Math.floor(Math.random()*-0)+0)+800){
  //--
  this.gameScaleRatio = gsr;
  this.x = xPos;
  this.y = 296;
  this.currentState = state;
  this.velocity = -8;
  this.states = {
    off:'off',
    standing:'standing',
    on:'on',
  };
  //---------------------------------------------------------------
  this.changeState = function(state){
    //console.log('changeState');
    switch (state){
      case this.states.standing:
        this.currentState =  this.states.standing;
      break;
      case this.states.on:
        this.currentState =  this.states.on;
      break;
    }
  };
  //---------------------------------------------------------------
  this.update = function(gsr){
    //console.log(this.currentState);
    this.gameScaleRatio = gsr;
    if(this.currentState == this.states.on){
      this.x += this.velocity;
    }
  };
  //---------------------------------------------------------------
  this.draw = function(gameCntx){
    //console.log(this.currentState);
    if(this.currentState != this.states.off){
      gameGFX.barrel.sprites.draw(gameCntx, (this.x*this.gameScaleRatio), (this.y*this.gameScaleRatio), this.gameScaleRatio);
    }

  };
  //---------------------------------------------------------------
  this.getRectangle = function(){
    var tempSprite =  gameGFX.barrel.sprites;
    var tempObj = {
      x:(this.x*this.gameScaleRatio),
      y:(this.y*this.gameScaleRatio),
      width:(tempSprite.width*this.gameScaleRatio),
      height:(tempSprite.height*this.gameScaleRatio),
    }
    return tempObj;
  }
  //---------------------------------------------------------------
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
//--
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function Barrels(game,gsr){
  //--
  this.gameScaleRatio = gsr;
  this.list = [];
  this.currentState = 'off';
  this.velocity = -10;
  this.currentFrame = 0;
  this.currentRealFrame = 0;
  this.targetFrame = 0;
  this.frFix = 30/100; //-- increase the x (x/100) to get faster --//
  this.game = game;
  this.states = {
    off:'off',
    standing:'standing',
    on:'on',
  };
  //---------------------------------------------------------------
  this.removeOutsideBarrels = function(){
    for(var barrelCount = 0;barrelCount <this.list.length;barrelCount++){
      if(this.list[barrelCount] != undefined){
        if((this.list[barrelCount].x+gameGFX.barrel.sprites.width) < 0){
          increaseScore();
          this.list.shift();
        }
      }
    }
  }
  //---------------------------------------------------------------
  this.chickCollide = function(obj1, obj2){
    if (obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x && obj1.y < obj2.y + obj2.height && obj1.height + obj1.y > obj2.y) {
      //console.log('collided');
      return true;
    }
    return false;
  }
  //---------------------------------------------------------------
  this.changeState = function(state){
    switch (state){
      case this.states.standing:
        this.currentState =  this.states.standing;
        this.list = [];
        for(var barrelCount = 0;barrelCount <this.list.length;barrelCount++){
          this.list[barrelCount].changeState(this.list[barrelCount].states.standing);
        }
      break;
      case this.states.on:
        this.currentState =  this.states.on;
        for(var barrelCount = 0;barrelCount <this.list.length;barrelCount++){
          this.list[barrelCount].changeState(this.list[barrelCount].states.on);
        }
      break;
    }
  };
  //---------------------------------------------------------------
  this.update = function(gsr){
    this.gameScaleRatio = gsr;
    this.currentRealFrame++;
    var updateFactor = 25;
    var randomFactor = Math.floor(updateFactor/this.frFix/2.0)
    //console.log(randomFactor);
    //console.log(Math.floor(5/this.frFix));
    //console.log(this.currentRealFrame%Math.floor(30/this.frFix));
    this.currentFrame = this.currentRealFrame%Math.floor(updateFactor/this.frFix);
    //console.log(this.currentFrame, Math.floor(30/this.frFix)-1);
    //console.log(this.currentFrame);
    if(this.currentState == this.states.off){
      //
    }else if(this.currentState == this.states.standing){
      //this.list[barrelCount].changeState(this.currentState);
    }else if(this.currentState == this.states.on){
      this.removeOutsideBarrels();
      //console.log(this.currentFrame, Math.floor(30/this.frFix));
      if(this.currentFrame ==  Math.floor(updateFactor/this.frFix)-1){
        this.targetFrame = Math.floor(Math.random()*randomFactor);
      }else if(this.currentFrame == this.targetFrame){
        // console.log(this.targetFrame, Math.floor(18/this.frFix));
        // console.log('this.targetFrame');
        this.list.push(this.addBarrel(this.currentState));
      }
      for(var barrelCount = 0;barrelCount <this.list.length;barrelCount++){
        this.list[barrelCount].update(this.gameScaleRatio);
      }
      for(var barrelCount = 0;barrelCount <this.list.length;barrelCount++){
        if(this.chickCollide(this.list[barrelCount].getRectangle(), this.game.boyFigure.getRectangle())){
          endGame();
          this.list.shift();
        }
      }
    }
  };
  //---------------------------------------------------------------
  this.draw = function(gameCntx){
    if(this.currentState != this.states.off){
      for(var barrelCount = 0;barrelCount <this.list.length;barrelCount++){
        this.list[barrelCount].draw(gameCntx);
      }
    }
  };
  //---------------------------------------------------------------
  this.addBarrel = function(state, xPos){
    var tempBarrel = new Barrel(state, this.gameScaleRatio);
    return tempBarrel;
  };
  //---------------------------------------------------------------
}
