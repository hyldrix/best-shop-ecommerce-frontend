import { bestSetTemplate } from './templates.js';

export class DataOperations {
    static async getData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let { data } = await response.json();

            return data || [];
        } catch (error) {
            console.error('Error fetching:', error);
        }


    };
}
export class RenderEngine {
    static async renderProducts(container, fetchUrl, filterCallback, addToCart) {
        let data = await DataOperations.getData(fetchUrl);

        if (!container || !Array.isArray(data)) {
            console.error('Invalid container or data');
            return;
        }

        data.filter(filterCallback).forEach(product => {
            container.appendChild(this.createProductCard(product, product.salesStatus, addToCart));
        });
    }

    static async renderRandomBestSets(container, fetchUrl, howMany) {

        let data = await DataOperations.getData(fetchUrl);
        if (!container || !Array.isArray(data)) {
            console.error('Invalid container or data');
            return;
        }

        let filteredData = data.filter((product) => {
            return product.name.toLowerCase().includes('set') || product.size === 'S-L' || product.size === 'S, M, XL';

        });

        let shuffled = [...filteredData];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        let bestSets = shuffled.slice(0, howMany);

        bestSets.forEach(product => {
            container.appendChild(this.createCatalogBestSet(product));
        });



    }

    static renderCatalogPage(container, data) {

        if (!container || !Array.isArray(data)) {
            console.error('Invalid container or data');
            return;
        }

        for (let product of data) {
            container.appendChild(this.createProductCard(product, product.salesStatus, true));
        };

    }

    static renderTemplate(container, element) {
        if (!container) {
            console.error('Invalid container');
            return;
        }

        container.innerHTML = '';
        container.innerHTML = element;
    };

    static createCatalogBestSet(product) {
        let anchorElement = document.createElement('a');
        let template = bestSetTemplate(product);
        anchorElement.innerHTML = template;
        anchorElement.href = '/src/html/product.html?id=' + product.id;
        return anchorElement;


    }

    static createProductCard(product, sale = false, cartButton = true) {

        if (!product.name || !product.price || !product.imageUrl || !product.price) {
            console.error('Invalid product data');
            return;
        }

        let productContainer = document.createElement('div');
        productContainer.classList.add('product-card');

        let hyperlink = document.createElement('a');
        hyperlink.href = '/src/html/product.html?id=' + product.id;


        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');

        const img = document.createElement('img');
        img.src = product.imageUrl;
        img.alt = product.name;

        imgContainer.appendChild(img);


        if (sale) {
            const saleMarker = document.createElement('div');
            saleMarker.classList.add('sale-marker');

            const saleSpan = document.createElement('span');
            saleSpan.textContent = 'Sale';

            saleMarker.appendChild(saleSpan);
            imgContainer.appendChild(saleMarker);
        }
        hyperlink.appendChild(imgContainer);
        productContainer.appendChild(hyperlink);

        const productInfoContainer = document.createElement('div');
        productInfoContainer.classList.add('product-info');

        const name = document.createElement('h5');
        name.classList.add('product-title');
        name.textContent = product.name;

        const productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.textContent = `${product.price} $`;

        productInfoContainer.appendChild(name);
        productInfoContainer.appendChild(productPrice);

        let viewLink = document.createElement('a');
        viewLink.classList.add('btn');


        if (cartButton) {

            viewLink.textContent = 'Add to Cart';
            viewLink.addEventListener('click', (e) => {
                e.preventDefault();
                ShoppingCart.addToCart(product, 1);
            });
        } else {
            viewLink.href = '/src/html/product.html?id=' + product.id;
            viewLink.textContent = 'View Product';

        }
        productInfoContainer.appendChild(viewLink);


        productContainer.appendChild(productInfoContainer);

        return productContainer;


    }
}
export class ShoppingCart {

    static #storagekey = 'cart';

    static getCart() {
        return JSON.parse(localStorage.getItem(this.#storagekey)) || [];
    }
    static addToCart(item, qty = 1) {


        let cart = this.getCart();

        console.log(localStorage.getItem(this.#storagekey) || '[]');


        if (!item?.name || !item?.price || !item?.size) {
            console.error('Invalid product data');
            return;
        }


        const existingItem = cart.find(i => i.name === item.name && i.size === item.size && i.color === item.color);

        if (existingItem) {
            existingItem.quantity += qty;
        } else {
            cart.push({
                id: item.id,
                name: item.name,
                size: item.size,
                price: item.price,
                color: item.color,
                imageUrl: item.imageUrl,
                quantity: qty
            });
        }

        let totalQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);
        this.renderCartQuantity(totalQuantity);

        localStorage.setItem(this.#storagekey, JSON.stringify(cart));
        console.log(localStorage.getItem(this.#storagekey) || '[]');


    }

    static async getItemPrice(id) {
        try {
            const response = await fetch('/src/assets/data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let { data } = await response.json();

            let product = data.find(i => i.id === id);

            if (!product) {
                console.error('Product not found');
                return;
            }

            return product.price;
        } catch (error) {
            console.error('Error fetching:', error);
        }
    }

    static getTotalQuantity() {
        return this.getCart().reduce((acc, curr) => acc + curr.quantity, 0);
    }

    static async renderCartQuantity(quantity) {


        setTimeout(() => {
            let container = document.querySelector('.cart-quantity');

            let totalQuantity = 0;

            if (!container) {
                console.error('Invalid container');
                return;
            }

            if (!quantity) {
                totalQuantity = this.getTotalQuantity();
            } else {
                totalQuantity = quantity;
            }


            if (totalQuantity && totalQuantity > 0) {
                container.style.display = 'flex';
                container.textContent = totalQuantity;
            } else {
                container.style.display = 'none';
            }
        }, 500);



    }

    static async renderMyCart() {
        let container = document.querySelector('#cart-items');

        let cart = this.getCart();
        if (!container) {
            return;
        }

        container.innerHTML = '';


        if (!cart.length) {
            container.innerHTML = '<tr class="nodata" ><td>Your cart is empty. Use the catalog to add new items.<td></tr>';

            return;
        }

        for (const item of cart) {

            let tableItem = await this.createTableItem(item);
            container.appendChild(tableItem);
        };

    }

    static async createTableItem(item) {

        let price = await this.getItemPrice(item.id);

        let tableItem = document.createElement('tr');
        tableItem.innerHTML = `
        <td><img src="${item.imageUrl}" alt="${item.name}"></td>
        <td>${item.name}</td>
        <td>$${price}</td>
        <td>
        <div class="qty-control"> 
        <button class="decrease">−</button>
        <input class="qty" type="number" value="${item.quantity}" min="1" max="10">
        <button class="increase">+</button>
        </div>
        </td>
        <td>$${Number(price) * Number(item.quantity)}</td>
        <td><a href=""><img src="/src/assets/delete.png" alt=""></a></td>
        `;

        let deleteButton = tableItem.querySelector('a');
        let qtyControls = tableItem.querySelector('.qty-control');

        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.deleteItem(item);
        });


        QuantityControls.init(qtyControls, item, true);





        return tableItem;

    }
    static modifyQuantity(item, operation, value) {
        let cart = this.getCart();


        cart.forEach(i => {
            if (i.name === item.name && i.size === item.size && i.color === item.color) {
                if (operation === 'increase') {
                    i.quantity++;
                } else if (operation === 'decrease' && i.quantity > 1) {
                    i.quantity--;

                }
                else if (operation === 'change' && value) {
                    i.quantity = value;
                }
            }
        }
        );
        this.saveCart(cart);
        this.renderMyCart();
        this.renderTotals();
        this.renderCartQuantity();

    }

    static renderTotals() {

        let cartTotals = document.querySelector('.cart-total');

        if (!cartTotals) {
            return;
        }

        let subTotal = cartTotals.querySelector('.subtotal');
        let discount = cartTotals.querySelector('.discount');
        let shipping = cartTotals.querySelector('.shipping');
        let total = cartTotals.querySelector('.total');

        let cart = this.getCart();

        if (!subTotal || !discount || !shipping || !total) {
            console.error('Missing cart total elements');
            return;
        }

        let subTotalPrice = cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
        let isDiscount = subTotalPrice >= 3000
            || cart.some(i => i.name.toLowerCase().includes('set'))
            || cart.some(i => i.size.includes('S-L') || i.size.includes('S, M, XL'));


        let discountAmount = isDiscount ? 0.1 * subTotalPrice : 0;
        let shippingCost = subTotalPrice > 0 ? 30 : 0;


        discount.parentElement.style.display = isDiscount ? 'flex' : 'none';


        subTotal.textContent = `$${subTotalPrice}`;
        discount.textContent = `$${discountAmount}`;
        shipping.textContent = `$${subTotalPrice > 0 ? 30 : 0}`;
        total.textContent = `$${subTotalPrice - discountAmount + shippingCost}`;







    }
    static deleteItem(item) {
        let cart = this.getCart();
        cart = cart.filter(i => !(i.name === item.name && i.size === item.size && i.color === item.color));
        this.saveCart(cart);
        this.renderMyCart();
        this.renderTotals();
        this.renderCartQuantity();
    }
    static clearCart() {
        localStorage.removeItem(this.#storagekey);
        this.renderCartQuantity();
        this.renderMyCart();
        this.renderTotals();


    }
    static saveCart(cart) {
        localStorage.setItem(this.#storagekey, JSON.stringify(cart));

    }

    static checkout() {


        this.clearCart();
        let cartTotal = document.querySelector('.cart-total');



        cartTotal.innerHTML = '<tr class="nodata" ><td>Thank you for your purchase. Your order has been placed.<td></tr>';



    }


    static init() {
        this.renderCartQuantity();
        this.renderMyCart();
        this.renderTotals();


    }

}

export class Header {

    static setActiveNavLink() {

        let navlinks = document.getElementsByClassName('nav-link');
        let pathname = window.location.pathname;

        for (let navLink of Array.from(navlinks)) {
            let currentLink = navLink.getAttribute('href');
            const regex = /[^/]+$/;
            const match = regex.exec(currentLink);
            if (match && pathname.includes(match[0])) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }

        }

    }


    static async init(template) {



        let headerContainer = document.querySelector('#header');
        headerContainer.innerHTML = template;

        setTimeout(() => {
            LoginModal.init();
        }, 0);

        this.setActiveNavLink();
    }
}
export class Footer {


    static async init(template) {



        let footerContainer = document.querySelector('#footer');
        footerContainer.innerHTML = template;


    }
}

export class SpecialOffers {


    static async init(template) {



        let footerContainer = document.querySelector('#offer');
        footerContainer.innerHTML = template;


    }
}


export class LoginModal {

    static init() {

        let modalContainer = document.querySelector('.modal-backdrop');

        if (!modalContainer) {
            console.error('Modal backdrop not found');
            return;
        }

        modalContainer.style.display = 'none';

        let closeBtn = modalContainer.querySelector('.closebtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modalContainer.style.display = 'none';
            });
        }

        if (loginToggle) {
            loginToggle.addEventListener('click', (e) => {
                e.preventDefault();
                modalContainer.style.display = 'block';
            });
        }

        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                modalContainer.style.display = 'none';
            }
        });

        let eyeToggle = document.querySelector('.eye-toggle');
        if (eyeToggle) {
            eyeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                let passwordInput = document.querySelector('#password');
                passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
                eyeToggle.classList.toggle('fa-eye-slash');
            });
        }


        let loginBtn = document.querySelector('.loginbtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                let form = document.querySelector('#login-form');
                console.log(form);
                let formData = new FormData(form);
                console.log(formData);
                this.validateForm(formData);


            });
        }


    }

    static isValidEmail(email) {
        if (typeof email !== 'string') return false;

        let regex = /^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@[\w]+(?:[.-][\w]+)*\.[\w]{2,}$/;

        let result = regex.test(email);

        return result;
    }



    static validateForm(formData) {

        let email = formData.get('email');
        let password = formData.get('password');
        console.log(password, email);

        let errorContainer = document.querySelector('.error-container');
        errorContainer.textContent = '';


        let errors = [];

        if (!this.isValidEmail(email)) {
            errors.push('Invalid email address');
        }
        if (password.length < 8) {
            errors.push('Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters');

        }
        if (errors.length > 0) {
            errorContainer.textContent = errors.join(', ');
            errorContainer.style.display = 'block';
        }
        else {


            let modalContainer = document.querySelector('.modal-backdrop');

            if (!modalContainer) {
                console.error('Modal backdrop not found');
                return;
            }
            errorContainer.textContent = '';
            errorContainer.style.display = 'none';
            modalContainer.style.display = 'none';

        }





    }
}

export class FeedbackForm {
    static init() {

        let form = document.querySelector('#contact-form');
        let submitFeedback = document.querySelector('.submit-feedback');


        if (!form || !submitFeedback) {
            console.error('Form or submit button not found');
            return;
        }


        submitFeedback.addEventListener('click', (e) => {
            e.preventDefault();
            let formData = new FormData(form);
            this.validateForm(formData);

        });


    }

    static isValidEmail(email) {
        if (typeof email !== 'string') return false;

        let regex = /^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@[\w]+(?:[.-][\w]+)*\.[\w]{2,}$/;

        let result = regex.test(email);

        return result;
    }


    static validateForm(formData) {

        let form = document.querySelector('#contact-form');

        let errorMsgContainer = document.querySelector('.success-error');
        errorMsgContainer.innerHTML = '';

        let name = formData.get('contact-name');
        let email = formData.get('contact-email');
        let message = formData.get('contact-message');
        let topic = formData.get('contact-topic');

        let errors = [];

        if (!name) {
            errors.push('Name is required');
        }
        if (!email) {
            errors.push('Email is required');
        } else if (!this.isValidEmail(email)) {
            errors.push('Invalid email format');
        }
        if (!message) {
            errors.push('Message is required');
        }
        if (!topic) {
            errors.push('Topic is required');
        }


        if (errors.length > 0) {
            errorMsgContainer.innerHTML = 'Error:<br>' + errors.join((', '));
            errorMsgContainer.classList.remove('success');
            errorMsgContainer.classList.add('error');

        } else {
            this.submitForm(formData);

            errorMsgContainer.innerHTML = 'Your message has been sent. We will get back to you shortly.';
            errorMsgContainer.classList.add('success');
            errorMsgContainer.classList.remove('error');



            form.reset();


        }

        setTimeout(() => {
            errorMsgContainer.classList.remove('error');
            errorMsgContainer.classList.remove('success');
            errorMsgContainer.classList.add('hidden');

            errorMsgContainer.innerHTML = '';


        }, 5000);



    }

    static submitForm(formData) {
        console.log('Form submitted:', formData);
    }

}

export class StarRating {
    static render(rating) {
        let starsHTML = '';

        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHTML += '<i class="fa fa-star"></i>';
            } else {
                starsHTML += '<i class="fa-regular fa-star"></i>';
            }
        }

        return `${starsHTML}`;
    }
}

export class QuantityControls {
    static init(controls, item, cart) {

        let increaseButton = controls.querySelector('.increase');
        let decreaseButton = controls.querySelector('.decrease');
        let input = controls.querySelector('.qty');


        if (controls && !cart) {
            increaseButton.addEventListener('click', (e) => {
                e.preventDefault();
                let input = controls.querySelector('.qty');
                let currentQuantity = parseInt(input.value);
                input.value = currentQuantity + 1;
            });
            decreaseButton.addEventListener('click', (e) => {
                e.preventDefault();
                let input = controls.querySelector('.qty');
                let currentQuantity = parseInt(input.value);
                if (currentQuantity > 1) {
                    input.value = currentQuantity - 1;
                }
            });
            input.addEventListener('change', () => {
                let currentQuantity = parseInt(input.value);
                if (isNaN(currentQuantity) || currentQuantity < 1) {
                    input.value = 1;
                }
            });


        }

        if (controls && cart) {


            increaseButton.addEventListener('click', (e) => {
                e.preventDefault();
                ShoppingCart.modifyQuantity(item, 'increase');
            });

            decreaseButton.addEventListener('click', (e) => {
                e.preventDefault();
                ShoppingCart.modifyQuantity(item, 'decrease');
            });

            input.addEventListener('change', () => {
                let currentQuantity = parseInt(input.value);
                if (isNaN(currentQuantity) || currentQuantity < 1) {
                    input.value = 1;
                }
                ShoppingCart.modifyQuantity(item, 'change', input.value);

            });

        }


    }
}

export class AdditionalInfoSubsections {


    static init(navLinksContainers, subsections) {

        let navLinkContainers = Array.from(navLinksContainers);
        let subsectionItems = Array.from(subsections);

        subsectionItems.forEach((subsection, index) => {
            if (index === 0) {
                subsection.classList.add('active');
            } else {
                subsection.classList.remove('active');
            }
        });

        if (navLinkContainers.length > 0) {
            navLinkContainers[0].classList.add('active');
        }

        for (let container of navLinkContainers) {
            container.addEventListener('click', (e) => {
                e.preventDefault();

                let link = container.querySelector('a');

                navLinkContainers.forEach(navContainer => navContainer.classList.remove('active'));

                container.classList.add('active');

                let target = link.getAttribute('data-tab');

                subsectionItems.forEach(subsection => {
                    if (subsection.classList.contains(target)) {
                        subsection.classList.add('active');
                    } else {
                        subsection.classList.remove('active');
                    }
                });
            });
        }
    }
}

export class ReviewForm {
    static init(form) {

        let submitButton = form.querySelector('.submit');
        console.log(form, submitButton);

        if (!form || !submitButton) {
            console.error('Form or submit button not found');
            return;
        }

        submitButton.addEventListener('click', (e) => {
            e.preventDefault();

            let formData = new FormData(form);

            this.validateForm(formData);
        });
    }

    static validateForm(formData) {
        let name = formData.get('name');
        let email = formData.get('email');
        let review = formData.get('review');
        let rating = formData.get('rating');

        let errors = [];

        if (!name) {
            errors.push('Name is required');
        }
        if (!email) {
            errors.push('Email is required');
        } else if (!this.isValidEmail(email)) {
            errors.push('Invalid email format');
        }
        if (!review) {
            errors.push('Review is required');
        }
        if (!rating) {
            errors.push('Rating is required');
        }

        console.log(errors);
        let form = document.querySelector('#review-form');
        let errorSuccessContainer = document.querySelector('#success-error');
        if (errors.length > 0) {
            errorSuccessContainer.classList.add('error');
            errorSuccessContainer.classList.remove('hidden');
            errorSuccessContainer.innerHTML = 'You have the following errors:<br>' + errors.join((', '));;
        } else {
            this.submitReview(formData);
            errorSuccessContainer.classList.remove('hidden');
            errorSuccessContainer.classList.add('success');

            errorSuccessContainer.innerHTML = 'Thank you for your review. Your form was submitted';;
            form.reset();
        }
        setTimeout(() => {
            errorSuccessContainer.classList.remove('error', 'success');
            errorSuccessContainer.classList.add('hidden');
        }, 5000);

    }

    static isValidEmail(email) {
        if (typeof email !== 'string') return false;
        let regex = /^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@[\w]+(?:[.-][\w]+)*\.[\w]{2,}$/;
        return regex.test(email);
    }

    static submitReview(formData) {
        console.log('Review submitted:', Object.fromEntries(formData));
    }
}

export class SearchProducts {
    static init() {

        let searchInput = document.querySelector('#search');

        let magnifyingGlass = document.querySelector('.fa-magnifying-glass');

        magnifyingGlass.addEventListener('click', () => {

            searchInput.focus();
        });


        searchInput.addEventListener('keypress', (e) => {

            if (e.key === 'Enter' || e.keyCode === 13) {
                e.preventDefault();


                let searchTerm = searchInput.value.trim();

                if (searchTerm) {
                    this.searchProducts(searchTerm);
                }
            }
        });
    }
    static async searchProducts(input) {

        let data = await DataOperations.getData('/src/assets/data.json');

        let foundProduct = data.find(product => product.name.toLowerCase().includes(input.toLowerCase()));

        let popUp = document.querySelector('.popup');


        if (foundProduct) {

            window.location.href = `/src/html/product.html?id=${foundProduct.id}`;
        } else {
            popUp.classList.remove('hidden');

            setTimeout(() => {
                popUp.classList.add('hidden');
            }, 3000);

        }



    }
}

export class DropdownMenus {
    static init() {



        const dropdowns = document.querySelectorAll('.custom-filter-dropdown');

        dropdowns.forEach(dropdown => {
            const container = dropdown.querySelector('.dropdown-container');
            const trigger = dropdown.querySelector('.dropdown-trigger');
            const hiddenInput = dropdown.querySelector('input[type="hidden"]');
            const options = dropdown.querySelectorAll('.dropdown-list li');

            options.forEach(option => {
                option.addEventListener('click', () => {
                    const value = option.getAttribute('data-value');
                    console.log(value);

                    trigger.innerText = option.innerText;
                    hiddenInput.value = value;

                    options.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');

                    if (value === '') {
                        container.classList.remove('filter-active');
                    } else {
                        container.classList.add('filter-active');
                    }

                    console.log(`Filter [${hiddenInput.id}] set to: ${value}`);
                });
            });
        });

    }

    static reset() {


        const dropdowns = document.querySelectorAll('.custom-filter-dropdown');
        dropdowns.forEach(dropdown => {
            const container = dropdown.querySelector('.dropdown-container');
            const trigger = dropdown.querySelector('.dropdown-trigger');
            const options = dropdown.querySelectorAll('.dropdown-list li');
            let salesStatusCheckbox = document.querySelector('#salesStatus');

            trigger.innerHTML = 'Choose option <i class="fa-solid fa-chevron-down dropdown-arrow" ></i>';

            options.forEach(option => {

                if (option['data-value'] !== '') {
                    option.classList.remove('selected');
                }
                else {

                    option.classList.add('selected');
                    container.classList.remove('filter-active');

                }
            });

            container.classList.remove('filter-active');
            salesStatusCheckbox.checked = false;
        });

    };
}

export class CatalogButtons {

    static init() {
        const openButton = document.querySelector('.openup');
        const filterPanel = document.querySelector('.filter-subsection');
        const [clearButton, hideButton] = Array.from(document.querySelectorAll('.button-row a'));






        openButton.addEventListener('click', () => {
            filterPanel.classList.remove('hidden');
            openButton.classList.add('hidden');
        });

        clearButton.addEventListener('click', () => {
            CatalogButtons.clearFilters();
        });
        hideButton.addEventListener('click', () => {
            filterPanel.classList.add('hidden');
            openButton.classList.remove('hidden');
        });

    }
    static clearFilters() {

        let hiddenInputs = document.querySelectorAll('input[type="hidden"]');
        hiddenInputs.forEach(input => {
            input.value = '';
        });
        DropdownMenus.reset();
    }



}

export class CatalogOperations {

    static cardsPerPage = 12;

    static getFilters() {
        const filters = {};
        const dropdowns = document.querySelectorAll('.custom-filter-dropdown');
        dropdowns.forEach(dropdown => {
            const inputField = dropdown.querySelector('input[type="hidden"]');
            const value = inputField.value;


            filters[inputField.id] = value;

        });
        let saleInput = document.querySelector('#salesStatus');
        if (saleInput.checked) {
            filters.salesStatus = true;
        } else {
            filters.salesStatus = false;
        }

        return filters;
    }

    static applyFilters(data, filters) {


        let filteredData = data;
        let counter = 0;

        for (let filter in filters) {
            if (filters[filter] === '') continue;

            filteredData = filteredData.filter(product => product[filter] === filters[filter]);
            counter++;

        }
        if (counter === 0) {
            filteredData = data;
        }
        return filteredData;
    }




    static sortProducts(data) {
        let sortingMethod = document.querySelector('#sort-by').value;

        switch (sortingMethod) {
            case 'name-asc':
                return data.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return data.sort((a, b) => b.name.localeCompare(a.name));
            case 'price-asc':
                return data.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return data.sort((a, b) => b.price - a.price);
            case 'popularity':
                return data.sort((a, b) => b.popularity - a.popularity);
            case '':
            default:
                return data;
        }
    }


    static loadPage(data, page) {

        let productsContainer = document.querySelector('.catalog-products-container');
        productsContainer.innerHTML = '';

        let startIndex = (page - 1) * this.cardsPerPage;

        let endIndex = startIndex + this.cardsPerPage;
        if (endIndex > data.length) {
            endIndex = data.length;
        }

        let currentProductsSpan = document.querySelector('.current-pages');
        let outOfSpan = document.querySelector('.outof');
        currentProductsSpan.innerText = `${startIndex + 1} - ${endIndex}`;
        outOfSpan.innerText = `${data.length} Results`;
        RenderEngine.renderCatalogPage(productsContainer, data.slice(startIndex, endIndex));



    }

    static renderPageButtons(data) {

        let pagesAmount = Math.ceil(data.length / this.cardsPerPage);
        let pageButtonContainer = document.querySelector('.page-btn-container');

        pageButtonContainer.innerHTML = '';


        for (let i = 1; i <= pagesAmount; i++) {

            let pageButton = document.createElement('a');
            pageButton.innerText = i;
            pageButton.classList.add('btn', 'pagination');
            if (i === 1) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {

                let paginationButtons = Array.from(document.querySelectorAll('.pagination'));
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                pageButton.classList.add('active');

                this.loadPage(data, i);
                this.updateNavigationButtons(i, pagesAmount);

            });

            pageButtonContainer.appendChild(pageButton);

        }

        this.updateNavigationButtons(1, pagesAmount);
        this.initNavigationButtons(data, pagesAmount);

    }

    static updateNavigationButtons(currentPage, totalPages) {
        let prevButton = document.querySelector('.btn.pagination.prev');
        let nextButton = document.querySelector('.btn.pagination.next');

        if (!prevButton || !nextButton) {
            console.error('Navigation buttons not found');
            return;
        }

        if (currentPage === 1) {
            prevButton.style.visibility = 'hidden';
            console.log('Prev button hidden');
        } else {
            prevButton.style.visibility = 'visible';

        }

        if (currentPage === totalPages) {
            nextButton.style.visibility = 'hidden';
        } else {
            nextButton.style.visibility = 'visible';
        }
    }

    static initNavigationButtons(data, totalPages) {
        let prevButton = document.querySelector('.btn.pagination.prev');
        let nextButton = document.querySelector('.btn.pagination.next');

        if (!prevButton || !nextButton) {
            console.error('Navigation buttons not found');
            return;
        }

        let newPrevButton = prevButton.cloneNode(true);
        let newNextButton = nextButton.cloneNode(true);
        prevButton.parentNode.replaceChild(newPrevButton, prevButton);
        nextButton.parentNode.replaceChild(newNextButton, nextButton);

        newPrevButton.addEventListener('click', (e) => {
            e.preventDefault();
            let currentPage = this.getCurrentPage();

            if (currentPage > 1) {
                let newPage = currentPage - 1;
                this.navigateToPage(data, newPage, totalPages);
            }
        });

        newNextButton.addEventListener('click', (e) => {
            e.preventDefault();
            let currentPage = this.getCurrentPage();

            if (currentPage < totalPages) {
                let newPage = currentPage + 1;
                this.navigateToPage(data, newPage, totalPages);
            }
        });
    }

    static getCurrentPage() {
        let activeButton = document.querySelector('.page-btn-container .btn.pagination.active');
        return activeButton ? parseInt(activeButton.innerText) : 1;
    }

    static navigateToPage(data, pageNumber, totalPages) {
        let paginationButtons = Array.from(document.querySelectorAll('.page-btn-container .btn.pagination'));
        paginationButtons.forEach(btn => btn.classList.remove('active'));

        let targetButton = paginationButtons[pageNumber - 1];
        if (targetButton) {
            targetButton.classList.add('active');
        }

        this.loadPage(data, pageNumber);
        this.updateNavigationButtons(pageNumber, totalPages);

    }


}


