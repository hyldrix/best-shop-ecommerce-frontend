import { Footer, HamburgerMenu, Header, ShoppingCart } from './main.js';
import { footerTemplate, headerTemplate } from './templates.js';

class CartPage {
    static async init() {
        await Header.init(headerTemplate);
        await Footer.init(footerTemplate);

        // Now select elements after Header is rendered
        const clearCartButton = document.querySelector('.clear');
        const checkoutButton = document.querySelector('.checkout');

        if (clearCartButton) {
            clearCartButton.addEventListener('click', (e) => {
                e.preventDefault();
                ShoppingCart.clearCart();
            });
        }

        if (checkoutButton) {
            checkoutButton.addEventListener('click', (e) => {
                e.preventDefault();
                ShoppingCart.checkout();
            });
        }

        ShoppingCart.init();
        HamburgerMenu.init();

    }
}

CartPage.init();
