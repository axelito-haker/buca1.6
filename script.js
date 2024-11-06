// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Función para hacer la tabla responsiva
    const table = document.querySelector('table');
    const headers = Array.from(table.querySelectorAll('th'));
    const rows = Array.from(table.querySelectorAll('tr'));

    // Añadir efecto de hover a las imágenes
    const images = document.querySelectorAll('td img');
    images.forEach(img => {
        img.addEventListener('mouseover', function() {
            this.style.cursor = 'pointer';
        });

        img.addEventListener('click', function() {
            // Crear overlay para vista previa de imagen
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '1000';

            // Crear imagen ampliada
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.style.maxWidth = '90%';
            enlargedImg.style.maxHeight = '90%';
            enlargedImg.style.objectFit = 'contain';
            enlargedImg.style.border = '3px solid white';
            enlargedImg.style.borderRadius = '5px';

            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);

            // Cerrar overlay al hacer click
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
        });
    });

    // Función para búsqueda en la tabla
    function createSearchInput() {
        const searchContainer = document.createElement('div');
        searchContainer.style.margin = '1rem 0';
        searchContainer.style.textAlign = 'center';

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar término...';
        searchInput.style.padding = '0.5rem';
        searchInput.style.width = '100%';
        searchInput.style.maxWidth = '300px';
        searchInput.style.borderRadius = '5px';
        searchInput.style.border = '1px solid #ddd';

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            rows.slice(1).forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });

        searchContainer.appendChild(searchInput);
        table.parentNode.insertBefore(searchContainer, table);
    }

    createSearchInput();

    // Ajustar footer al scroll
    const footer = document.querySelector('.footer');
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const windowHeight = window.innerHeight;
                const documentHeight = document.documentElement.scrollHeight;
                const scrollTop = window.scrollY;

                if (documentHeight - (scrollTop + windowHeight) <= 100) {
                    footer.style.position = 'relative';
                } else {
                    footer.style.position = 'fixed';
                }
                ticking = false;
            });
            ticking = true;
        }
    });
});