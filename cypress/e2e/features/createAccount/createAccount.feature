
Feature: Create a new account in Prontomás

  Scenario: Create successful account
    When sends a request to create an account
    Then the status code should be 201
    And the user info in the response body
    And the user should be created in the database
    And the user should exist in the user administrator



  Scenario Outline: Invalid firstname attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "firstname" type equal to
      | firstnameType   | JsonArrayIndex   |
      | <firstnameType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "firstName invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | firstnameType    | JsonArrayIndex |
      | int              | 0              |
      | boolean          | 1              |
      | null             | 2              |
      | blank            | 3              |
      | above_max_length | 4              |
      | array            | 5              |


  Scenario Outline: Invalid middleName attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "middlename" type equal to
      | middlenameType   | JsonArrayIndex   |
      | <middlenameType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "middlename invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | middlenameType   | JsonArrayIndex |
      | int              | 0              |
      | boolean          | 1              |
      | above_max_length | 2              |
      | array            | 3              |


  Scenario Outline: Invalid lastName attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "lastname" type equal to
      | lastnameType   | JsonArrayIndex   |
      | <lastnameType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "lastname invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | lastnameType     | JsonArrayIndex |
      | int              | 0              |
      | boolean          | 1              |
      | null             | 2              |
      | blank            | 3              |
      | above_max_length | 4              |
      | array            | 5              |

  @only
  Scenario Outline: Invalid email attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "email" type equal to
      | emailType   | JsonArrayIndex   |
      | <emailType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "email invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | emailType            | JsonArrayIndex |
      | int                  | 0              |
      | boolean              | 1              |
      | null                 | 2              |
      | blank                | 3              |
      | above_max_length     | 4              |
      | array                | 5              |
      | invalid email format | 6              |

  @only
  Scenario Outline: Invalid username attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "username" type equal to
      | usernameType   | JsonArrayIndex   |
      | <usernameType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "username invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | usernameType     | JsonArrayIndex |
      | int              | 0              |
      | boolean          | 1              |
      | null             | 2              |
      | blank            | 3              |
      | above_max_length | 4              |
      | below_min_length | 5              |
      | array            | 6              |


  Scenario: Create an account with an existing email
    Given sends a request to create an account with email "test1@test.com"
    When sends a request to create an account with an existing email "test1@test.com"
    Then the status code should be 400
    And error code should be "001001"
    And error description should be "The email has already been registered."
    And the user should be created in the database once
    And the user should exist in the user administrator once