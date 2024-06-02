const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://example.com');

    // Вимірювання часу завантаження сторінки
    const loadTime = await page.evaluate(() => {
        return window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    });

    // Вимірювання кількості запитів до сервера
    const requests = await page.evaluate(() => {
        return window.performance.getEntriesByType('resource').length;
    });

    // Збереження результатів
    console.log('Час завантаження сторінки: ' + loadTime + ' мс');
    console.log('Кількість запитів до сервера: ' + requests);

    await browser.close();
})();


async function runPerformanceTest() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // Відкриваємо веб-сторінку
        await page.goto('https://example.com', { waitUntil: 'load' });

        // Вимірюємо час завантаження сторінки
        const loadTime = await page.evaluate(() => {
            return window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        });

        // Вимірюємо кількість запитів до сервера
        const requests = await page.evaluate(() => {
            return window.performance.getEntriesByType('resource').length;
        });

        // Розмір сторінки
        const pageSize = (await page.content()).length;

        // Виводимо результати
        console.log('Час завантаження сторінки: ' + loadTime + ' мс');
        console.log('Кількість запитів до сервера: ' + requests);
        console.log('Розмір сторінки: ' + pageSize + ' байт');
    } catch (error) {
        console.error('Сталася помилка під час виконання тесту:', error);
    } finally {
        // Закриваємо браузер
        await browser.close();
    }
}

// Запускаємо тест
runPerformanceTest();