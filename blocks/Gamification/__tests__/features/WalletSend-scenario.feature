Feature: WalletSend

    Scenario: User navigates to WalletSend
        Given I am a User loading WalletSend
        When I navigate to the WalletSend
        Then WalletSend will load with out errors
        And I can select the button with with out errors
        And Wallet Switch API load with out errors
        And I can leave the screen with out errors