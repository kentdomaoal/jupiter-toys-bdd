/// <reference types="cypress" />

import { FileUtil } from "../../support/util/FileUtil";
import { ContactPage } from "../pages/ContactPage";
import { Given, When, Then, defineStep as And } from "@badeball/cypress-cucumber-preprocessor";

  var page;

  beforeEach(() => {
    // read test data
    //cy.fixture(FileUtil.getFilename('userFeedback')).as('userFeedback');
    cy.fixture('userFeedback').as('userFeedback');
  })

  Given('A user opens Jupiter Toys website', function() {
    // Visit baseURL, already configured in cypress.config.js
    cy.visit("/");
  })

  When('user navigates to Contact Page', function() {
    // By instantiating ContactPage object it will navigate to Contact Page.
    // see ContactPage constructor
    page = new ContactPage();
  })

  And('click {string} button', function(buttonName) {
    page.clickButton(buttonName);
    //page.clickButton('Submit');
  })

  Then('error message should appear', function() {
    page.alertErrorMessage.should('exist').and('contain', page.ERROR_MESSAGE);
  })

  And('error messages for mandatory fields should appear', function() {
    page.forenameErrorMessage.should('exist').and('contain',page.errorMessageFor('Forename'));
    page.emailErrorMessage.should('exist').and('contain',page.errorMessageFor('Email'));
    page.messageErrorMessage.should('exist').and('contain',page.errorMessageFor('Message'));
  })

  When('user populate mandatory fields', function() {
    page.enterForename(this.userFeedback.Forename);
    page.enterEmail(this.userFeedback.Email);
    page.enterMessage(this.userFeedback.Message);
  })

  When('user populate mandatory fields: {string}, {string}, {string}', function(forename, email, message) {
    page.enterForename(forename);
    page.enterEmail(email);
    page.enterMessage(message);
  })

  Then('error message should not appear', function() {
    page.alertErrorMessage.should('not.exist');
  })

  And('error messages for mandatory fields should not appear', function() {
    page.forenameErrorMessage.should('not.exist');
    page.emailErrorMessage.should('not.exist');
    page.messageErrorMessage.should('not.exist');
  })

  Then('successful message should appear', function() {
    page.alertSuccessMessage
    .should('be.visible')
    .and('contain', page.successMessageForUser(this.userFeedback.Forename));
  })

  Then('successful message should appear for user: {string}', function(forename) {
    page.alertSuccessMessage
    .should('be.visible')
    .and('contain', page.successMessageForUser(forename));
  })
  // Cypress._.times(5, function() {
  //   it('Navigates to Contact Page and validate successful submission', function() {

  //     // Go to contact page
  //     // by instantiating ContactPage object it will navigate to Contact Page
  //     // see ContactPage constructor
  //     const page = new ContactPage();

  //     //Populate mandatory fields
  //     page.enterForename(this.userFeedback.Forename);
  //     page.enterEmail(this.userFeedback.Email);
  //     page.enterMessage(this.userFeedback.Message);

  //     //Click submit button
  //     page.clickButton('Submit');

  //     //Wait for successful message to appear
  //     page.alertSuccessMessage
  //       .should('be.visible')
  //       .and('contain', page.successMessageForUser(this.userFeedback.Forename));
  //   })
  // })