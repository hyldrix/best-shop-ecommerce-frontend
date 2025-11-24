import { FeedbackForm, Footer, HamburgerMenu, Header, ShoppingCart } from './main.js';
import { footerTemplate, headerTemplate } from './templates.js';

class ContactPage {

    static async init() {

       

        Header.init(headerTemplate);
        Footer.init(footerTemplate);



        ShoppingCart.renderCartQuantity();



        ShoppingCart.renderCartQuantity();

        FeedbackForm.init();
        HamburgerMenu.init();

    }
}

ContactPage.init();