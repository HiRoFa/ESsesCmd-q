{
    // test a stepper motor
     async function test_stepper(){
        // load the Stepper class
        let Stepper = await import('https://raw.githubusercontent.com/HiRoFa/ESsesLib-q/main/modules/io/gpio/stepper.mes');
        // init a Stepper
        let myStepper = await Stepper.init('/dev/gpiochip0', 23, 24, 25, 4);
        // do 10 steps, forward, 2ms delay, HALF step sequence
        await myStepper.step(200, true, 2, Stepper.HALF_STEP);
        // rotate 90 degrees left, 2ms delay, DOUBLE_STEP sequence
        await myStepper.rotate_degrees(-90, 3, Stepper.DOUBLE_STEP);
        // rotate 3 revolutions forward, 2ms delay, SINGLE_STEP sequence
        await myStepper.rotate(3, true, 2, Stepper.SINGLE_STEP);
    }

    test_stepper().then(() => {
        console.log("test_stepper test done")
    });

    // leds = 17, 18, 27, 22;

    // led testing
    async function test_led(){
        // load the Led class
        let Led = await import('https://raw.githubusercontent.com/HiRoFa/ESsesLib-q/main/modules/io/gpio/led.mes');
        // init an Led
        let myLed = await Led.init('/dev/gpiochip0', 17);
        // blink for 5 seconds
        await myLed.blink(5);
    }

    test_led().then(() => {
        console.log("test_led test done")
    });

    // some raw pinset testing
    async function test_gpio() {
        console.log('init pins');

        let pin_set2 = new esses.io.gpio.PinSet();

        await pin_set2.init('/dev/gpiochip0', 'out', [23, 24, 25, 4]);


        console.log('setting states 2 to 1');
        await pin_set2.setState([1, 1, 1, 1]);

        console.log('running sequence');
	    await pin_set2.sequence([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], 2, 1000);

    }

    test_gpio().then(() => {
        console.log('test_gpio done');
    }).catch((ex) => {
        console.error('test_gpio failed: %s', '' + ex);
    });

}