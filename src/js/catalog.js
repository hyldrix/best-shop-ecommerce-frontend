import { CatalogButtons, CatalogOperations, DataOperations, DropdownMenus, Footer, HamburgerMenu, Header, RenderEngine, SearchProducts, ShoppingCart } from './main.js';
import { footerTemplate, headerTemplate } from './templates.js';

class CatalogPage {

    static async init() {



        Header.init(headerTemplate);
        Footer.init(footerTemplate);

        let productContainer = document.querySelector('.product-container');


        await RenderEngine.renderRandomBestSets(
            productContainer,
            '/src/assets/data.json',
            5
        );



        DropdownMenus.init();
        CatalogButtons.init();
        SearchProducts.init();

        ShoppingCart.renderCartQuantity();

        let data = await DataOperations.getData('/src/assets/data.json');

        let filters = CatalogOperations.getFilters();
        let filteredData = CatalogOperations.applyFilters(data, filters);
        let sortedData = CatalogOperations.sortProducts(filteredData);

        CatalogOperations.loadPage(sortedData, 1);
        CatalogOperations.renderPageButtons(sortedData);

        document.addEventListener('catalogFiltersChange', async () => await this.refreshCatalog(data));

        HamburgerMenu.init();
    }



    static async refreshCatalog(data) {
        let filters = CatalogOperations.getFilters();
        let filteredData = CatalogOperations.applyFilters(data, filters);
        let sortedData = CatalogOperations.sortProducts(filteredData);

        CatalogOperations.loadPage(sortedData, 1);
        CatalogOperations.renderPageButtons(sortedData);
    }
}






CatalogPage.init();