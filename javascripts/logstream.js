
/*!
 * logstream
 * Copyright (c) 2012 hitsujiwool <utatanenohibi@gmail.com>
 * MIT Licensed
 */

;(function(exports) {
  
  function LogStream(resource) {
    EventEmitter.call(this);
  }
  
  LogStream.prototype = new EventEmitter;

  LogStream.prototype.connect = function() {
    var that = this;
    var persons = ['foo', 'bar', 'baz'];
    var loop = setInterval(function() {
      var person = persons.shift();
      if (person) {
        that.emit('connection', new Person(person));
      } else {
        clearInterval(loop);
      }
    }, 5000);
  };
  
  function Person(id) {
    this.id = id;
    this.locationMock();
    //this.positionMock();
    EventEmitter.call(this);
  }

  Person.prototype = new EventEmitter();

  Person.prototype.positionMock = function() {
    var that = this;
    setInterval(function() {
      that.emit('position', { direction: Math.PI * 2 * Math.random() });
    }, 100);
  };

  Person.prototype.locationMock = function() {
    var that = this,
        data = { x: Math.random() * 500 - 500, y: 0, z: Math.random() * 200, timestamp: new Date().getTime() };
    setInterval(function() {
      var newData = {};
      for (var key in data) {
        newData.x = data.x + (Math.random() * 100 - 10);
        newData.y = 0;
        newData.z = data.z + (Math.random() * 100 - 50);
      }
      that.emit('location', newData);
      data = newData;
    }, 1000);
  };

  exports.LogStream = LogStream;
  
})(this);