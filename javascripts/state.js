
;(function(exports) {

  function State() {
    EventEmitter.call(this);
    this.clock = new Clock();
  }
  
  State.prototype = new EventEmitter();

  State.prototype.show = function(id) {
    this.emit('show', id);
  };

  State.prototype.hide = function(id) {
    this.emit('hide', id);
  };

  State.prototype.getSpeed = function() {
    return this.clock.getSpeed();
  };

  State.prototype.setSpeed = function(val) {
    this.clock.setSpeed(val);
    this.emit('speedchange', val);
  };

  exports.State = State;

})(this);