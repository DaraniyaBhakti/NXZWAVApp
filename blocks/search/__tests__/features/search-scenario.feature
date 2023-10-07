Feature: search

    Scenario: User navigates to search
        Given I am a User loading search
        When I navigate to the search
        Then I can enter text with out errors
        Then I can select the button with with out errors
        Then I can select the Trending option with with out errors
        Then I can select the Tags option with with out errors
        Then I can select the Players option with with out errors
        Then Tags List API load with out errors
        Then Trending List API load with out errors
        Then Players List API load with out errors
        Then Carousel List API load with out errors
        Then Search List API load with out errors
        Then search will load with out errors
        And I can leave the screen with out errors