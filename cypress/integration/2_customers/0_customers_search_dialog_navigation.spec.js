import HTMLElementSelectors from './../../HTMLElementSelectors';

const addNewCustomerTypeIndividualValue = 'number:9'
const addNewCustomerTypeCompanyValue = 'number:10'

const customer = {
    "firstName": "Appointment",
    "lastName": "One",
    "email": "testEmail@test.com",
    "phone": "9999999999",
    "companyName": "Test Company"
  }


context('Customer', () => {

  describe('All Perms User - Customer Search Dialog Navigation', () => {

    beforeEach(() => {
      cy.loginUI('enterprise')
    })

    // it('Test 1 - Navigate to Search New Customer Dialog', () => {
    //   cy.get(HTMLElementSelectors.salesHome.buttons.addNewCustomer).click()
    //   cy.get(HTMLElementSelectors.salesHome.divs.customerSearchDialog).should('be.visible')
    // })

    it('Test 2 - Check FirstName Search Results', () => {
      cy.get(HTMLElementSelectors.salesHome.buttons.addNewCustomer).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.firstName).type(customer.firstName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(HTMLElementSelectors.customerSearchDialog.buttons.addCustomerButton)
      })
    })

    it('Test 3 - Check LastName Search Results', () => {
      cy.get(HTMLElementSelectors.salesHome.buttons.addNewCustomer).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.lastName).type(customer.lastName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(HTMLElementSelectors.customerSearchDialog.buttons.addCustomerButton)
      })
    })

    it('Test 4 - Check Company Search Results', () => {
      cy.get(HTMLElementSelectors.salesHome.buttons.addNewCustomer).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.company).type(customer.companyName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(HTMLElementSelectors.customerSearchDialog.buttons.addCustomerButton)
      })
    })

    it('Test 5 - Check PhoneNumber Search Results', () => {
      cy.get(HTMLElementSelectors.salesHome.buttons.addNewCustomer).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.phone).type(customer.phone)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(HTMLElementSelectors.customerSearchDialog.buttons.addCustomerButton)
      })
    })

    it('Test 6 - Check Email Search Results', () => {
      cy.get(HTMLElementSelectors.salesHome.buttons.addNewCustomer).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.email).type(customer.email)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(HTMLElementSelectors.customerSearchDialog.buttons.addCustomerButton)
      })
    })

    it('Test 7 - Check Add Customer Dialog Visibility', () => {
      cy.get(HTMLElementSelectors.salesHome.buttons.addNewCustomer).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.firstName).type(customer.firstName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(HTMLElementSelectors.customerSearchDialog.buttons.addCustomerButton).click()
        cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).should('be.visible')
      })
    })

    it('Test 8 - Check Add Customer Dialog Type Individual', () => {
      cy.get(HTMLElementSelectors.salesHome.buttons.addNewCustomer).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.firstName).type(customer.firstName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(HTMLElementSelectors.customerSearchDialog.buttons.addCustomerButton).click()
        cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).should('be.visible')
        cy.get(HTMLElementSelectors.HTMLElementSelectors.salesHome.divs.addNewCustomerDialog.inputs.customerType).should('have.value', addNewCustomerTypeIndividualValue)
      })
    })

    it('Test 9 - Check Add Customer Dialog Type Company', () => {
      cy.get(HTMLElementSelectors.salesHome.buttons.addNewCustomer).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.company).type(customer.companyName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(HTMLElementSelectors.customerSearchDialog.buttons.addCustomerButton).click()
        cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).should('be.visible')
        cy.get(HTMLElementSelectors.HTMLElementSelectors.salesHome.divs.addNewCustomerDialog.inputs.customerType).should('have.value', addNewCustomerTypeCompanyValue)
      })
    })

    it('Test 10 - Check Individual Values entered in search dialog with Add New Customer dialog', () => {
      cy.get(HTMLElementSelectors.salesHome.buttons.addNewCustomer).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.firstName).type(customer.firstName)
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.lastName).type(customer.lastName)
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.phone).type(customer.phone)
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.email).type(customer.email)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(HTMLElementSelectors.customerSearchDialog.buttons.addCustomerButton).click()
        cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).should('be.visible')
        cy.get(HTMLElementSelectors.HTMLElementSelectors.salesHome.divs.addNewCustomerDialog.inputs.customerType).should('have.value', addNewCustomerTypeIndividualValue)
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.firstName).should('have.value', customer.firstName)
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.lastName).should('have.value', customer.lastName)
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.email).should('have.value', customer.email)
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.phone).should('have.value', customer.phone)
      })
    })

    it('Test 11 - Check Individual Values entered in search dialog with Add New Customer dialog', () => {
      cy.get(HTMLElementSelectors.salesHome.buttons.addNewCustomer).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.company).type(customer.companyName)
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.phone).type(customer.phone)
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.email).type(customer.email)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(HTMLElementSelectors.customerSearchDialog.buttons.addCustomerButton).click()
        cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).should('be.visible')
        cy.get(HTMLElementSelectors.HTMLElementSelectors.salesHome.divs.addNewCustomerDialog.inputs.customerType).should('have.value', addNewCustomerTypeCompanyValue)
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.companyName).should('have.value', customer.companyName)
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.email).should('have.value', customer.email)
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.phone).should('have.value', customer.phone)
      })
    })

  })

})
