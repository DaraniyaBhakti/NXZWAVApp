Feature: AddCategories

    Scenario: User navigates to AddCategories
        Given I am a User loading AddCategories
        When I navigate to the AddCategories
        Then AddCategories will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can select the flat list with with out errors
        And Categories List API load with out errors
        And I can leave the screen with out errors