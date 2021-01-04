{
    async function test_gpio() {
        console.log('init pins');

        let pin_set1 = new esses.io.gpio.PinSet();
        let pin_set2 = new esses.io.gpio.PinSet();

        await pin_set1.init('/dev/gpiochip0', 'out', [17, 18, 27, 22]);
        await pin_set2.init('/dev/gpiochip0', 'out', [23, 24, 25, 4]);

        console.log('setting states 1 to 1');
        await pin_set1.setState([1, 1, 1, 1]);

        console.log('setting states 2 to 1');
        await pin_set2.setState([1, 1, 1, 1]);

	setTimeout(() => {
            console.log('setting states 1 to 0');
            pin_set1.setState([0, 0, 0, 0]);
        }, 1000);

        setTimeout(() => {
            console.log('setting states 2 to 0');
            pin_set2.setState([0, 0, 0, 0]);
        }, 2000);

    }

    test_gpio().then(() => {
        console.log('test_gpio done');
    }).catch((ex) => {
        console.error('test_gpio failed: %s', '' + ex);
    });
}