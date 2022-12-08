import { Page } from "./Page";
import { PriceUtil } from "../../support/util/PriceUtil";

export class CartPage extends Page {

    constructor(){
        super();
        this.navigateTo('Cart');
    }

    getPrice(name){
        return cy.contains('td', name)
            .next().invoke('text')
            .then((price) => { return parseFloat(price.match(PriceUtil.getRegexFloat())) })
            .as('price');
    }

    getSubtotal(name, subTotalArray){
        return cy.contains('td', name)
            .next().next().next()
            .invoke('text')
            .then((subtotal) => { return parseFloat(subtotal.match(PriceUtil.getRegexFloat())) })
            .as('subtotal')

            //store subtotal into array
            .then((subtotal) => {
                subTotalArray.push(subtotal)
                return subTotalArray;
            })
            .as('subTotals');
    }

    getTotal(){
        return cy.get('.total')
            .invoke('text')
            .then((total) => { return parseFloat(total.match(PriceUtil.getRegexFloat())) })
    }

    sum(subTotalsArray){
        let totalAmount = subTotalsArray.reduce((accumulator, current) => {
            return accumulator + current;
        }, 0);
        
        return totalAmount;
    }
}