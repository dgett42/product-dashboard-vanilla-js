function fetchProductsThen() {
    fetch('https://www.course-api.com/javascript-store-products')
        .then(response => {
            if (!response.ok) throw new Error(`Network response was not ok (${response.status})`);
            return response.json();
        })
        .then(products => {
            if (!Array.isArray(products)) {
                console.warn('Unexpected response shape:', products);
                return;
            }
            products.forEach(product => {
                const name = product.name || (product.fields && product.fields.name) || 'Unnamed product';
                console.log(name);
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

async function fetchProductsAsync() {
    try {
        const response = await fetch('https://www.course-api.com/javascript-store-products');
        if (!response.ok) throw new Error(`Network response was not ok (${response.status})`);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        handleError(error);
    }
}

function displayProducts(products) {
    const container = document.querySelector('#product-container');
    if (!container) return;
    container.innerHTML = '';

    const list = Array.isArray(products) ? products : [];
    const count = Math.min(5, list.length);

    for (let i = 0; i < count; i++) {
        const prod = list[i];

        const name = prod.name || prod.fields?.name || 'Unnamed product';

        // try several common image shapes
        const imgSrc =
            (typeof prod.image === 'string' && prod.image) ||
            prod.image?.url ||
            prod.images?.[0] ||
            prod.fields?.image?.[0]?.url ||
            prod.fields?.image ||
            null;

        const rawPrice = prod.price ?? prod.fields?.price ?? null;
        let priceText = 'Price unavailable';
        if (typeof rawPrice === 'number') {
            // many APIs provide price in cents
            priceText = rawPrice > 1000 ? `$${(rawPrice / 100).toFixed(2)}` : `$${rawPrice}`;
        } else if (typeof rawPrice === 'string' && rawPrice.trim()) {
            priceText = rawPrice;
        }

        const card = document.createElement('div');
        card.className = 'product';

        if (imgSrc) {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = name;
            card.appendChild(img);
        }

        const title = document.createElement('h3');
        title.textContent = name;
        card.appendChild(title);

        const priceEl = document.createElement('p');
        priceEl.textContent = priceText;
        card.appendChild(priceEl);

        container.appendChild(card);
    }
}