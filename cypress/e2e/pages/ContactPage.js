import { Page } from "./Page";

export class ContactPage extends Page {

    ERROR_MESSAGE = 'but we won\'t get it unless you complete the form correctly';
    FIELD_ERROR_MESSAGE = '<field> is required'
    SUCCESS_MESSAGE = 'Thanks <user>, we appreciate your feedback.'

    alertSuccMessage = '.alert-success';
    alertErrMessage = '.alert-error';
    forenameErrMessage = '#forename-err';
    emailErrMessage = '#email-err';
    messageErrMessage = '#message-err';
    
    forenameTextbox = '#forename';
    emailTextbox = '#email';
    messageTextbox = '#message';

    constructor(){
        super();
        this.navigateTo('Contact');
    }

    get alertSuccessMessage(){
        return cy.get(this.alertSuccMessage,{ timeout: 20000 });
    }

    get alertErrorMessage(){
        return cy.get(this.alertErrMessage);
    }

    get forenameErrorMessage(){
        return cy.get(this.forenameErrMessage);
    }

    get emailErrorMessage(){
        return cy.get(this.emailErrMessage);
    }

    get messageErrorMessage(){
        return cy.get(this.messageErrMessage);
    }

    enterForename(name){
        cy.get(this.forenameTextbox).type(name, {waitForAnimations: false});
    }

    enterEmail(email){
        cy.get(this.emailTextbox).type(email);
    }

    enterMessage(message){
        cy.get(this.messageTextbox).type(message);
    }

    successMessageForUser(user){
        return this.SUCCESS_MESSAGE.replace('<user>',user);
    }

    errorMessageFor(field){
        return this.FIELD_ERROR_MESSAGE.replace('<field>',field);
    }
}
