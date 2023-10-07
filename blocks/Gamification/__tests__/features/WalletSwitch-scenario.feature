Feature: WalletSwitch

    Scenario: User navigates to WalletSwitch
        Given I am a User loading WalletSwitch
        When I navigate to the WalletSwitch
        Then WalletSwitch will load with out errors
        And I can select the button with with out errors
        And Wallet Switch API load with out errors
        And I can leave the screen with out errors