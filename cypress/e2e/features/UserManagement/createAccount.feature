
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


  Scenario Outline: Invalid taxId attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "taxid" type equal to
      | taxIdType   | JsonArrayIndex   |
      | <taxIdType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "taxId invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | taxIdType        | JsonArrayIndex |
      | int              | 0              |
      | boolean          | 1              |
      | null             | 2              |
      | blank            | 3              |
      | above_max_length | 4              |
      | array            | 5              |


  Scenario Outline: Invalid taxCountry attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "taxcountry" type equal to
      | taxCountryType   | JsonArrayIndex   |
      | <taxCountryType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "taxCountry invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | taxCountryType   | JsonArrayIndex |
      | int              | 0              |
      | boolean          | 1              |
      | null             | 2              |
      | blank            | 3              |
      | above_max_length | 4              |
      | array            | 5              |


  Scenario Outline: Invalid deviceToken attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "devicetoken" type equal to
      | deviceTokenType   | JsonArrayIndex   |
      | <deviceTokenType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "deviceToken invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | deviceTokenType | JsonArrayIndex |
      | int             | 0              |
      | boolean         | 1              |
      | null            | 2              |
      | blank           | 3              |
      | array           | 4              |


  Scenario Outline: Invalid address attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "address" type equal to
      | addressType   | JsonArrayIndex   |
      | <addressType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "address invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | addressType | JsonArrayIndex |
      | int         | 0              |
      | boolean     | 1              |
      | null        | 2              |
      | string      | 3              |
      | emptyObject | 4              |

  
  Scenario Outline: Invalid address.addressLines attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "address-addressLines" type equal to
      | address.addressLinesType   | JsonArrayIndex   |
      | <address.addressLinesType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "address.addressLines invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | address.addressLinesType | JsonArrayIndex |
      | int                      | 0              |
      | boolean                  | 1              |
      | null                     | 2              |
      | string                   | 3              |
      | emptyArray               | 4              |

  
  Scenario Outline: Invalid address.locality attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "address-locality" type equal to
      | address.localityType   | JsonArrayIndex   |
      | <address.localityType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "address.locality invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | address.localityType | JsonArrayIndex |
      | int                  | 0              |
      | boolean              | 1              |
      | null                 | 2              |
      | blank                | 3              |
      | above_max_length     | 4              |
      | array                | 5              |


  Scenario Outline: Invalid address.administrativeArea attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "address-administrativeArea" type equal to
      | address.administrativeAreaType   | JsonArrayIndex   |
      | <address.administrativeAreaType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "address.administrativeArea invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | address.administrativeAreaType | JsonArrayIndex |
      | int                            | 0              |
      | boolean                        | 1              |
      | null                           | 2              |
      | blank                          | 3              |
      | above_max_length               | 4              |
      | array                          | 5              |


  Scenario Outline: Invalid address.postalCode attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "address-postalCode" type equal to
      | address.postalCodeType   | JsonArrayIndex   |
      | <address.postalCodeType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "address.postalCode invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | address.postalCodeType | JsonArrayIndex |
      | int                    | 0              |
      | boolean                | 1              |
      | null                   | 2              |
      | blank                  | 3              |
      | above_max_length       | 4              |
      | array                  | 5              |


  Scenario Outline: Invalid address.countryIso3 attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "address-countryIso3" type equal to
      | address.countryIso3Type   | JsonArrayIndex   |
      | <address.countryIso3Type> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "address.countryIso3 invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | address.countryIso3Type | JsonArrayIndex |
      | int                     | 0              |
      | boolean                 | 1              |
      | null                    | 2              |
      | blank                   | 3              |
      | above_max_length        | 4              |
      | below_min_length        | 5              |
      | array                   | 6              |


  Scenario Outline: Invalid phoneNumber attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "phoneNumber" type equal to
      | phoneNumberType   | JsonArrayIndex   |
      | <phoneNumberType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "phoneNumber invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | phoneNumberType | JsonArrayIndex |
      | int             | 0              |
      | boolean         | 1              |
      | null            | 2              |
      | string          | 3              |
      | emptyObject     | 4              |


  Scenario Outline: Invalid phoneNumber.phoneNumber attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "phoneNumber-phoneNumber" type equal to
      | phoneNumber.phoneNumberType   | JsonArrayIndex   |
      | <phoneNumber.phoneNumberType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "phoneNumber.phoneNumber invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | phoneNumber.phoneNumberType | JsonArrayIndex |
      | int                         | 0              |
      | boolean                     | 1              |
      | null                        | 2              |
      | blank                       | 3              |
      | above_max_length            | 4              |
      | array                       | 5              |
      | alphanumeric                | 6              |


  Scenario Outline: Invalid phoneNumber.countryCode attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "phoneNumber-countryCode" type equal to
      | phoneNumber.countryCodeType   | JsonArrayIndex   |
      | <phoneNumber.countryCodeType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "phoneNumber.countryCode invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | phoneNumber.countryCodeType | JsonArrayIndex |
      | int                         | 0              |
      | boolean                     | 1              |
      | null                        | 2              |
      | blank                       | 3              |
      | array                       | 4              |


  Scenario Outline: Invalid phoneNumber.smsEnabled attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "phoneNumber-smsEnabled" type equal to
      | phoneNumber.smsEnabledType   | JsonArrayIndex   |
      | <phoneNumber.smsEnabledType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "phoneNumber.smsEnabled invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | phoneNumber.smsEnabledType | JsonArrayIndex |
      | int                        | 0              |
      | string                     | 1              |
      | null                       | 2              |
      | array                      | 3              |

  
  Scenario Outline: Invalid password attributes to the POST endpoint throw valid status code and error message
    When sends a request to create an account with "password" type equal to
      | passwordType   | JsonArrayIndex   |
      | <passwordType> | <JsonArrayIndex> |
    Then the status code should be 400
    And error code should be "002000"
    And error description should be "password invalid type"
    And the user should not be created in the database
    And the user should not exist in the user administrator

    Examples:
      | passwordType     | JsonArrayIndex |
      | int              | 0              |
      | boolean          | 1              |
      | null             | 2              |
      | blank            | 3              |
      | above_max_length | 4              |
      | below_min_length | 5              |
      | array            | 6              |

  
  Scenario: Create an account with an existing email
    Given sends a request to create an account with email "test10@test.com"
    When sends a request to create an account with an existing email "test10@test.com"
    Then the status code should be 400
    And error code should be "102001"
    And error description should be "The email has already been registered."
    And the user should be created in the database once
    And the user should exist in the user administrator once

  
  Scenario: Create an account with an existing username
    Given sends a request to create an account with username "Albionraft_g07"
    When sends a request to create an account with an existing username "Albionraft_g07"
    Then the status code should be 400
    And error code should be "102001"
    And error description should be "The email has already been registered."
    And the user should be created in the database once
    And the user should exist in the user administrator once

  
  Scenario: Under-age user creates an account
    When sends a request to create an account with birth date "17/11/2007"
    Then the status code should be 400
    And error code should be "102001"
    And error description should be "Prontomás está disponible únicamente para mayores de 18 años"
    And the user should not be created in the database
    And the user should not exist in the user administrator

  @only
  Scenario: Create an account where the postal code doesn't match the address
    When sends a request to create an account with postal code "056030", city "Sabaneta", state "Atlantico" and address "Carrera 60 A #62-02"
    Then the status code should be 400
    And error code should be "102001"
    And error description should be "The postal code and address don't match"
    And the user should not be created in the database
    And the user should not exist in the user administrator