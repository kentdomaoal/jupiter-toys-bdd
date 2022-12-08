/// <reference types="cypress" />

import { FileUtil } from "../../support/util/FileUtil";
import { CartPage } from "../pages/CartPage";
import { ShopPage } from "../pages/ShopPage";
import { Given, When, Then, defineStep as And } from "@badeball/cypress-cucumber-preprocessor";

    var cartPage;
    var products;
    let subTotalArray = [];

    before(() => {
        // read test data
        // cy.fixture(FileUtil.getFilename('shoppingList')).as('shoppingList');
        cy.fixture('shoppingList').as('shoppingList');
    })

    When ('user buys products', function() {
        // By instantiating ShopPage object it will navigate to Shop Page
        // See ShopPage constructor
        new ShopPage().buy(this.shoppingList); // Buy based on shopping list
    })

    And ('user navigates to Cart Page', function() {
        // By instantiating CartPage object it will navigate to Cart Page.
        // see CartPage constructor
        cartPage = new CartPage();
    })

    When ('user validates subtotal for each product', () => {})
    Then ('subtotal for each product should be correct', function() {
        products = this.shoppingList.products;
        products.forEach(product => {
            cartPage.getPrice(product.name); // Get Price
            cartPage.getSubtotal(product.name, subTotalArray); // Get Subtotal
            cy.get('@subtotal').then((subtotal) => {
                cy.get('@price').should((price) => { 
                    expect(subtotal, product.name+"'s subtotal").to.equals(price * product.quantity);
                })
            });
        });
    })

    When ('user validates price for each product', () => {})
    Then ('price for each product should be correct', function() {
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
    })

    When ('user validates the total amount', () => {})
    Then ('total amount should be the sum of subtotals', function() {
        cartPage.getTotal().then((total) => {
            cy.get('@subTotals').should((subTotals)=>{ 
                expect(total, 'Total Amount').to.equals(cartPage.sum(subTotals));
            })
        }) 
    })
