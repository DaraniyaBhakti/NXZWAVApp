Feature: SearchUser

    Scenario: User navigates to SearchUser
        Given I am a User loading SearchUser
        When I navigate to the SearchUser
        Then SearchUser will load with out errors
        And I can enter text with out errors
        And I can select the flat list with with out errors
        And User List API load with out errors
        And Search User List API load with out errors
        And I can leave the screen with out errors