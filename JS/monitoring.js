window.addEventListener('load', function () {
    var performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance

    if (performance) {
        var timing = performance.timing
        var loadTime = timing.loadEventEnd - timing.navigationStart

        var requests = performance.getEntriesByType('resource').length

        var pageSize = document.documentElement.outerHTML.length

        console.log('Час завантаження сторінки: ' + loadTime + ' мс')
        console.log('Кількість запитів до сервера: ' + requests)
        console.log('Розмір сторінки: ' + pageSize + ' байт')
    } else {
        console.log('API Performance Timing не підтримується в цьому браузері.')
    }
})


