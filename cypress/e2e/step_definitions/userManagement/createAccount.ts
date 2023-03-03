import { Given,When, Then, DataTable } from "@badeball/cypress-cucumber-preprocessor";
import { UserBuilder } from "../../../support/src/builders/UserBuilder";
import { faker } from '@faker-js/faker';
import { CountryIso3 } from "../../../support/src/constans/CountryIso3";
import { User } from "../../../support/src/domain/User";
import { keycloak } from '../../../support/src/services/keycloak';
import { userManagement } from "../../../support/src/services/userManagement";


When("sends a request to create an account", () => {
  const newUser: User = new UserBuilder()
    .withFristName(faker.name.firstName())
    .withLastName(faker.name.lastName())
    .withEmail(faker.internet.email())
    .withUserName(faker.internet.userName())
    .withDateOfBirth(faker.date.birthdate())
    .withTaxId(faker.datatype.uuid())
    .withTaxCountry("COL")
    .withDeviceToken(faker.datatype.uuid())
    .withAddressLines(["Carrera 15 A # 36-71"])
    .withAddressLocality("Medellin")
    .withAddressAdministrativeArea("Antioquia")
    .withAddressPostalCode("050020")
    .withAddressCountryIso3(CountryIso3.COL)
    .withPhoneNumberCountryCode("57")
    .withPhoneNumber(3122585914)
    .withPhoneNumberSmsEnabled(false)
    .withPassword("123456").build();
  cy.wrap(newUser).as('newUser');
  userManagement.createAccount(newUser);

});


Then("the status code should be {int}", (code: number) => {

  cy.get('@userResponse').its('status').should('eq', code);
});


Then("the user info in the response body", () => {
  cy.get('@userResponse').then((response) => {
    cy.get('@newUser').then((value) => {
      expect(response.body).to.have.property("firstName", value.getFirstName());
      expect(response.body).to.have.property("lastName", value.getLastName());
      expect(response.body).to.have.property("email", value.getEmail());
      expect(response.body).to.have.property("username", value.getUsername());
      expect(response.body).to.have.property("enabled", true);
      expect(response.body.groups[0]).to.eq("prontomas-consumer-users");
    });

  })
});

Then("the user should be created in the database", () => {
  cy.get('@newUser').then((newUser) => {
    cy.task("connectDB",
      {
        dbconfig: Cypress.env('db'),
        query: `select * from users where username = '${newUser.getUsername()}';`
      }

    ).then((result) => {
      expect(result.length).to.eq(1);
      expect(result[0].first_name).to.eq(newUser.getFirstName());
      expect(result[0].last_name).to.eq(newUser.getLastName());
    })
  });
});


Then("the user should exist in the user administrator", () => {
  keycloak.getAccessTokenByClientCredencials();
  cy.get('@newUser').then((newUser => keycloak.getUserByUsername(newUser.getUsername())));
  cy.get('@userFound').its('status').should('eq', 200);
  cy.get('@userFound').then((response) => {
    expect(response.body.length).to.eq(1)
  })
});



When("sends a request to create an account with {string} type equal to", (field: string, table: DataTable) => {
  cy.fixture(`createAccount/new-pronto-user-${field}.json`).then((user) => {
    var index: number = 0;
    table.hashes().forEach((row) => {
      index = Number(row.JsonArrayIndex);

    })
    userManagement.createAccount(user[index]);
    cy.wrap(user[index]).as('userJson');
  })
});



Then("error code should be {string}", (errorCode: string) => {
  cy.get('@userResponse').then((response) => {
    expect(response.body.errorCode).to.eq(errorCode);
  })
});


Then("error description should be {string}", (errorDesc: string) => {
  cy.get('@userResponse').then((response) => {
    expect(response.body.errorDescription).to.eq(errorDesc);
  })
});


Then("the user should not be created in the database", () => {
  cy.get('@userJson').then((newUser) => {
    cy.task("connectDB",
      {
        dbconfig: Cypress.env('db'),
        query: `select * from users where username = '${newUser.getUsername()}';`
      }

    ).then((result) => {
      expect(result.length).to.eq(0);
    })
  });
});


Then("the user should not exist in the user administrator", () => {
  keycloak.getAccessTokenByClientCredencials();
  cy.get('@userJson').then((newUser => keycloak.getUserByUsername(newUser.getUsername())));
  cy.get('@userFound').its('status').should('eq', 200);
  cy.get('@userFound').then((response) => {
    expect(response.body.length).to.eq(0)
  })
});


Given("sends a request to create an account with email {string}", (email:string) => {
	  const newUser: User = new UserBuilder()
      .withFristName(faker.name.firstName())
      .withLastName(faker.name.lastName())
      .withEmail(email)
      .withUserName(faker.internet.userName())
      .withDateOfBirth(faker.date.birthdate())
      .withTaxId(faker.datatype.uuid())
      .withTaxCountry("COL")
      .withDeviceToken(faker.datatype.uuid())
      .withAddressLines(["Carrera 15 A # 36-71"])
      .withAddressLocality("Medellin")
      .withAddressAdministrativeArea("Antioquia")
      .withAddressPostalCode("050020")
      .withAddressCountryIso3(CountryIso3.COL)
      .withPhoneNumberCountryCode("57")
      .withPhoneNumber(3122585914)
      .withPhoneNumberSmsEnabled(false)
      .withPassword("123456").build();
    cy.wrap(newUser).as('newUser');
    userManagement.createAccount(newUser);
});


When("sends a request to create an account with an existing email {string}", (email:string) => {
	const newUser: User = new UserBuilder()
    .withFristName(faker.name.firstName())
    .withLastName(faker.name.lastName())
    .withEmail(email)
    .withUserName(faker.internet.userName())
    .withDateOfBirth(faker.date.birthdate())
    .withTaxId(faker.datatype.uuid())
    .withTaxCountry("COL")
    .withDeviceToken(faker.datatype.uuid())
    .withAddressLines(["Carrera 15 A # 36-71"])
    .withAddressLocality("Medellin")
    .withAddressAdministrativeArea("Antioquia")
    .withAddressPostalCode("050020")
    .withAddressCountryIso3(CountryIso3.COL)
    .withPhoneNumberCountryCode("57")
    .withPhoneNumber(3122585914)
    .withPhoneNumberSmsEnabled(false)
    .withPassword("123456").build();
    cy.wrap(newUser).as('newUser');
    userManagement.createAccount(newUser);
});


Then("the user should be created in the database once", () => {
	cy.get('@userJson').then((newUser) => {
    cy.task("connectDB",
      {
        dbconfig: Cypress.env('db'),
        query: `select * from users where username = '${newUser.getUsername()}';`
      }

    ).then((result) => {
      expect(result.length).to.eq(1);
    })
  });
});


Then("the user should exist in the user administrator once", () => {
	keycloak.getAccessTokenByClientCredencials();
  cy.get('@userJson').then((newUser => keycloak.getUserByUsername(newUser.getUsername())));
  cy.get('@userFound').its('status').should('eq', 200);
  cy.get('@userFound').then((response) => {
    expect(response.body.length).to.eq(1);
  })
});


Given("sends a request to create an account with username {string}", (username:string) => {
	const newUser: User = new UserBuilder()
      .withFristName(faker.name.firstName())
      .withLastName(faker.name.lastName())
      .withEmail(faker.internet.email())
      .withUserName(username)
      .withDateOfBirth(faker.date.birthdate())
      .withTaxId(faker.datatype.uuid())
      .withTaxCountry("COL")
      .withDeviceToken(faker.datatype.uuid())
      .withAddressLines(["Carrera 15 A # 36-71"])
      .withAddressLocality("Medellin")
      .withAddressAdministrativeArea("Antioquia")
      .withAddressPostalCode("050020")
      .withAddressCountryIso3(CountryIso3.COL)
      .withPhoneNumberCountryCode("57")
      .withPhoneNumber(3122585914)
      .withPhoneNumberSmsEnabled(false)
      .withPassword("123456").build();
    cy.wrap(newUser).as('newUser');
    userManagement.createAccount(newUser);
});


When("sends a request to create an account with an existing username {string}", (username:string) => {
	  const newUser: User = new UserBuilder()
      .withFristName(faker.name.firstName())
      .withLastName(faker.name.lastName())
      .withEmail(faker.internet.email())
      .withUserName(username)
      .withDateOfBirth(faker.date.birthdate())
      .withTaxId(faker.datatype.uuid())
      .withTaxCountry("COL")
      .withDeviceToken(faker.datatype.uuid())
      .withAddressLines(["Carrera 15 A # 36-71"])
      .withAddressLocality("Medellin")
      .withAddressAdministrativeArea("Antioquia")
      .withAddressPostalCode("050020")
      .withAddressCountryIso3(CountryIso3.COL)
      .withPhoneNumberCountryCode("57")
      .withPhoneNumber(3122585914)
      .withPhoneNumberSmsEnabled(false)
      .withPassword("123456").build();
    cy.wrap(newUser).as('newUser');
    userManagement.createAccount(newUser);
});

When("sends a request to create an account with birth date {string}", (birthDate: string) => {
  let [day,month,year]= birthDate.split('/');
	const newUser: User = new UserBuilder()
      .withFristName(faker.name.firstName())
      .withLastName(faker.name.lastName())
      .withEmail(faker.internet.email())
      .withUserName(faker.internet.userName())
      .withDateOfBirth(new Date(+year,+month-1,+day))
      .withTaxId(faker.datatype.uuid())
      .withTaxCountry("COL")
      .withDeviceToken(faker.datatype.uuid())
      .withAddressLines(["Carrera 15 A # 36-71"])
      .withAddressLocality("Medellin")
      .withAddressAdministrativeArea("Antioquia")
      .withAddressPostalCode("050020")
      .withAddressCountryIso3(CountryIso3.COL)
      .withPhoneNumberCountryCode("57")
      .withPhoneNumber(3122585914)
      .withPhoneNumberSmsEnabled(false)
      .withPassword("123456").build();
    cy.wrap(newUser).as('newUser');
    userManagement.createAccount(newUser);
});


When("sends a request to create an account with postal code {string}, city {string}, state {string} and address {string}", (zipCode:string,city:string,state:string,address:string) => {
	const newUser: User = new UserBuilder()
      .withFristName(faker.name.firstName())
      .withLastName(faker.name.lastName())
      .withEmail(faker.internet.email())
      .withUserName(faker.internet.userName())
      .withDateOfBirth(faker.date.birthdate())
      .withTaxId(faker.datatype.uuid())
      .withTaxCountry("COL")
      .withDeviceToken(faker.datatype.uuid())
      .withAddressLines([address])
      .withAddressLocality(city)
      .withAddressAdministrativeArea(state)
      .withAddressPostalCode(zipCode)
      .withAddressCountryIso3(CountryIso3.COL)
      .withPhoneNumberCountryCode("57")
      .withPhoneNumber(3122585914)
      .withPhoneNumberSmsEnabled(false)
      .withPassword("123456").build();
    cy.wrap(newUser).as('newUser');
    userManagement.createAccount(newUser);
});












