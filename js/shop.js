let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartPopup = document.getElementById('cart-popup');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');
    const productList = document.getElementById('product-list');
    const sortSelect = document.getElementById('sort');
    const purchaseButton = document.getElementById('purchase-button');
    const purchaseMessage = document.getElementById('purchase-message');

    // Добавление товара в корзину
    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const product = e.target.closest('.product');
            const productId = product.dataset.id;
            const productPrice = parseInt(product.dataset.price);
            const productName = product.querySelector('h3').textContent;

            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }
            updateCart();
        }
    });

    // Обновление корзины
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        let totalQuantity = 0; // Общее количество товаров
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} (${item.quantity} шт.) - ${item.price * item.quantity} ₽`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Удалить';
            removeButton.addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem.id !== item.id);
                updateCart();
            });
            li.appendChild(removeButton);

            const incrementButton = document.createElement('button');
            incrementButton.textContent = '+';
            incrementButton.addEventListener('click', () => {
                item.quantity += 1;
                updateCart();
            });
            li.appendChild(incrementButton);

            const decrementButton = document.createElement('button');
            decrementButton.textContent = '-';
            decrementButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    updateCart();
                }
            });
            li.appendChild(decrementButton);

            cartItems.appendChild(li);
            total += item.price * item.quantity;
            totalQuantity += item.quantity; // Увеличиваем общее количество товаров
        });

        totalPrice.textContent = total;
        cartCount.textContent = totalQuantity; // Отображаем общее количество товаров
    }

    // Очистка корзины
    document.getElementById('clear-cart').addEventListener('click', () => {
        cart = [];
        updateCart();
    });

    // Покупка товаров
    purchaseButton.addEventListener('click', () => {
        if (cart.length > 0) {
            cart = [];
            updateCart();
            purchaseMessage.style.display = 'block';
        }
    });

    // Сортировка товаров по цене
    sortSelect.addEventListener('change', () => {
        const products = Array.from(productList.children);
        if (sortSelect.value === 'price-asc') {
            products.sort((a, b) => a.dataset.price - b.dataset.price);
        } else if (sortSelect.value === 'price-desc') {
            products.sort((a, b) => b.dataset.price - a.dataset.price);
        }
        productList.innerHTML = '';
        products.forEach(product => productList.appendChild(product));
    });

    // Показываем корзину при наведении на значок
    cartIcon.addEventListener('mouseenter', () => {
        cartPopup.style.display = 'block';
    });

    // Скрываем корзину, когда мышь уходит с области значка или самой корзины
    cartIcon.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!cartPopup.matches(':hover')) {
                cartPopup.style.display = 'none';
            }
        }, 100);
    });

    cartPopup.addEventListener('mouseleave', () => {
        cartPopup.style.display = 'none';
    });
});
