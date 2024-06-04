var startTime = performance.now();
window.addEventListener('load', function() {
    var loadTime = performance.now() - startTime;
    console.log('Час завантаження сторінки: ' + loadTime + ' мс');
});

var pageSize = document.documentElement.innerHTML.length; // Розмір HTML-коду сторінки
console.log('Розмір сторінки: ' + pageSize + ' байт');
