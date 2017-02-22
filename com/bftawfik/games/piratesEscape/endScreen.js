function EndScreen(gsr){
  //--
  this.gameScaleRatio = gsr;
  this.x = 202;
  this.y = 87;
  this.closeBtn_x = 288;
  this.closeBtn_y = 270;
  this.replayBtn_x = 406;
  this.replayBtn_y = 270;
  this.score_x = 390;
  this.score_y = 162;
  this.bestScore_x = 350;
  this.bestScore_y = 210;
  this.alpha = 0;
  // this.currentFrame = 0;
  // this.frFix = 0;
  this.currentState = 'off';
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
    switch (state){
      case this.states.on:
        this.currentState =  this.states.on;
      break;
      case this.states.off:
        this.currentState =  this.states.off;
      break;
    }
  };
  //---
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
    if(this.currentState == this.states.on){
      gameCntx.save();
      gameCntx.globalAlpha = (this.alpha/100);
      gameGFX.endScreen.sprites.draw(gameCntx, (this.x*this.gameScaleRatio), (this.y*this.gameScaleRatio), this.gameScaleRatio);
      gameGFX.closeBtn.sprites.draw(gameCntx, (this.closeBtn_x*this.gameScaleRatio), (this.closeBtn_y*this.gameScaleRatio), this.gameScaleRatio);
      gameGFX.replayBtn.sprites.draw(gameCntx, (this.replayBtn_x*this.gameScaleRatio), (this.replayBtn_y*this.gameScaleRatio), this.gameScaleRatio);
      this.drawScore();
      gameCntx.restore();
    }
  };
  //---------------------------------------------------------------
  this.drawScore = function(){
    var stringScore;
    var char, char_x, char_y;
    var oldChars_width;
    stringScore = score+"";
    stringScore = stringScore.split('');
    stringScore.reverse();
    oldChars_width = 0;
    for(var charCount = 0; charCount <stringScore.length;charCount++){
      char = parseInt(stringScore[charCount]);
      oldChars_width += gameGFX.numbers.sprites[char].width;
      char_x = this.score_x - oldChars_width;
      char_y = this.score_y;
      gameGFX.numbers.sprites[char].draw(gameCntx, (char_x*this.gameScaleRatio), (char_y*this.gameScaleRatio), this.gameScaleRatio);
    }
    stringScore = bestScore+"";
    stringScore = stringScore.split('');
    stringScore.reverse();
    oldChars_width = 0;
    for(var charCount = 0; charCount <stringScore.length;charCount++){
      char = parseInt(stringScore[charCount]);
      oldChars_width += gameGFX.numbers.sprites[char].width;
      char_x = this.bestScore_x - oldChars_width;
      char_y = this.bestScore_y;
      gameGFX.numbers.sprites[char].draw(gameCntx, (char_x*this.gameScaleRatio), (char_y*this.gameScaleRatio), this.gameScaleRatio);
    }
  }
  //---------------------------------------------------------------
  this.getCloseRectangle = function(){
    var tempSprite = gameGFX.closeBtn.sprites;
    var tempObj = {
      x:(this.closeBtn_x*this.gameScaleRatio),
      y:(this.closeBtn_y*this.gameScaleRatio),
      width:(tempSprite.width*this.gameScaleRatio),
      height:(tempSprite.height*this.gameScaleRatio),
    }
    return tempObj;
  }
  //---------------------------------------------------------------
  this.getReplayRectangle = function(){
    var tempSprite = gameGFX.replayBtn.sprites;
    var tempObj = {
      x:(this.replayBtn_x*this.gameScaleRatio),
      y:(this.replayBtn_y*this.gameScaleRatio),
      width:(tempSprite.width*this.gameScaleRatio),
      height:(tempSprite.height*this.gameScaleRatio),
    }
    return tempObj;
  }
  //---------------------------------------------------------------
}
