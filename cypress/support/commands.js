const powerUserId = 'ECE1D8E2-1903-4756-8318-129BDD06D092'
const webIdentifier = '1+2+3'

import * as AppUrlPaths from './../HTMLElementSelectors/AppUrlPaths.json';
import * as LoginLogout from './../HTMLElementSelectors/LoginLogout.json';


function addEscapeChars(str) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

Cypress.Commands.add('inputUsername', (user) => {
    cy.get(LoginLogout.username_textbox).type(user.email)
})

Cypress.Commands.add('inputPassword', (user) => {
  cy.get(LoginLogout.password_textbox).type(user.password)
})

Cypress.Commands.add('getMaskedPhone', (phoneNumber) => {
  const localPhone = phoneNumber.replace( /\D+/g, '').match(/(\d{3})(\d{3})(\d{4})/)
  return '(' + localPhone[1] + ') ' + localPhone[2] + '-' + localPhone[3]
})

Cypress.Commands.add('clickLoginButton', () => {
  cy.get(LoginLogout.login_button).click()
})

Cypress.Commands.add('loginUser', (userType) => {
  cy.getUsers().then(users => {
    const user = users[userType]
    cy.inputUsername(user)
    cy.inputPassword(user)
  })
  cy.clickLoginButton()
})

Cypress.Commands.add('getAppointments', () => {
  return cy.fixture('appointments.json')
})

Cypress.Commands.add('getStaticCustomers', () => {
  return cy.fixture('static_customers.json')
})

Cypress.Commands.add('getStores', () => {
  return cy.fixture('stores.json')
})

Cypress.Commands.add('getUsers', () => {
  return cy.fixture('users.json')
})

Cypress.Commands.add('getAllCustomers', () => {
  return cy.fixture('customers.json')
})


Cypress.Commands.add('loginUI', (userType) => {
  cy.visit(AppUrlPaths.login)
  cy.wait(2000)
  cy.clearCookies()
  return cy.loginUser(userType);
})

Cypress.Commands.add('login', (userType) => {
  cy.getUsers().then(users => {
    const user = users[userType]
    return cy.request({
      method: 'POST',
      url: '/Login.aspx',
      form: true,
      body: {
        __EVENTTARGET: 'buttonLogin',
        __VIEWSTATE: 'OsVFtXOYQmDEJq9OZf7thSM4BLSIenY77VPBk7CaK47me7neG0CDfs72mOgqf74ONU5hJWN0Vy7yFD8aGbO/JVCS9CU=',
        __EVENTVALIDATION: 'sBNDOulbBHzbIU8GRuqX/Nk2TqhHpMYLH1mVaHjaKJ0HyWdmiqbya2Qvt1A97G/SKASLaxpwPUerm1S+zTB4lq0VC7Dytuf5qJXx3TSZZEzPeSw3buRKSrZC1KMlz0DCQ76a5RU3wkUwXeG44xPJEhFRfow=',
        inputEmail: user.email,
        inputPassword: user.password
      }
    })
  })
})


Cypress.Commands.add("logout", () => {
	//Click on Logout link
	cy.contains('EO').should('be.visible').click()
	cy.contains('Logout').should('be.visible').click()
	cy.wait(10000)
	
	//Verify Login page login button
	//cy.url().should('contains','Logout.aspx')
	cy.contains('Login').should('be.visible')
})