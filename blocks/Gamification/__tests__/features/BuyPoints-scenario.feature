Feature: BuyPoints

    Scenario: User navigates to BuyPoints
        Given I am a User loading BuyPoints
        When I navigate to the BuyPoints
        Then BuyPoints will load with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors