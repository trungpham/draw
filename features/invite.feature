Feature: Invite friend to play feature
  As a user of the game
  I want to invite a facebook friend to play a new game with me

  Scenario: My facebook friend has not yet installed the game
    Given my facebook friend has not installed the game
    When I invite my facebook friend to play with me
    Then it should let me start drawing
    When I submit the drawing
    Then it should save the drawing along with the game invite addressed to my facebook friend

  Scenario: User's facebook friend joins the game
    Given I have previously invited my facebook friend to play the game
    When my facebook friend signs up for the game
    Then it should create a new match between my facebook friend and I
    And my facebook friend should see my drawing on his home screen

  Scenario: User invites a facebook friend who is already in the system
    Given my facebook friend has installed the game
    When I invite my facebook friend to play with me
    Then it should let me start drawing
    When I submit the drawing
    Then it should save the drawing
    And create a new match between my facebook friend and I
    And my facebook friend should see my drawing on his home screen

  Scenario: User invites the same user multiple times
    Given I have previously invited my facebook friend to play the game
    When I invite my facebook friend to play with me
    Then it should not let me invite my facebook friend again