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

const sourceTypeRequiredText = 'Please select a source type'
const sourceDestRequiredText = 'Please select a source description'

const noVehicleSelectedConfirmationText = 'No interested vehicle has been selected'
const confirmDialogCancelText = "NO"


const confirmationDialogClass = '.driveDialogAlert';
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

    it('Test 2 - Verify Add New Customer form fields', () => {

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

    it('Test 3 - Verify Type dropdown field', () => {
      cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.customerType).within(()=>{
        cy.contains("Individual")
        cy.contains("Company")
      });
    })

    it('Test 4 - Validate Type field selected as Individual', () => {

        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.customerType).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.customerType).select(individualType)
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.firstName).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.lastName).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.companyName).should('not.be.visible')

    })


    it('Test 5 - Verify Type field value, if user enters first name and last name in Add new customer serch window.', () => {
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

    it('Test 6 - Verify Type field value, if user enters Company Name in Add new customer serch window.', () => {
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

    it('Test 7 - Validate Type field selected as Company', () => {

        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.customerType).should('be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.customerType).select(companyType)
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.firstName).should('not.be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.lastName).should('not.be.visible')
        cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.companyName).should('be.visible')

    })

    it('Test 8 - Verify Source dropdown field', () => {
      cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.sourceType).within(()=>{
        cy.contains("Showroom")
        cy.contains("Phone")
        // cy.contains("Campaign")
      });
    })

    it('Test 9 - Verify Cancel and Add Customer Buttons in Add New Customer form', () => {
      cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).within(()=>{
        cy.contains(HTMLElementSelectors.addNewCustomerDialog.buttons.cancel)
        cy.contains(HTMLElementSelectors.addNewCustomerDialog.buttons.addNewCustomer)
      })
    })

    it('Test 10 - Validate default Salespeople assign to the Customer', () => {
      cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).within(()=>{
        cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeople).within(()=>{
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeopleList).first().within(() => {
                cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeopleProfile).should('be.visible')
            })
          })
      })
    })

    it('Test 11 - Remove salespeople which assigned', () => {
      cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).within(()=>{
        cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeople).within(()=>{
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeopleList).first().within(() => {
                cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeopleProfile).click()
            })
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeopleList).first().children().last().within(() => {
                cy.get(HTMLElementSelectors.addNewCustomerDialog.buttons.salesPersonRemoveButton).click()
            })
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeopleList).first().within(() => {
                cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeopleProfile).should('not.be.visible')
            })
          })
      })
    })


    it('Test 12 - Add salespeople to the Customer', () => {
      cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).within(()=>{
        cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeople).within(()=>{
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeopleAddNewList)
            .each(($el, index, $list) => {
                cy.wrap($el).click()
                cy.wrap($el).within(() => {
                    cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.addSalesPersonInput).should('be.visible')
                    cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.addSalesPersonInput).type('big')
                    // To be replaced with respective api call
                    // cy.wait(2000)
                    cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.addSalesPersonsListLi).first().click()
                })
              })
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeopleList)
                .each(($el, index, $list) => {
                cy.wrap($el).should('not.have.class', 'addNew')
              })


            //Remove assigned sales poeople
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeopleList)
            .each(($el, index, $list) => {
                cy.wrap($el).click()
                cy.wrap($el).children().last().within(() => {
                    cy.get(HTMLElementSelectors.addNewCustomerDialog.buttons.salesPersonRemoveButton).click()
                })
              })
          })
      })
    })


    it('Test 13 - Search Existing salespeople in that store', () => {
      cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).within(()=>{
        cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeople).within(()=>{
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeopleAddNewList).first().click()
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeopleAddNewList).first().within(() => {
                cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.addSalesPersonInput).should('be.visible')
                cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.addSalesPersonInput).type('big')
                cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.addSalesPersonsListLi).first().contains('Big Daddy')
            })
          })
      })
    })

    it('Test 14 - Search NOT Existing salespeople in that store', () => {
      cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).within(()=>{
        cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeople).within(()=>{
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeopleAddNewList).first().click()
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.salesPeopleAddNewList).first().within(() => {
                cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.addSalesPersonInput).should('be.visible')
                cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.addSalesPersonInput).type('abcdefgh')
                cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.addSalesPersonsListLi).contains('No Results Found')
            })
          })
      })
    })


    it('Test 15 - Search Existing BDC in that store', () => {
      cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).within(()=>{
        cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.bdc).within(()=>{
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.bdcAddNewList).first().click()
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.bdcAddNewList).first().within(() => {
                cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.addBDCInput).should('be.visible')
                cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.addBDCInput).type('big')
                cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.addBDCListLi).first().contains('Big Daddy')
            })
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.bdcAddNewList).first().within(() => {
                cy.get(HTMLElementSelectors.addNewCustomerDialog.buttons.bdcCloseButton).first().click()
            })
          })
      })
    })

    it('Test 14 - Search NOT Existing BDC in that store', () => {
      cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).within(()=>{
        cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.bdc).within(()=>{
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.bdcAddNewList).first().click()
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.bdcAddNewList).first().within(() => {
                cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.addBDCInput).should('be.visible')
                cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.addBDCInput).type('abcdefgh')
                cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.addBDCListLi).first().contains('No Results Found')
                cy.get(HTMLElementSelectors.addNewCustomerDialog.buttons.bdcCloseButton).first().click()
            })
          })
      })
    })


    it('Test 15 - Add BDC to the Customer', () => {
      cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).within(()=>{
        cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.bdc).within(()=>{
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.bdcAddNewList)
            .each(($el, index, $list) => {
                cy.wrap($el).click()
                cy.wrap($el).within(() => {
                    cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.addBDCInput).should('be.visible')
                    cy.get(HTMLElementSelectors.addNewCustomerDialog.inputs.addBDCInput).type('big')
                    // To be replaced with respective api call
                    // cy.wait(2000)
                    cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.addBDCListLi).first().click()
                })
              })
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.bdcList)
                .each(($el, index, $list) => {
                if($el.is(':visible')){
                    cy.wrap($el).should('not.have.class', 'addNew')
                }
              })
          })
      })
    })


    it('Test 16 - Remove BDC which assigned to Customer', () => {
      cy.get(HTMLElementSelectors.salesHome.divs.addNewCustomerDialog).within(()=>{
        cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.bdc).within(()=>{
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.bdcList)
            .each(($el, index, $list) => {
                cy.wrap($el).click()
                cy.wrap($el).children().last().within(() => {
                    cy.get(HTMLElementSelectors.addNewCustomerDialog.buttons.bdcRemoveButton).click()
                })
              })
            cy.get(HTMLElementSelectors.addNewCustomerDialog.divs.bdcList)
                .each(($el, index, $list) => {
                if($el.is(':visible')){
                    cy.wrap($el).should('have.class', 'addNew')
                }
              })
          })
      })
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
