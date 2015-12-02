"use strict";

var Cylon = require("cylon");

var value = 0;
Cylon.robot({
  connections: {
    leapmotion: { adaptor: "leapmotion" },
    arduino: { adaptor: "firmata", port: "/dev/tty.usbmodem141411" }
  },

  devices: {
    led1: { driver: "led", pin: 5, connection: "arduino" },
    led2: { driver: "led", pin: 9, connection: "arduino" },
    //pin: { driver: 'direct-pin', pin: 'A5', connection: "arduino" },
    leapmotion: { driver: 'leapmotion' }
    
  },


  work: function(my) {
    my.leapmotion.on("hand", function(hand) {
     //console.log(hand.direction[0]);
    var rollRadians = hand.roll() * -1;

    value = 128 + (rollRadians * 128)
    if (value > 0 && value < 256)
    { 
      console.log(value);
      my.led1.brightness(value);
      my.led2.brightness(value);
    }

    });
  }
}).start();
