import { Footer, RenderEngine, ShoppingCart, Header, SpecialOffers, HamburgerMenu } from './main.js';
import { headerTemplate, footerTemplate, offerTemplate } from './templates.js';




 class Carousel {
    static addCarousel() {
        const carousel = document.querySelector('.carousel');
        const arrowButtons = document.querySelectorAll('.travel-slider-arrow');
        const fontSize = Number.parseInt(getComputedStyle(document.documentElement).fontSize);

        const firstCardWidth = document.querySelector('.card').offsetWidth;
        for (const arrow of arrowButtons) {
            arrow.addEventListener('click', () => {
                carousel.scrollLeft += arrow.id === 'left' ? -firstCardWidth - fontSize * 2.3 : firstCardWidth + fontSize * 2.3;
            });
        }
    }
}

class HomePage {

    static init() {

        Header.init(headerTemplate);
        Footer.init(footerTemplate);
        SpecialOffers.init(offerTemplate);
    
        let selectedProductsContainer = document.querySelector('.selected-products-container');
        let newProductsContainer = document.querySelector('.new-products-container');


        Carousel.addCarousel();


        RenderEngine.renderProducts(
            selectedProductsContainer,
            '/src/assets/data.json',
            product => product.blocks.includes('Selected Products'),
            true);

        RenderEngine.renderProducts(
            newProductsContainer,
            '/src/assets/data.json',
            product => product.blocks.includes('New Products Arrival'),
            false);

        ShoppingCart.renderCartQuantity();
        HamburgerMenu.init();
    }
}

HomePage.init();







