import { result } from "cypress/types/lodash"

export class keycloak{

    static getUserByUsername(username : string){
        cy.get('@tokenResult').then((value)=>
        {
            cy.api({
                method:'GET',
                failOnStatusCode:false,
                url: `${Cypress.env('keycloak_url')}/admin/realms/Prontomas/users?usernam=${username}`,
                qs:{
                    username: username
                },
                'auth': {
                    'bearer': `${value}`
                },
                
              }).as('userFound')
        })
        
    }

    static getAccessTokenByClientCredencials(){
        cy.api({
            method:'POST',
            failOnStatusCode:false,
            url: `${Cypress.env('keycloak_url')}/realms/Prontomas/protocol/openid-connect/token`,
            form: true,
            body:{
                client_id:Cypress.env('keycloak_credencial').client_id,
                grant_type:"client_credentials",
                client_secret:Cypress.env('keycloak_credencial').client_secrest
            }
            
          }).then((result)=> result.body.access_token).as('tokenResult')
    }
}