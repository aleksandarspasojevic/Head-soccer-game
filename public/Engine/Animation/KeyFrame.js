class KeyFrame {
    constructor(time, position, rotation, scale, callbackFuncton, callOnceFunction) {
      this.time = time;
      this.position = position.copy();
      this.rotation = rotation;
      this.scale = scale;
      this.callbackFunction = callbackFuncton;
      this.callOnceFunction = callOnceFunction;
    }
  }