{
    async function test_gpio() {
        console.log('init pins');
        let pin_set = await esses..io.gpio.PinSet.init('/dev/gpiochip0', 'out', [1, 2, 3, 4]);
        console.log('setting states to 1');
        await pin_set.setState([1, 1, 1, 1]);
        setTimeout(() => {
            console.log('setting states to 0');
            pin_set.setState([0, 0, 0, 0]);
        }, 1000);
    }

    test_gpio().then(() => {
        console.log('test_gpio done');
    }).catch((ex) => {
        console.error('test_gpio failed: %s', '' + ex);
    });
}