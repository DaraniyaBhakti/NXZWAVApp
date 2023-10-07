Feature: ChatView

  Scenario: User navigates to ChatView
    Given I am a User loading ChatView
    When I navigate to ChatView
    Then ChatView will load

    When I click on the btnInsertImage button
    Then I can change image file
    
    When I click on the leaveChat button
    Then a call to leave the chat room will be made
    
    And I can leave the screen