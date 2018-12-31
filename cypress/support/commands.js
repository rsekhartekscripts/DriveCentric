const powerUserId = 'ECE1D8E2-1903-4756-8318-129BDD06D092'
const webIdentifier = '1+2+3'
const loginPath = 'login.aspx'
const usernameInput = '[data-test=login-textinput-username]'
const passwordInput = '[data-test=login-textinput-password]'
const loginButton = '[data-test=login-button-login]'

function addEscapeChars(str) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

Cypress.Commands.add('inputUsername', (user) => {
    cy.get(usernameInput).type(user.email)
})

Cypress.Commands.add('inputPassword', (user) => {
  cy.get(passwordInput).type(user.password)
})

Cypress.Commands.add('clickLoginButton', () => {
  cy.get(loginButton).click()
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
  cy.visit(loginPath)
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


Cypress.Commands.add('createAppointment', (appointmentType, customerType, storeType, userType) => {
  cy.getAppointments().then(appointments => {
    cy.getStaticCustomers().then(customers => {
      cy.getStores().then(stores => {
        cy.getUsers().then(users => {
          const appointment = appointments[appointmentType]
          const customerId = customers[customerType].id
          const store = stores[storeType]
          const user = users[userType]
          return cy.request({
            method: 'POST',
            url: `/api/customers/${customerId}/appointment`,
            headers: {
              storeGuid: store.id,
              userGuid: powerUserId,
              webIdentifier: webIdentifier
            },
            body: {
              AppointmentType: appointment.type,
              Date: Cypress.moment().format('M-D-YYYY'),
              IsOverrideOverlappingAppointmentException: true,
              Notes: appointment.notes,
              ScheduleForUserId: user.id,
              Time: Cypress.moment().format('h:mm A')
            }
          })
        })
      })
    })
  })
})

Cypress.Commands.add('deleteAppointment', (appointmentId, storeType) => {
  cy.getStores().then(stores => {
    return cy.request({
      method: 'DELETE',
      url: `/api/appointments/${appointmentId}`,
      headers: {
        storeGuid: stores[storeType].id,
        userGuid: powerUserId,
        webIdentifier: webIdentifier
      }
    })
  })
})

Cypress.Commands.add('clockInUser', (storeType, userType) => {
  cy.getStores().then(stores => {
    cy.getUsers().then(users => {
      const store = stores[storeType]
      const user = users[userType]
      const jsonBody = addEscapeChars(JSON.stringify({
        ThreadGroupID: 'user_1_',
        ClassName: 'DriveUser',
        Method: 'ClockUserIn',
        Parameters: {
          requestedByUserGUID: user.id,
          requestedFromStoreGUID: store.id,
        }
      }))
      return cy.request({
        method: 'POST',
        url: 'https://dev.drivecentric.com/api/legacy',
        headers: {
          'content-type': 'application/json; charset=utf-8',
          storeGuid: store.id,
          userGuid: powerUserId,
          webIdentifier: webIdentifier
        },
        body: `"${jsonBody}"`
      })
    })
  })
})

Cypress.Commands.add('clockOutUser', (storeType, userType) => {
  cy.getStores().then(stores => {
    cy.getUsers().then(users => {
      const store = stores[storeType]
      const user = users[userType]
      const jsonBody = addEscapeChars(JSON.stringify({
        ThreadGroupID: 'user_1_',
        ClassName: 'DriveUser',
        Method: 'ClockUserOut',
        Parameters: {
          requestedByUserGUID: user.id,
          requestedFromStoreGUID: store.id,
        }
      }))
      return cy.request({
        method: 'POST',
        url: 'https://dev.drivecentric.com/api/legacy',
        headers: {
          'content-type': 'application/json; charset=utf-8',
          storeGuid: store.id,
          userGuid: powerUserId,
          webIdentifier: webIdentifier
        },
        body: `"${jsonBody}"`
      })
    })
  })
})
Cypress.Commands.add("login", (email, password) => {
	//Open DriveCentri URL
    cy.visit('https://staging1.drivecentric.com')
	
	//Verify login page URL and Page Title
	cy.url().should('include', '/login.aspx')
	cy.title().should('contain', 'Login / DriveCentric');
	
	//Enter Username and Password
	cy.get('[name=inputEmail]').type(email).should('have.value', email)
	cy.get('[name=inputPassword]').type(password).should('have.value', password)
	
	//Click on Login Button
	cy.contains('Login').click()
	cy.wait(10000)
	
	//Verification for Home Url and Page Title
	cy.hash().should('eq','#/salesHome')
	cy.title().should('contain', 'Home / DriveCentric');
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