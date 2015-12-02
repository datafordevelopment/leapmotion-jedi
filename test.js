"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    leapmotion: { adaptor: "leapmotion" },
    arduino: { adaptor: "firmata", port: "/dev/tty.usbmodem141411" }
  },

  devices: {
    led: { driver: "led", pin: 5, connection: "arduino" },
    leapmotion: { driver: 'leapmotion' }
    
  },

  work: function(my) {
    my.leapmotion.on("frame", function(frame) {
      if (frame.hands.length > 0) {
        my.led.turnOn();
      } else {
        my.led.turnOff();
      }
    });
  }
}).start();