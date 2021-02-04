async function test(){
    let servoMod = await import('https://raw.githubusercontent.com/HiRoFa/ESsesLib-q/main/modules/io/gpio/servo.mes');

    let duration = 110;
    let left = 10;
    let neutral = 50;
    let right = 90;

    let servo = await servoMod.Servo.init('/dev/gpiochip0', 12, duration, left, neutral, right);

    servo.softPwm(20, 1);

    setTimeout(() => {
	servo.softPwm(20,2);    
    }, 2000);

    setTimeout(() => {
        console.log("going off");
        servo.off();
    }, 4000);

};

console.log("starting");
test().then(() => {
    console.log("done");
});
console.log("started");

