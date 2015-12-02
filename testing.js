"use strict";

var Cylon = require("cylon");
var TURN_TRESHOLD = 0.2,
    TURN_SPEED_FACTOR = 2.0;

var handStartPosition = [],
    handStartDirection = [];

var handWasClosedInLastFrame = false;
var value = 0;
Cylon.robot({
  connections: {
    leapmotion: { adaptor: "leapmotion" },
    arduino: { adaptor: "firmata", port: "/dev/tty.usbmodem141411" }
  },

  devices: {
    led: { driver: "led", pin: 5, connection: "arduino" },
    //pin: { driver: 'direct-pin', pin: 'A5', connection: "arduino" },
    leapmotion: { driver: 'leapmotion' }
    
  },


  work: function(my) {
    my.leapmotion.on("hand", function(hand) {
     //console.log(hand.direction[0]); 
      //var signal, value;
var rollRadians = hand.roll() * -1;
//console.log(rollRadians);

/*if (rollRadians < 0)
{
  value = 128 - (Math.abs(rollRadians) * 128)
} else
{
  value = 128 + (Math.abs(rollRadians) * 128)
}*/

 value = 128 + (rollRadians * 128)
 if (value > 0 && value < 256)
{ 
  console.log(value);
  my.led.brightness(value);
}
/*      var handOpen = !!hand.fingers.filter(function(f) {
        return f.extended;
      }).length;

      if (handOpen) {
        if (handWasClosedInLastFrame) {
          handStartPosition = hand.palmPosition;
          handStartDirection = hand.direction;
        }
        
       var horizontal = Math.abs(handStartDirection[0] - hand.direction[0]),
            vertical = Math.abs(hand.palmPosition[1] - handStartPosition[1]);

        // TURNS
        if (horizontal > TURN_TRESHOLD) {
          signal = handStartDirection[0] - hand.direction[0];
          value = (horizontal - TURN_TRESHOLD) * TURN_SPEED_FACTOR;
 
          //console.log("Signal " + signal);
          if (signal > 0) {
             console.log(value);
             //value = 128 + (Math.abs(value) * 256);
             //console.log(value);
             if (value > 0)
             {
                //my.led.brightness(value);
             }
          }
           else
          if (signal < 0) {
            //console.log(value);
            //value = 128 - (Math.abs(value) * 256) ;
            //console.log(value);
            // my.led.brightness(value);
          }
        }
      }
        handWasClosedInLastFrame = !handOpen;
    
    */
      /*if (frame.hands.length > 0) {
        //console.log(frame.hands[0].toString())
        my.led.brightness(200);
        //my.pin.analogWrite(200);
      } else {
        my.led.brightness(0);
      }*/
    });
  }
}).start();
