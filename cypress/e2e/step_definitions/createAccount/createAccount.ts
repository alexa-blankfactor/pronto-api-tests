import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { UserBuilder } from "../../../support/src/builders/UserBuilder";
import {faker} from '@faker-js/faker';
import { CountryIso3 } from "../../../support/src/constans/CountryIso3";
import { User } from "../../../support/src/domain/User";
import {keycloak} from '../../../support/src/services/keycloak';


When("sends a request to create an account", () => {
      const newUser : User= new UserBuilder()
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
    cy.api({
    method:'POST',
    failOnStatusCode:false,
    url: `${Cypress.env('user_management_url')}/`,
    headers :{
    'x-api-key': Cypress.env('apiKey')
    },
    body: newUser

    }).as('userResponse')
});


Then("the status code should be {int}", (code: number) => {
	
	cy.get('@userResponse').its('status').should('eq',code);
});


Then("the user info in the response body", () => {
	cy.get('@userResponse').then((response)=>{
    cy.get('@newUser').then((value) =>{
      expect(response.body).to.have.property("firstName",value.getFirstName());
      expect(response.body).to.have.property("lastName",value.getLastName());
      expect(response.body).to.have.property("email",value.getEmail());
      expect(response.body).to.have.property("username",value.getUsername());
      expect(response.body).to.have.property("enabled",true);
      expect(response.body.groups[0]).to.eq("prontomas-consumer-users");
    } );
   
  })
});

Then("the user should be created in the database", () => {
  cy.get('@newUser').then((newUser)=>{
    cy.task("connectDB",
      {dbconfig: Cypress.env('db'),
      query: `select * from users where username = '${newUser.getUsername()}';`
      }
      
      ).then((result)=>{
        cy.get('@newUser').then((value) =>{})
        expect(result.length).to.eq(1);
        expect(result[0].first_name).to.eq(newUser.getFirstName());
        expect(result[0].last_name).to.eq(newUser.getLastName());
      })
  });
});


Then("the user should exist in the user administrator", () => {
	  keycloak.getAccessTokenByClientCredencials();
    cy.get('@newUser').then((newUser=>keycloak.getUserByUsername(newUser.getUsername())));
    cy.get('@userFound').its('status').should('eq',200);
    cy.get('@userFound').then((response)=>{
      expect(response.body.length).to.eq(1)
    })
});





