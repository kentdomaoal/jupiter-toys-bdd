Feature: Jupiter Toys Contact Page

    Background:
        Given A user opens Jupiter Toys website

    @Regression
    Scenario: Navigates to Contact Page and validate error messages for mandatory fields
        When user navigates to Contact Page
        And click 'Submit' button
        Then error message should appear
        And error messages for mandatory fields should appear

        When user populate mandatory fields
        Then error message should not appear
        And error messages for mandatory fields should not appear

    @Smoke @Regression
    Scenario Outline: Navigates to Contact Page and validate successful submission
        When user navigates to Contact Page
        And user populate mandatory fields: '<Forename>', '<Email>', '<Message>'
        And click 'Submit' button
        Then successful message should appear for user: '<Forename>'
        Examples:
            | Forename | Email                | Message        |
            | John     | john.doe@example.com | This is a test |
            | John     | john.doe@example.com | This is a test |
            | John     | john.doe@example.com | This is a test |
            | John     | john.doe@example.com | This is a test |
            | John     | john.doe@example.com | This is a test |
