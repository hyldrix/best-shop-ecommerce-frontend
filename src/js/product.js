import { additionalInformationTemplate, footerTemplate, headerTemplate, productPageTemplate } from './templates.js';
import { AdditionalInfoSubsections, DataOperations, Footer, Header, QuantityControls, RenderEngine, ReviewForm, ShoppingCart } from './main.js';

class ProductPage {
    static async init() {
        await Header.init(headerTemplate);
        await Footer.init(footerTemplate);

        let youMayContainer = document.querySelector('.you-may-container');

        const randomIndexes = new Set();

        const data = await DataOperations.getData('/src/assets/data.json');

        let params = new URLSearchParams(document.location.search);
        let pageId = params.get('id');

        this.loadProductInfo(pageId, data);

        while (randomIndexes.size < 4 && randomIndexes.size < data.length) {
            randomIndexes.add(Math.floor(Math.random() * data.length));
        }

        let randomProductsCallback = (product, index) => {

            return randomIndexes.has(index);

        };


        RenderEngine.renderProducts(
            youMayContainer,
            '/src/assets/data.json',
            randomProductsCallback,
            true);

        ShoppingCart.renderCartQuantity();


    }

    static loadProductInfo(pageId, data) {
        let productContainer = document.querySelector('.product-info');
        let additionalInfoContainer = document.querySelector('.additional-info');


        if (!productContainer) {
            console.error('Product container not found');
            return;
        }

        if (!additionalInfoContainer) {
            console.error('Additional info container not found');
            return;
        }


        let product = data.find(i => i.id === pageId);


        if (!product) {
            let div = document.createElement('div');
            div.classList.add('product-error');
            div.textContent = 'Product not found';
            console.error('Product not found');
            productContainer.appendChild(div);
            return;
        }



        productContainer.innerHTML = productPageTemplate(product);
        additionalInfoContainer.innerHTML = additionalInformationTemplate(product);

        let qtyControls = document.querySelector('.qty-control');

        QuantityControls.init(qtyControls);
        ShoppingCart.init();

        let addToCartButton = document.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', (e) => {
            e.preventDefault();
            let input = document.querySelector('.qty');
            let quantity = parseInt(input.value);
            let dropdownForm = document.querySelector('.dropdown-form');

            let formData = new FormData(dropdownForm);

            let size = formData.get('size');
            let color = formData.get('color');
            let category = formData.get('category');
            let value = parseInt(formData.get('qty'));

            console.log(size, color);

            const allFieldsSelected = size && color && category && value;

            if (!allFieldsSelected) {
                alert('Please select size, color, category, and quantity');
                return;
            }

            let readyCartProduct = {
                "id": product.id,
                "name": product.name,
                "size": size,
                "price": 240,
                "color": color,
                "imageUrl": "/src/assets/catalog-suitcases/image4.png",
            };



            if (quantity > 0) {
                ShoppingCart.addToCart(readyCartProduct, value);
            }
        }
        );

        let navLinksContainers = document.querySelectorAll('.toggle-menu .tab');
        let subsectionContainers = document.querySelectorAll('.subsection');
        AdditionalInfoSubsections.init(navLinksContainers, subsectionContainers);

        let reviewForm = document.querySelector('#review-form');
        ReviewForm.init(reviewForm);

















    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ProductPage.init());
} else {
    ProductPage.init();
}
