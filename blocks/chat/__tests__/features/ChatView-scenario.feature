Feature: ChatView

  Scenario: User navigates to ChatView
    Given I am a User loading ChatView
    When I navigate to ChatView
    Then ChatView will load

    When dm type message
    Then do action for dm Type

    When pm type message
    Then do action for pm Type

    And I can leave the screen