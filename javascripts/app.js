/*
 * 
 */

$(function() {

  var stream = new LogStream(),
      state = new State(),
      world = new World(stream, state, window.innerWidth, window.innerHeight);

  var $fake = $('.fake span'),
      $real = $('.real span');

  stream.on('connection', function(person) {
    $('.persons').append('<li><label><input type="checkbox" data-person-id=' + person.id + ' checked="checked" /><label>' + person.id + '</li></label>');
  });

  $('.persons :input').live('change', function() {
    var id = this.getAttribute('data-person-id');
    if (this.checked) {
      state.show(id);
    } else {
      state.hide(id);
    }
  });

  $('.reduce').on('click', function() {
    var speed = state.getSpeed();
    if (speed > 1) {
      state.setSpeed(speed / 2);
    } else if (speed === 1) {
      state.setSpeed(0);
    } else if (speed === 0) {
      state.setSpeed(-1);
    } else {
      state.setSpeed(speed * 2);
    }
  });

  $('.increase').on('click', function() {
    var speed = state.getSpeed();
    if (speed >= 1) {
      state.setSpeed(speed * 2);
    } else if (speed === 0) {
      state.setSpeed(1);
    } else if (speed === -1) {
      state.setSpeed(0);
    } else {
      state.setSpeed(speed / 2);
    }
  });

  state.on('speedchange', function(val) {
    $('.speed').text('x' + val);
  });

  $('.speed').text('x' + state.clock.getSpeed());

  setInterval(function() {
    $real.text(util.formatTime(new Date()));
    $fake.text(util.formatTime(state.clock.getDate()));
  }, 100);

  world.start();
  document.body.appendChild(world.renderer.domElement);

});
