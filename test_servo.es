async function test(){
    let servoMod = await import('https://raw.githubusercontent.com/HiRoFa/ESsesLib-q/main/modules/io/gpio/servo.mes');

    let duration = 100;
    let left = 10;
    let neutral = 50;
    let right = 90;

    let servo = await servoMod.Servo.init('/dev/gpiochip0', 12, duration, left, neutral, right);

    servo.softPwm(100, 50);

    setTimeout(() => {
        console.log("going off");
        servo.off();
    }, 2000);

};

console.log("starting");
test().then(() => {
    console.log("done");
});
console.log("started");

