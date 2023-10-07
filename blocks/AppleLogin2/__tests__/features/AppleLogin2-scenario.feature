Feature: AppleLogin2

    Scenario: User navigates to AppleLogin2
        Given I am a User loading AppleLogin2
        When I navigate to the AppleLogin2
        Then AppleLogin2 will load with out errors
        And I can select the button with out errors
        And login/register with an Invalid identityToken should fail
        And login/register without internetConnection
        And I can leave the screen with out errors

    Scenario: AppleLogin on same screen    
        Given I am a User loading AppleLogin2
        When I navigate to the AppleLogin2
        Then AppleLogin2 will load with out errors