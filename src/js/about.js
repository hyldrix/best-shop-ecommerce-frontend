import { Footer, HamburgerMenu, Header, ShoppingCart, SpecialOffers } from './main.js';
import { footerTemplate, headerTemplate, offerTemplate } from './templates.js';

class AboutPage {

    static async init() {



        Header.init(headerTemplate);
        Footer.init(footerTemplate);
        SpecialOffers.init(offerTemplate);

        ShoppingCart.renderCartQuantity();
                HamburgerMenu.init();
        


    }
}

AboutPage.init();



