
Feature: Create a new account in Prontomás
  Scenario: Create successful account 
    When sends a request to create an account 
    Then the status code should be 201
    And the user info in the response body
    And the user should be created in the database
    And the user should exist in the user administrator