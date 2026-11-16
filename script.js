// ====== DETECCIÓN DE ORIENTACIÓN ======
function aplicarFondo() {
    const esHorizontal = window.matchMedia('(orientation: landscape)').matches;
    const ruta = esHorizontal ? 'img/interfaz_horizontal.jpg' : 'img/interfaz_vertical.jpg';
    document.body.style.backgroundImage = "url('" + ruta + "')";
}
aplicarFondo();
window.addEventListener('resize', aplicarFondo);
if (window.matchMedia('(orientation: landscape)').addEventListener) {
    window.matchMedia('(orientation: landscape)').addEventListener('change', aplicarFondo);
}

// ====== 2 SOBRES DIARIOS ======
const hoy = new Date().toDateString();
const datos = JSON.parse(localStorage.getItem('albumDatos') || '{}');
if (datos.ultimaFecha !== hoy) {
    datos.sobresHoy = 2;
    datos.ultimaFecha = hoy;
    localStorage.setItem('albumDatos', JSON.stringify(datos));
}
const contadorEl = document.getElementById('sobresDisponibles');
if (contadorEl) {
    contadorEl.textContent = datos.sobresHoy + ' sobres hoy';
}
