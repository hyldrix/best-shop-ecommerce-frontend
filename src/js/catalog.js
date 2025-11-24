import {  CatalogButtons, CatalogOperations, DataOperations, DropdownMenus, Footer, Header, RenderEngine, SearchProducts, ShoppingCart } from './main.js';
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

        

        DropdownMenus.init()
        CatalogButtons.init();
        SearchProducts.init();

        ShoppingCart.renderCartQuantity();
        
        let data = await DataOperations.getData('/src/assets/data.json');

        let filters = CatalogOperations.getFilters();
        let filteredData = CatalogOperations.applyFilters(data, filters);
        let sortedData = CatalogOperations.sortProducts(filteredData);
  
        console.log(sortedData);
        CatalogOperations.loadPage(sortedData, 1);
        CatalogOperations.renderPageButtons(sortedData);


       

    }
}

CatalogPage.init();