Feature: ChatNew

  Scenario: User navigates to ChatNew
    Given I am a User loading ChatNew
    When I navigate to ChatNew
    Then ChatNew will load
    And I can leave the screen