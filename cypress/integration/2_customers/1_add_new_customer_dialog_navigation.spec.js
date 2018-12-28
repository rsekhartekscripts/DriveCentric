import HTMLElementSelectors from './../../HTMLElementSelectors';

const customer = {
    "firstName": "Appointment",
    "lastName": "One",
    "email": "testEmail@test.com",
    "phone": "9999999999",
    "companyName": "Test Company"
  }



const individualType = "Individual";
const companyType = "Company";

const alertDialog = '[data-test=dialog-alert-div]'
const alertDialogDone = '[data-test=dialog-alert-button-done]';
const sourceTypeRequiredText = 'Please select a source type'
const sourceDestRequiredText = 'Please select a source description'

const confirmationDialogClass = '.driveDialogAlert';
const noVehicleSelectedConfirmationText = 'No interested vehicle has been selected'
const confirmDialogCancelText = "NO"


const customerInterestedInventoryAddDiv = '.driveNewCustomerVehicleInterested .add'

const interestedVehicleOption = '.driveNewCustomerVehicleInterested .srNewContent'

const closeInterestedVehicleOptionsButton = '.srContentCustomerClose'
const addInventoryButton = 'Add Inventory'
const addCustomeInventoryButton = 'Add Custom'


function navigateToSalesHomePage() {
  cy.visit(salesHomeUrl)
}

context('Customer', () => {

  describe('All Perms User - Add New Customer Dialog Navigation', () => {

    before(() => {
      cy.loginUI('enterprise')
    })

    beforeEach(() => {
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
    })



    it('Test 1 - Check Add Customer Dialog Visibility', () => {
      cy.get(HTMLElementSelectors.salesHome.buttons.addNewCustomer).click()
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.firstName).type(customer.firstName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(HTMLElementSelectors.customerSearchDialog.buttons.addCustomerButton).click()
        cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).should('be.visible')
      })
    })

    it('Test 2 - Form Elements Existance', () => {

        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.customerType).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.customerType).select(individualType)
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.firstName).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.lastName).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.companyName).should('not.be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.email).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.phone).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.homePhone).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.address).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.city).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.state).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.zip).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.store).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.sourceType).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.sourceDescription).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeople).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.bdc).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.interestedVehicles).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.tradeIn).should('be.visible')

        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.customerType).select(companyType)
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.firstName).should('not.be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.lastName).should('not.be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.companyName).should('be.visible')

    })


    it('Test 3 - Check Add Customer Dialog Type Individual', () => {
      cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).within(()=>{
        cy.contains(HTMLElementSelectors.addNewCustomerDialog.buttons.cancel).click()
      })
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.firstName).type(customer.firstName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(HTMLElementSelectors.customerSearchDialog.buttons.addCustomerButton).click()
        cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.customerType).find(':selected').contains(individualType)
      })
    })

    it('Test 4 - Check Add Customer Dialog Type Company', () => {
      cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).within(()=>{
        cy.contains(HTMLElementSelectors.addNewCustomerDialog.buttons.cancel).click()
      })
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.firstName).clear()
      cy.get(HTMLElementSelectors.customerSearchDialog.inputs.company).type(customer.companyName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(HTMLElementSelectors.customerSearchDialog.buttons.addCustomerButton).click()
        cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.customerType).find(':selected').contains(companyType)
      })
    })

    it('Test 5 - Customer Type Values Check', () => {
      cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.customerType).within(()=>{
        cy.contains("Individual")
        cy.contains("Company")
      });
    })

    it('Test 6 - Source Type Values Check', () => {
      cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.sourceType).within(()=>{
        cy.contains("Showroom")
        cy.contains("Phone")
        // cy.contains("Campaign")
      });
    })



    // it('Test 2 - Required Fields Check', () => {
    //   cy.get(addNewCustomerButton).click()
    //   cy.server()
    //   cy.route({
    //     method: 'POST',
    //     url: '/api/legacy',
    //   }).as('legacy')
    //   cy.get(searchFirstNameTextBox).type(testFirstName)
    //   cy.wait('@legacy').then((xhr) => {
    //     cy.contains(searchAddCustFromScratchText)
    //     cy.contains(addCustomerButton).click()
    //     cy.get(addNewCustomerDialog).should('be.visible')

    //     //Source Type Required
    //     cy.get(addNewCustomerDialog).contains(addNewCustDialogAddCustButton).click()
    //     cy.get(alertDialog).should('be.visible')
    //     cy.get(alertDialog).contains(sourceTypeRequiredText)

    //     cy.get(alertDialogDone).click()
    //     cy.get(addNewCustDialogSourceType).select(testSourceType)

    //     //Source Destination Required
    //     cy.get(addNewCustomerDialog).contains(addNewCustDialogAddCustButton).click()
    //     cy.get(alertDialog).should('be.visible')
    //     cy.get(alertDialog).contains(sourceDestRequiredText)

    //     cy.get(alertDialogDone).click()
    //     cy.get(addNewCustDialogSourceDesc).select(testSourceDesc)

    //     //Interested Vehicle Confirmation
    //     cy.get(addNewCustomerDialog).contains(addNewCustDialogAddCustButton).click()
    //     cy.get(confirmationDialogClass).should('be.visible')
    //     cy.get(confirmationDialogClass).contains(noVehicleSelectedConfirmationText)

    //     cy.get(confirmationDialogClass).contains(confirmDialogCancelText).click()

    //     //Adding New Inventory
    //     cy.get(customerInterestedInventoryAddDiv).click()
    //     cy.get(interestedVehicleOption).contains(addInventoryButton)

    //     cy.get(interestedVehicleOption).get(closeInterestedVehicleOptionsButton).click()
    //     cy.get(interestedVehicleOption).contains(addInventoryButton).should('be.hidden')

    //     //Open Existing Inventory Dialog
    //     cy.get(customerInterestedInventoryAddDiv).click()
    //     cy.get(interestedVehicleOption).contains(addInventoryButton).click()

    //   })
    // })

    // it('Test 10 - Check Individual Values entered in search dialog with Add New Customer dialog', () => {
    //   cy.get(HTMLElementSelectors.salesHome.buttons.addNewCustomer).click()
    //   cy.server()
    //   cy.route({
    //     method: 'POST',
    //     url: '/api/legacy',
    //   }).as('legacy')
    //   cy.get(HTMLElementSelectors.customerSearchDialog.inputs.firstName).type(customer.firstName)
    //   cy.get(HTMLElementSelectors.customerSearchDialog.inputs.lastName).type(customer.lastName)
    //   cy.get(HTMLElementSelectors.customerSearchDialog.inputs.phone).type(customer.phone)
    //   cy.get(HTMLElementSelectors.customerSearchDialog.inputs.email).type(customer.email)
    //   cy.wait('@legacy').then((xhr) => {
    //     cy.contains(HTMLElementSelectors.customerSearchDialog.buttons.addCustomerButton).click()
    //     cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).should('be.visible')
    //     cy.get(HTMLElementSelectors.HTMLElementSelectors.salesHome.divs.addNewCustomerDialog.inputs.customerType).find(':selected').contains(individualType)
    //     cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.firstName).should('have.value', customer.firstName)
    //     cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.lastName).should('have.value', customer.lastName)
    //     cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.email).should('have.value', customer.email)
    //     cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.phone).should('have.value', customer.phone)
    //   })
    // })

    // it('Test 11 - Check Individual Values entered in search dialog with Add New Customer dialog', () => {
    //   cy.get(HTMLElementSelectors.salesHome.buttons.addNewCustomer).click()
    //   cy.server()
    //   cy.route({
    //     method: 'POST',
    //     url: '/api/legacy',
    //   }).as('legacy')
    //   cy.get(HTMLElementSelectors.customerSearchDialog.inputs.company).type(customer.companyName)
    //   cy.get(HTMLElementSelectors.customerSearchDialog.inputs.phone).type(customer.phone)
    //   cy.get(HTMLElementSelectors.customerSearchDialog.inputs.email).type(customer.email)
    //   cy.wait('@legacy').then((xhr) => {
    //     cy.contains(HTMLElementSelectors.customerSearchDialog.buttons.addCustomerButton).click()
    //     cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).should('be.visible')
    //     cy.get(HTMLElementSelectors.HTMLElementSelectors.salesHome.divs.addNewCustomerDialog.inputs.customerType).find(':selected').contains(companyType)
    //     cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.companyName).should('have.value', customer.companyName)
    //     cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.email).should('have.value', customer.email)
    //     cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.phone).should('have.value', customer.phone)
    //   })
    // })

  })

})
