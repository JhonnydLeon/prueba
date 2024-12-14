// Escuchar el evento submit del formulario
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir que se recargue la página

    // Obtener el número ingresado por el usuario
    const numero = document.getElementById('busqueda').value.trim();

    // Validar que el número no esté vacío
    if (!numero) {
        alert('Por favor, ingresa un número');
        return;
    }

    // Leer el archivo heroes.json
    fetch('./heroes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo heroes.json');
            }
            return response.json();
        })
        .then(data => {
            // Buscar el héroe por número
            const heroe = data.heroes.find(h => h.id === parseInt(numero));
            if (heroe) {
                mostrarHeroe(heroe); // Mostrar el héroe encontrado
            } else {
                document.getElementById('resultado').innerHTML = `<p>No se encontró el superhéroe con ID ${numero}</p>`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al cargar los datos');
        });
});

// Función para mostrar la información del héroe
function mostrarHeroe(heroe) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `
        <h2 class="hero-name">${heroe.name}</h2>
        <img src="./assets/img/${heroe.image}" alt="${heroe.name}" class="img-fluid mb-3">
        <p><strong class="hero-power">Poder:</strong> ${heroe.power}</p>
        <p><strong class="hero-alias">Alias:</strong> ${heroe.alias}</p>
    `;

    // Aplicar los estilos dinámicamente
    const heroName = document.querySelector('.hero-name');
    const heroPower = document.querySelector('.hero-power');
    const heroAlias = document.querySelector('.hero-alias');

    heroName.style.color = heroe.styles.nameColor;
    heroPower.style.color = heroe.styles.powerColor;
    heroAlias.style.color = heroe.styles.aliasColor;
    resultado.style.backgroundColor = heroe.styles.backgroundColor;
}
