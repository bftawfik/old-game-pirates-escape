function Foreground(gsr){
  //--
  this.gameScaleRatio = gsr;
  this.x = 0;
  this.y = 278;
  // this.currentFrame = 0;
  // this.frFix = 0;
  this.currentState = 'off';
  this.velocity = -8;
  // this.rotation = 0;
  // this.gravity = 0;
  this.states = {
    off:'off',
    on:'on',
  };
  //---------------------------------------------------------------
  this.changeState = function(state){
    switch (state){
      case this.states.on:
        this.currentState =  this.states.on;
      break;
      case this.states.off:
        this.currentState =  this.states.off;
      break;
    }
    // if(state == game.states.INITIAL){
    //   this.currentState =  this.states.OFF;
    // }else if(state == game.states.INTRO){
    //   this.currentState =  this.states.OFF;
    // }else if(state == game.states.GAME_ON){
    //   this.currentState =  this.states.ON;
    // }
  };
  //---------------------------------------------------------------
  this.update = function(gsr){
    this.gameScaleRatio = gsr;
    if(this.currentState == this.states.on){
      this.x = (this.x + this.velocity) % (gameGFX.foreground.sprites.width * -1);
    }
  };
  //---------------------------------------------------------------
  this.draw = function(gameCntx){
    gameGFX.foreground.sprites.draw(gameCntx, (this.x*this.gameScaleRatio), (this.y*this.gameScaleRatio), this.gameScaleRatio);
    gameGFX.foreground.sprites.draw(gameCntx, (this.x*this.gameScaleRatio) + (gameGFX.foreground.sprites.width*this.gameScaleRatio), (this.y*this.gameScaleRatio), this.gameScaleRatio);
  };
  //---------------------------------------------------------------
}
