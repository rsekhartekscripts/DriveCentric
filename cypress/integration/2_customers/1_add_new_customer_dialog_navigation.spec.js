const salesHomeUrl = '#/salesHome'

const addNewCustomerButton = '[data-test=header-li-newcustomer]'

const searchFirstNameTextBox = '#newFirstName'
const searchLastNameTextBox = '#newLastName'
const searchCompanyTextBox = '[placeholder=Company]'
const searchPhoneTextBox = '#newPhone'
const searchEmailTextBox = '[placeholder=Email]'
const addCustomerButton = 'Add Customer'

const addNewCustomerDialog = '.driveNewCustomerDialog'
const customerTypeDropdown = '.apptype select'
const addNewCustDialogFirstName = '.firstname input'
const addNewCustDialogLastName = '.lastname input'
const addNewCustDialogCompanyName = '.companyname input'
const addNewCustDialogEmail = '.email input'
const addNewCustDialogPhone = '.cell input'
const addNewCustDialogHomePhone = '.home input'
const addNewCustDialogAddress = '.address input'
const addNewCustDialogCity = '.city input'
const addNewCustDialogState = '.state input'
const addNewCustDialogZip = '.zip input'
const addNewCustDialogSourceType = '.sourceType select'
const addNewCustDialogSourceDesc = '.sourceDescription select'
const addNewCustDialogAddCustButton = 'Add Customer'


const searchAddCustFromScratchText = 'You can continue by adding a new customer from scratch'


const addNewCustomerTypeIndividualValue = 'number:9'
const addNewCustomerTypeCompanyValue = 'number:10'

const testFirstName = 'FtTest'
const testLastName = 'LtTest'
const testCompanyName = 'CyTest'
const testPhoneNumber = '9999999999'
const testEmailId = 'testyTest@test.com'
const testSourceType = 'Showroom'
const testSourceDesc = 'CarFax'

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

    beforeEach(() => {
      cy.loginUI('enterprise')
    })

    it('Test 1 - Required Fields Check', () => {
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

        //Source Type Required
        cy.get(addNewCustomerDialog).contains(addNewCustDialogAddCustButton).click()
        cy.get(alertDialog).should('be.visible')
        cy.get(alertDialog).contains(sourceTypeRequiredText)

        cy.get(alertDialogDone).click()
        cy.get(addNewCustDialogSourceType).select(testSourceType)

        //Source Destination Required
        cy.get(addNewCustomerDialog).contains(addNewCustDialogAddCustButton).click()
        cy.get(alertDialog).should('be.visible')
        cy.get(alertDialog).contains(sourceDestRequiredText)

        cy.get(alertDialogDone).click()
        cy.get(addNewCustDialogSourceDesc).select(testSourceDesc)

        //Interested Vehicle Confirmation
        cy.get(addNewCustomerDialog).contains(addNewCustDialogAddCustButton).click()
        cy.get(confirmationDialogClass).should('be.visible')
        cy.get(confirmationDialogClass).contains(noVehicleSelectedConfirmationText)

        cy.get(confirmationDialogClass).contains(confirmDialogCancelText).click()

        //Adding New Inventory
        cy.get(customerInterestedInventoryAddDiv).click()
        cy.get(interestedVehicleOption).contains(addInventoryButton)

        cy.get(interestedVehicleOption).get(closeInterestedVehicleOptionsButton).click()
        cy.get(interestedVehicleOption).contains(addInventoryButton).should('be.hidden')

        //Open Existing Inventory Dialog
        cy.get(customerInterestedInventoryAddDiv).click()
        cy.get(interestedVehicleOption).contains(addInventoryButton).click()

      })
    })

  })

})
