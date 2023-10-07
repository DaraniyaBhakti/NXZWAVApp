Feature: Chat

  Scenario: User navigates to Chat
    Given I am a User loading Chat
    When I navigate to Chat
    Then User can select Message typ
    And Chat conversation will load

    When I write in textInput and press submit
    Then Api call and show chat list

    When I click on top button
    Then it navigates on next screen

    And I can leave the screen