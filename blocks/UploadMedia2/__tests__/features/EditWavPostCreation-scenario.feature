Feature: EditWavPostCreation

    Scenario: User navigates to EditWav
        Given I am a User loading EditWav
        When I navigate to the EditWav
        Then EditWav will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And Post creation API load with out errors
        And I can leave the screen with out errors