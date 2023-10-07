Feature: GamifiedWallet

    Scenario: User navigates to GamifiedWallet
        Given I am a User loading GamifiedWallet
        When I navigate to the GamifiedWallet
        Then GamifiedWallet will load with out errors
        And I can select the button with with out errors
        And I can select the Assets option with with out errors
        And I can select the Activity option with with out errors
        And I can select the Transaction option with with out errors
        And I can select the Watchers option with with out errors
        And Asset categories List API load with out errors
        And Activities List API load with out errors
        And Transactions List API load with out errors
        And Watchers List API load with out errors
        And I can leave the screen with out errors