const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'http://127.0.0.1:5500/index.html';

    const startTime = new Date().getTime();
    await page.goto(url);
    const loadTime = new Date().getTime() - startTime;

    console.log(`Час завантаження сторінки: ${loadTime} мс`);

    await browser.close();
})();

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'http://127.0.0.1:5500/index.html';

    // Початок тестування
    console.log('Початок тестування після оптимізацій');

    const startTime = new Date().getTime();
    await page.goto(url);
    const loadTime = new Date().getTime() - startTime;

    console.log(`Час завантаження сторінки після оптимізацій: ${loadTime} мс`);

    // Завершення тестування
    console.log('Тестування завершено');

    await browser.close();
})();


// async function runPerformanceTest(url) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     console.log(`Початок тесту продуктивності для ${url}`);

//     const startTime = new Date().getTime();
//     await page.goto(url);
//     const loadTime = new Date().getTime() - startTime;

//     console.log(`Час завантаження сторінки: ${loadTime} мс`);

//     await browser.close();
// }

// Функція для періодичного виконання тестів продуктивності
// function performPeriodicTests(url, interval) {
//     console.log(`Розпочато періодичне тестування продуктивності для ${url} з інтервалом ${interval} мс`);

//     setInterval(async () => {
//         await runPerformanceTest(url);
//     }, interval);
// }

// // Запускаємо періодичні тести
// const websiteUrl = 'http://127.0.0.1:5500/index.html'; 
// const testInterval = 3600000; 

// performPeriodicTests(websiteUrl, testInterval);
