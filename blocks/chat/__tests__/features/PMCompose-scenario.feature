Feature: PMCompose

  Scenario: User navigates to PMCompose
    Given I am a User loading PMCompose
    When I navigate to PMCompose
    Then PMCompose will load with out errors
    Then I can enter text with out errors
    Then I can select the button with with out errors
    Then Create PM Compose API load with out errors
    Then I can leave the screen with out errors
