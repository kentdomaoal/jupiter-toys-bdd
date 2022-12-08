/// <reference types="cypress" />

import { FileUtil } from "../../support/util/FileUtil";
import { CartPage } from "../pages/CartPage";
import { ShopPage } from "../pages/ShopPage";

describe('Jupiter Toys Cart Page Tests', () => {

    beforeEach(() => {
        // Visit baseURL at the start of all tests.
        // Already configured in cypress.config.js
        cy.visit("/");
    })

    before(() => {
        // read test data
        // cy.fixture(FileUtil.getFilename('shoppingList')).as('shoppingList');
        cy.fixture('shoppingList').as('shoppingList');
    })

    it('Buys Products and validate prices, subtotal, total in Cart Page', function () {
        
        // By instantiating ShopPage object it will navigate to Shop Page
        // See ShopPage constructor
        new ShopPage().buy(this.shoppingList); // Buy based on shopping list
        
        // Go to Cart page
        const cartPage = new CartPage();
        
        // Validate subtotal for each product
        let subTotalArray = [];
        let products = this.shoppingList.products;
        products.forEach(product => {
            cartPage.getPrice(product.name); // Get Price
            cartPage.getSubtotal(product.name, subTotalArray); // Get Subtotal

            cy.get('@subtotal').then((subtotal) => {
                cy.get('@price').should((price) => { 
                    expect(subtotal, product.name+"'s subtotal").to.equals(price * product.quantity);
                })
            });
        });

        // Validate price for each product
        // comparing the price from Shop Page to Cart Page
        let shopPagePrice = 0;
        products.forEach(product => {
            cartPage.getPrice(product.name).then((cartPagePrice)=>{  // Cart Page Price
                cy.get('@productPriceMap').should((productPriceMap) => { 
                    shopPagePrice = productPriceMap.get(product.name); // Shop Page Price
                    expect(cartPagePrice, product.name+"'s price").to.equals(shopPagePrice);
                })
            });
        });
        
        // Validate total
        cartPage.getTotal().then((total) => {
            cy.get('@subTotals').should((subTotals)=>{ 
                expect(total, 'Total Amount').to.equals(cartPage.sum(subTotals));
            })
        }) 
    })

})