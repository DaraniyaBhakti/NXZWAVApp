Feature: Repost

    Scenario: User navigates to Repost
        Given I am a User loading Repost
        When I navigate to the Repost
        Then Repost will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors