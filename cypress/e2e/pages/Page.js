export class Page {

    navigateTo(page){
        cy.contains('a', page).click();
    }

    clickButton(buttonName){
        cy.contains('.btn', buttonName).click();
    }
}