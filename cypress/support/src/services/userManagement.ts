export class userManagement{

    static createAccount(user: any){
        cy.api({
            method:'POST',
            failOnStatusCode:false,
            url: `${Cypress.env('user_management_url')}/`,
            headers :{
            'x-api-key': Cypress.env('apiKey')
            },
            body: user
        
            }).as('userResponse')
    }
}