document.addEventListener('DOMContentLoaded', () => {
    
    // Sticky Header Logic
    const header = document.getElementById('header');
    const headerOffset = header.offsetTop;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > headerOffset + 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Product Data Mock
    const products = [
        { id: 1, title: "Taladro Percutor 1/2", category: "Herramientas Eléctricas", price: "$45.00", tag: "mas-vendidos", icon: "fa-hammer" },
        { id: 2, title: "Bombillo LED 12W", category: "Iluminación", price: "$2.50", tag: "nuevos", icon: "fa-lightbulb" },
        { id: 3, title: "Cerradura de Seguridad", category: "Cerrajería", price: "$18.00", tag: "destacados", icon: "fa-lock" },
        { id: 4, title: "Pintura Caucho Blanco", category: "Pintura", price: "$22.00", tag: "mas-vendidos", icon: "fa-paint-roller" },
        { id: 5, title: "Cinta Métrica 5m", category: "Herramientas Manuales", price: "$4.00", tag: "nuevos", icon: "fa-ruler" },
        { id: 6, title: "Tubería PVC 1/2", category: "Plomería", price: "$3.00", tag: "destacados", icon: "fa-wrench" },
        { id: 7, title: "Juego de Destornilladores", category: "Herramientas Manuales", price: "$12.00", tag: "mas-vendidos", icon: "fa-screwdriver" },
        { id: 8, title: "Cable THW #12", category: "Electricidad", price: "$40.00", tag: "destacados", icon: "fa-bolt" }
    ];

    const productGrid = document.getElementById('product-grid');

    // Function to render products
    const renderProducts = (filterTag) => {
        productGrid.innerHTML = ''; // Clear current
        
        let filteredProducts = products;
        if (filterTag !== 'todos') {
            filteredProducts = products.filter(p => p.tag === filterTag);
            // Si hay pocos, mostramos algunos por defecto para rellenar
            if(filteredProducts.length < 4) {
                 filteredProducts = [...filteredProducts, ...products.filter(p => p.tag !== filterTag).slice(0, 4 - filteredProducts.length)];
            }
        }

        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image">
                    <i class="fas ${product.icon}"></i>
                </div>
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${product.price}</div>
                <div class="product-actions">
                    <button class="action-btn" title="Añadir a lista de deseos"><i class="far fa-heart"></i></button>
                    <button class="action-btn" title="Vista Rápida"><i class="far fa-eye"></i></button>
                    <button class="action-btn" title="Añadir al Carrito"><i class="fas fa-shopping-cart"></i></button>
                </div>
            `;
            productGrid.appendChild(card);
        });
    };

    // Initial render (Nuevos)
    renderProducts('nuevos');

    // Tab interaction
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            e.target.classList.add('active');
            // Render specific products
            const targetTab = e.target.getAttribute('data-tab');
            renderProducts(targetTab);
        });
    });

});
