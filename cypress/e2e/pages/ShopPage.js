import { Page } from "./Page";
import { PriceUtil } from "../../support/util/PriceUtil";

export class ShopPage extends Page {

    constructor(){
        super();
        this.navigateTo('Shop');
    }

    getProductPrices(products){
        let productPriceMap = new Map();
        let productPrice = 0;

        products.forEach(product => {
            // Get the Price of the product and store in a map
            cy.contains('.product-title', product.name)
                .siblings('p')
                .children('.product-price')
                .invoke('text')
                .then((price) => {
                    productPrice = parseFloat(price.match(PriceUtil.getRegexFloat()))
                    return productPriceMap.set(product.name, productPrice)
                })
                .as('productPriceMap');
        })
    }

    buyProduct(name, quantity){
        for (let i = 1; i <= quantity; i++) {
            // buy the product
            cy.contains('.product-title', name)
                .siblings('p')
                .children('.btn').contains('Buy')
                .click();
        }
    }

    buyProducts(products){
        products.forEach(product => {
            this.buyProduct(product.name, product.quantity);
        });
    }

    buy(shoppingList){
        this.getProductPrices(shoppingList.products);
        this.buyProducts(shoppingList.products);
    }

}