const salesHomeUrl = '#/salesHome'

const addNewCustomerButton = '[data-test=header-li-newcustomer]'

const addNewCustSearchDialog = '[data-test=dialog-newCustomer-div-container]'

const searchFirstNameTextBox = '#newFirstName'
const searchLastNameTextBox = '#newLastName'
const searchCompanyTextBox = '[placeholder=Company]'
const searchPhoneTextBox = '#newPhone'
const searchEmailTextBox = '[placeholder=Email]'
const addCustomerButton = 'Add Customer'
const customerTypeDropdown = '.apptype select'

const addNewCustomerDialog = '.driveNewCustomerDialog'
const addNewCustDialogFirstName = '.firstname input'
const addNewCustDialogLastName = '.lastname input'
const addNewCustDialogCompanyName = '.companyname input'
const addNewCustDialogEmail = '.email input'
const addNewCustDialogPhone = '.cell input'


const searchAddCustFromScratchText = 'You can continue by adding a new customer from scratch'


const addNewCustomerTypeIndividualValue = 'number:9'
const addNewCustomerTypeCompanyValue = 'number:10'

const testFirstName = 'FtTest'
const testLastName = 'LtTest'
const testCompanyName = 'CyTest'
const testPhoneNumber = '9999999999'
const testEmailId = 'testyTest@test.com'

function navigateToSalesHomePage() {
  cy.visit(salesHomeUrl)
}

context('Customer', () => {

  describe('All Perms User - Customer Search Dialog Navigation', () => {

    beforeEach(() => {
      cy.loginUI('allPerms')
    })

    it('Test 1 - Navigate to Search New Customer Dialog', () => {
      // navigateToSalesHomePage()
      cy.get(addNewCustomerButton).click()
      cy.get(addNewCustSearchDialog).should('be.visible')
    })

    it('Test 2 - Check FirstName Search Results', () => {
      cy.get(addNewCustomerButton).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(searchFirstNameTextBox).type(testFirstName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(searchAddCustFromScratchText)
        cy.contains(addCustomerButton)
      })
    })

    it('Test 3 - Check LastName Search Results', () => {
      cy.get(addNewCustomerButton).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(searchLastNameTextBox).type(testLastName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(searchAddCustFromScratchText)
        cy.contains(addCustomerButton)
      })
    })

    it('Test 4 - Check Company Search Results', () => {
      cy.get(addNewCustomerButton).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(searchCompanyTextBox).type(testCompanyName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(searchAddCustFromScratchText)
        cy.contains(addCustomerButton)
      })
    })

    it('Test 5 - Check PhoneNumber Search Results', () => {
      cy.get(addNewCustomerButton).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(searchPhoneTextBox).type(testPhoneNumber)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(searchAddCustFromScratchText)
        cy.contains(addCustomerButton)
      })
    })

    it('Test 6 - Check Email Search Results', () => {
      cy.get(addNewCustomerButton).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(searchEmailTextBox).type(testEmailId)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(searchAddCustFromScratchText)
        cy.contains(addCustomerButton)
      })
    })

    it('Test 7 - Check Add Customer Dialog Visibility', () => {
      cy.get(addNewCustomerButton).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(searchFirstNameTextBox).type(testFirstName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(searchAddCustFromScratchText)
        cy.contains(addCustomerButton).click()
        cy.get(addNewCustomerDialog).should('be.visible')
      })
    })

    it('Test 8 - Check Add Customer Dialog Type Individual', () => {
      cy.get(addNewCustomerButton).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(searchFirstNameTextBox).type(testFirstName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(searchAddCustFromScratchText)
        cy.contains(addCustomerButton).click()
        cy.get(addNewCustomerDialog).should('be.visible')
        cy.get(customerTypeDropdown).should('have.value', addNewCustomerTypeIndividualValue)
      })
    })

    it('Test 9 - Check Add Customer Dialog Type Company', () => {
      cy.get(addNewCustomerButton).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(searchCompanyTextBox).type(testCompanyName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(searchAddCustFromScratchText)
        cy.contains(addCustomerButton).click()
        cy.get(addNewCustomerDialog).should('be.visible')
        cy.get(customerTypeDropdown).should('have.value', addNewCustomerTypeCompanyValue)
      })
    })

    it('Test 10 - Check Individual Values entered in search dialog with Add New Customer dialog', () => {
      cy.get(addNewCustomerButton).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(searchFirstNameTextBox).type(testFirstName)
      cy.get(searchLastNameTextBox).type(testLastName)
      cy.get(searchPhoneTextBox).type(testPhoneNumber)
      cy.get(searchEmailTextBox).type(testEmailId)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(searchAddCustFromScratchText)
        cy.contains(addCustomerButton).click()
        cy.get(addNewCustomerDialog).should('be.visible')
        cy.get(customerTypeDropdown).should('have.value', addNewCustomerTypeIndividualValue)
        cy.get(addNewCustDialogFirstName).should('have.value', testFirstName)
        cy.get(addNewCustDialogLastName).should('have.value', testLastName)
        cy.get(addNewCustDialogEmail).should('have.value', testEmailId)
        cy.get(addNewCustDialogPhone).should('have.value', testPhoneNumber)
      })
    })

    it('Test 11 - Check Individual Values entered in search dialog with Add New Customer dialog', () => {
      cy.get(addNewCustomerButton).click()
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(searchCompanyTextBox).type(testCompanyName)
      cy.get(searchPhoneTextBox).type(testPhoneNumber)
      cy.get(searchEmailTextBox).type(testEmailId)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(searchAddCustFromScratchText)
        cy.contains(addCustomerButton).click()
        cy.get(addNewCustomerDialog).should('be.visible')
        cy.get(customerTypeDropdown).should('have.value', addNewCustomerTypeCompanyValue)
        cy.get(addNewCustDialogCompanyName).should('have.value', testCompanyName)
        cy.get(addNewCustDialogEmail).should('have.value', testEmailId)
        cy.get(addNewCustDialogPhone).should('have.value', testPhoneNumber)
      })
    })

  })

})
