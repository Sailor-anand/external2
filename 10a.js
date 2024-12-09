const webdriver = require('selenium-webdriver');
const assert = require('assert');
const driver = new webdriver.Builder().forBrowser('chrome').build();


async function runTest() {
    try {
        await driver.get('file://' + __dirname + '/index.html');
        const num1 = await driver.findElement(webdriver.By.id('num1'));
        await num1.sendKeys('50');
        const num2 = await driver.findElement(webdriver.By.id('num2'));
        await num2.sendKeys('10');
        const addButton = await driver.findElement(webdriver.By.id('add'));
        await addButton.click();
        const result = await driver.findElement(webdriver.By.id('result'));
        const text = await result.getText();
        assert.strictEqual(text, '60', 'Sum calculation is incorrect');
        console.log('Test passed: Sum is correct');
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        console.log('Press any key to exit...');
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.on('data', async () => {
            await driver.quit();
            process.exit(0);
        });
    }
}

runTest();
