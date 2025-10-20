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