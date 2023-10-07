Feature: PMChatView

  Scenario: User navigates to PMChatView
    Given I am a User loading PMChatView
    When I navigate to PMChatView
    Then PMChatView will load with out errors
    Then I can enter text with out errors
    Then I can select the button with with out errors
    Then Get Chat List API load with out errors
    Then Unlock Message API load with out errors
    Then Read Message API load with out errors
    Then I can leave the screen with out errors
