import * as five from "johnny-five";
// var five = require('johnny-five');
const board = new five.Board();
const ARDUINO_BUILTIN_LED_PIN = 5;

board.on('ready', () => {
     let led = new five.Led(ARDUINO_BUILTIN_LED_PIN);
     led.blink(1000);
     board.repl.inject({
        led: led
     });
});