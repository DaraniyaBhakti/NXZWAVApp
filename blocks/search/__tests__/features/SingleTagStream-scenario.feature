Feature: SingleTagStream

    Scenario: User navigates to SingleTagStream
        Given I am a User loading SingleTagStream
        When I navigate to the SingleTagStream
        Then I can select the button with with out errors
        Then I can select the flatlist with with out errors
        Then Tagged Post List API load with out errors
        And I can leave the screen with out errors