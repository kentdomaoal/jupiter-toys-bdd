Feature: Jupiter Toys Cart Page

    Background:
        Given A user opens Jupiter Toys website
    
    @Regression
    Scenario: Buys Products and validate prices, subtotal, total in Cart Page
        When user buys products
        And user navigates to Cart Page
        When user validates subtotal for each product
        Then subtotal for each product should be correct
        When user validates price for each product
        Then price for each product should be correct
        When user validates the total amount
        Then total amount should be the sum of subtotals