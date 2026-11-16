// ====== DETECCIÓN DE ORIENTACIÓN ======
// Cambia el fondo según si la pantalla está acostada o de pie.
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
// Cuenta cuántos sobres le quedan al usuario hoy.
const hoy = new Date().toDateString();
const datos = JSON.parse(localStorage.getItem('albumDatos') || '{}');
if (datos.ultimaFecha !== hoy) {
    datos.sobresHoy = 2;
    datos.ultimaFecha = hoy;
    localStorage.setItem('albumDatos', JSON.stringify(datos));
}
document.getElementById('sobresDisponibles').textContent = datos.sobresHoy + ' sobres disponibles hoy';
