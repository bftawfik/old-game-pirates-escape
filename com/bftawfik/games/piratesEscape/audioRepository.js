function AudioRepository(funcName) {
  //========================================================================
  //========================================================================
  //========================================================================
  this.gameAudios = [
    {
      path: 'mp3/loop0.mp3',
      sound: new Audio(),
			loaded: 0,
      bytesLoaded: 0,
      bytesTotal: 0,
    },
    {
      path: 'mp3/click.mp3',
      sound: new Audio(),
			loaded: 0,
      bytesLoaded: 0,
      bytesTotal: 0,
    },
    {
      path: 'mp3/hit2.mp3',
      sound: new Audio(),
			loaded: 0,
      bytesLoaded: 0,
      bytesTotal: 0,
    },
    {
      path: 'mp3/jump.mp3',
      sound: new Audio(),
      loaded: 0,
      bytesLoaded: 0,
      bytesTotal: 0,
    },
    {
      path: 'mp3/snap.mp3',
      sound: new Audio(),
      loaded: 0,
      bytesLoaded: 0,
      bytesTotal: 0,
    },
  ];
  this.loopId = 0;
  this.clickId = 1;
  this.breakId = 2;
  this.jumpId = 3;
  this.landId = 4;
  this.enabled = 1;
  //========================================================================
  //========================================================================
  //========================================================================
  Audio.prototype.load = function(url, audioObj){
    var thisAudio = this;
    var thisAudioObj = audioObj;
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url,true);
    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function(e) {
        var blob = new Blob([this.response]);
        thisAudio.src = window.URL.createObjectURL(blob);
        thisAudio.onCanPlayThrough();
    };
    xmlHTTP.onprogress = function(e) {
        thisAudio.completedPercentage = parseInt((e.loaded / e.total) * 100);
        e.thisAudioObj = thisAudioObj;
        thisAudio.onAudioProgress(e);
    };
    xmlHTTP.onloadstart = function() {
        thisAudio.completedPercentage = 0;
    };
    xmlHTTP.send();
  };
  Audio.prototype.onAudioProgress = function(e){
  };
  Audio.prototype.onCanPlayThrough = function(e){
  };
  Audio.prototype.completedPercentage = 0;
  //========================================================================
  //========================================================================
  //========================================================================
  this.createAudio = function(parent, obj){
    var audioObj = obj;
    audioObj.sound.parent = parent;
    audioObj.sound.onCanPlayThrough = function(){
  		audioObj.loaded = 1;
  	}
    audioObj.sound.oncanplaythrough = function(){
  		//console.log("oncanplaythrough");
  		audioObj.loaded = 1;
      audioObj.sound.play();
  		//audioObj.sound.parent.checkIfAllLoaded();
  	}
    audioObj.sound.onAudioProgress = function(e){
      //console.log('onAudioProgress');
      e.thisAudioObj.bytesLoaded = e.loaded;
      e.thisAudioObj.bytesTotal = e.total;
    };
    audioObj.sound.load(audioObj.path, audioObj);
  }
  //------------------------------------------------------------------------
  this.init = function(){
    for(var audioCount = 0; audioCount < this.gameAudios.length; audioCount++){
      this.createAudio(this, this.gameAudios[audioCount]);
    }
  }
  //------------------------------------------------------------------------
  this.getLoadedCount = function(){
    //console.log('getLoadedCount');
    var loadedAudiosCount = 0;
    for(var audioCount = 0; audioCount < this.gameAudios.length; audioCount++){
      if(this.gameAudios[audioCount].loaded == 1){
        loadedAudiosCount++;
      }
    }
    return loadedAudiosCount;
  }
  //------------------------------------------------------------------------
  this.checkIfAllLoaded = function(){
    //console.log('checkIfAllLoaded');
    var loadedAudiosCount = 0;
    for(var audioCount = 0; audioCount < this.gameAudios.length; audioCount++){
      if(this.gameAudios[audioCount].loaded == 1){
        loadedAudiosCount++;
      }
    }
    if(loadedAudiosCount == this.gameAudios.length){
      //console.log(loadedAudiosCount);
      //window[this.afterAllLoaded]();
    }
  }
  //------------------------------------------------------------------------
  this.init();
  //------------------------------------------------------------------------
}
