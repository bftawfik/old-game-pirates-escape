function Background(gsr){
  //--
  this.gameScaleRatio = gsr;
  //console.log(this.gameScaleRatio);
  this.x = 0;
  this.y = 0;
  // this.currentFrame = 0;
  // this.frFix = 0;
  this.currentState = 'off';
  this.velocity = -1;
  // this.rotation = 0;
  // this.gravity = 0;
  this.stoping = [0];
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
  };
  //---------------------------------------------------------------
  this.update = function(gsr){
    this.gameScaleRatio = gsr;
    if(this.currentState == this.states.on){
      this.x = (this.x + this.velocity) % (gameGFX.background.sprites.width * -1);
    }
  };
  //---------------------------------------------------------------
  this.draw = function(gameCntx){
    gameGFX.background.sprites.draw(gameCntx, (this.x*this.gameScaleRatio), (this.y*this.gameScaleRatio), this.gameScaleRatio);
    gameGFX.background.sprites.draw(gameCntx, (this.x*this.gameScaleRatio) + (gameGFX.background.sprites.width*this.gameScaleRatio), (this.y*this.gameScaleRatio), this.gameScaleRatio);
  };
  //---------------------------------------------------------------
}
