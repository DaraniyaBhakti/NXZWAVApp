Feature: Account Log In screen

    Scenario: User navigates to Account Log In screen
        Given I am a User attempting to Log In with a apple login
        When I navigate to the Log In Screen
        Then Screen will load with out errors
        And User can click on button
        And On callback get response of button action
        And RestAPI will return error message for wrong end points
        And RestAPI will return error message for verification
        And RestAPI will return token

   