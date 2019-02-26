function StartScreen(gsr){
  //--
  this.gameScaleRatio = gsr;
  this.x = 202;
  this.y = 87;
  this.playBtn_x = 369;
  this.playBtn_y = 338;
  this.alpha = 0;
  // this.currentFrame = 0;
  // this.frFix = 0;
  this.currentState = 'on';
  this.velocity = -4;
  // this.rotation = 0;
  // this.gravity = 0;
  this.stoping = [0];
  this.states = {
    off:'off',
    on:'on',
  };
  //---------------------------------------------------------------
  this.changeState = function(state){
    //console.log(state);
    switch (state){
      case this.states.off:
        this.currentState =  this.states.off;
        this.alpha = 0;
      break;
    }
  };
  //---------------------------------------------------------------
  this.update = function(gsr){
    this.gameScaleRatio = gsr;
    if(this.currentState == this.states.on){
      if(this.alpha >= 100){
        this.alpha = 100;
      }else{
        this.alpha -= this.velocity;
      }
    }else if(this.currentState == this.states.off){
      if(this.alpha <= 0){
        this.alpha = 0;
      }else{
        this.alpha += this.velocity;
      }
    }
  };
  //---------------------------------------------------------------
  this.draw = function(gameCntx){
    gameCntx.save();
    gameCntx.globalAlpha = (this.alpha/100);
    gameGFX.startScreen.sprites.draw(gameCntx, (this.x*this.gameScaleRatio), (this.y*this.gameScaleRatio), this.gameScaleRatio);
    gameCntx.restore();
  };
  //---------------------------------------------------------------
  this.getPlayRectangle = function(){
    var tempSprite = gameGFX.playBtn.sprites;
    var tempObj = {
      x:(this.playBtn_x*this.gameScaleRatio),
      y:(this.playBtn_y*this.gameScaleRatio),
      width:(tempSprite.width*this.gameScaleRatio),
      height:(tempSprite.height*this.gameScaleRatio),
    }
    return tempObj;
  }
  //---------------------------------------------------------------
}
