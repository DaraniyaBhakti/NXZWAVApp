Feature: StripeGatewayApiFrontend

    Scenario: User navigates to StripeGatewayApiFrontend
        Given I am a User loading StripeGatewayApiFrontend
        When I navigate to the StripeGatewayApiFrontend
        Then StripeGatewayApiFrontend will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors