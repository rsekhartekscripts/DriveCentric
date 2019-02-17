import * as SalesHomeElements from './../../HTMLElementSelectors/SalesHome.json';
import * as CustomerSearchDialogElements from './../../HTMLElementSelectors/CustomerSearchDialog.json';
import * as AddNewCustomerDialogElements from './../../HTMLElementSelectors/AddNewCustomerDialog.json';
import * as customersList from './../../fixtures/customers.json';
const customer = customersList[0];

const invalidData = "invalid";
const invalidPhone = "(000) 000-0000";

context('Customer Field Level Search', () => {

  describe('Enterprise User - Customer Search Dialog Navigation', () => {

    before(function () {
      cy.loginUI('enterprise')
    })

    beforeEach(() => {
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
      cy.get(SalesHomeElements.add_new_customer_button).click()
    })

    afterEach(() => {
      cy.get(CustomerSearchDialogElements.close_dialog_button).should('be.visible')
      cy.get(CustomerSearchDialogElements.close_dialog_button).click({force: true})
    })

    after(function () {
      cy.logoutUI()
    })

    it('Test 1 - Navigate to Search New Customer Dialog', () => {
      cy.get(SalesHomeElements.customer_search_dialog).should('be.visible')
    })

    it('Test 2 - Check FirstName Search Results', () => {
      cy.get(CustomerSearchDialogElements.first_name_input).clear().type(customer.firstName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button)
        cy.get(CustomerSearchDialogElements.first_name_input).clear()
      })
    })

    it('Test 3 - Check LastName Search Results', () => {
      cy.get(CustomerSearchDialogElements.last_name_input).clear().type(customer.lastName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button)
        cy.get(CustomerSearchDialogElements.last_name_input).clear()
      })
    })

    it('Test 4 - Check Company Search Results', () => {
      cy.get(CustomerSearchDialogElements.company_input).clear().type(customer.companyName)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button)
        cy.get(CustomerSearchDialogElements.company_input).clear()
      })
    })

    it('Test 5 - Check PhoneNumber Search Results', () => {
      cy.get(CustomerSearchDialogElements.phone_input).clear().type(customer.phone)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button)
        cy.get(CustomerSearchDialogElements.phone_input).clear()
      })
    })

    it('Test 6 - Check Email Search Results', () => {
      cy.get(CustomerSearchDialogElements.email_input).clear().type(customer.email)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button)
        cy.get(CustomerSearchDialogElements.email_input).clear()
      })
    })
	
	it('Test 7 - Customer First Name Search Results Verification With Valid Data ', () => {
	//Enter First Name
	cy.get(CustomerSearchDialogElements.first_name_input).clear().type(customer.firstName).should('have.value', customer.firstName)
	cy.wait('@legacy').then((xhr) => {
       //Assert for First Name Result
		cy.get(CustomerSearchDialogElements.firstName_result).each(($el, index, $list) => {
			cy.wrap($el).contains(customer.firstName)
		})
    })
   })
  
    it('Test 8 - Customer Last Name Search Results Verification With Valid Data ', () => {
	//Enter Last Name
	cy.get(CustomerSearchDialogElements.last_name_input).clear().type(customer.lastName).should('have.value', customer.lastName)
	cy.wait('@legacy').then((xhr) => {
       //Assert for Last Name Result
	   cy.get(CustomerSearchDialogElements.lastName_result).each(($el, index, $list) => {
			    cy.wrap($el).contains(customer.lastName)
		})
    })
   })
  
    it('Test 9 - Customer Phone Number Search Results Verification With Valid Data', () => {
	//Enter Phone
	cy.get(CustomerSearchDialogElements.phone_input).clear().type(customer.phone).should('have.value', customer.phone)
	cy.wait('@legacy').then((xhr) => {
		//Assert Phone Number Result
		cy.get(CustomerSearchDialogElements.phone_result).each(($el, index, $list) => {
			    cy.wrap($el).contains(customer.phone)
		})
    })	
   })
  
   it('Test 10 - Customer Company Name Search Results Verification With Valid Data', () => {
	//Enter Company Name
	cy.get(CustomerSearchDialogElements.company_input).clear().type(customer.companyName).should('have.value', customer.companyName)
	cy.wait('@legacy').then((xhr) => {
		//Assert for Company Verification
		cy.get(CustomerSearchDialogElements.company_result).invoke('text').then((text) => {
		expect(customer.companyName).equal(text.trim())
		})
    })	
   })
  
   it('Test 11 - Customer Email Search Results Verification With Valid Data', () => {
	 //Enter Email
	cy.get(CustomerSearchDialogElements.email_input).clear().type(customer.email).should('have.value', customer.email)
	cy.wait('@legacy').then((xhr) => {
		//Assert for Email Verification
		cy.get(CustomerSearchDialogElements.email_result).each(($el, index, $list) => {
			    cy.wrap($el).contains(customer.email)
		})
    })	
   })
   
   it('Test 12 - Customer First & Last Name Search Results Verification With Valid Data ', () => {
	//Enter First Name
	cy.get(CustomerSearchDialogElements.first_name_input).clear().type(customer.firstName).should('have.value', customer.firstName)
	
	//Enter Last Name
	cy.get(CustomerSearchDialogElements.last_name_input).clear().type(customer.lastName).should('have.value', customer.lastName)
	
	cy.wait('@legacy').then((xhr) => {
       //Assert for First Name Result
	   cy.get(CustomerSearchDialogElements.firstName_result).each(($el, index, $list) => {
			    cy.wrap($el).contains(customer.firstName)
			})
		//Assert for Last Name Result
	   cy.get(CustomerSearchDialogElements.lastName_result).each(($el, index, $list) => {
			    cy.wrap($el).contains(customer.lastName)
		})
	 })
   })
   
   it('Test 13 - Customer First,Last Name & Phone Number Search Results Verification With Valid Data ', () => {
	//Enter First Name
	cy.get(CustomerSearchDialogElements.first_name_input).clear().type(customer.firstName).should('have.value', customer.firstName)
	
	//Enter Last Name
	cy.get(CustomerSearchDialogElements.last_name_input).clear().type(customer.lastName).should('have.value', customer.lastName)
	
	//Enter Phone
	cy.get(CustomerSearchDialogElements.phone_input).clear().type(customer.phone).should('have.value', customer.phone)
	
	cy.wait('@legacy').then((xhr) => {
       //Assert for First Name Result
	    cy.get(CustomerSearchDialogElements.firstName_result).each(($el, index, $list) => {
			    cy.wrap($el).contains(customer.firstName)
			})
		//Assert for Last Name Result
	    cy.get(CustomerSearchDialogElements.lastName_result).each(($el, index, $list) => {
			    cy.wrap($el).contains(customer.lastName)
		})
		//Assert Phone Number Result
		cy.get(CustomerSearchDialogElements.phone_result).each(($el, index, $list) => {
			    cy.wrap($el).contains(customer.phone)
		})       
    })
   })
   
   it('Test 14 - Customer First,Last Name,Phone & Email Search Results Verification With Valid Data ', () => {
	//Enter First Name
	cy.get(CustomerSearchDialogElements.first_name_input).clear().type(customer.firstName).should('have.value', customer.firstName)
	
	//Enter Last Name
	cy.get(CustomerSearchDialogElements.last_name_input).clear().type(customer.lastName).should('have.value', customer.lastName)
	
	//Enter Phone
	cy.get(CustomerSearchDialogElements.phone_input).clear().type(customer.phone).should('have.value', customer.phone)
	
	//Enter Email
	cy.get(CustomerSearchDialogElements.email_input).clear().type(customer.email).should('have.value', customer.email)
	
	cy.wait('@legacy').then((xhr) => {
        //Assert for First Name Result
	    cy.get(CustomerSearchDialogElements.firstName_result).each(($el, index, $list) => {
			    cy.wrap($el).contains(customer.firstName)
		})
		//Assert for Last Name Result
	    cy.get(CustomerSearchDialogElements.lastName_result).each(($el, index, $list) => {
			    cy.wrap($el).contains(customer.lastName)
		})
		//Assert Phone Number Result
		cy.get(CustomerSearchDialogElements.phone_result).each(($el, index, $list) => {
			    cy.wrap($el).contains(customer.phone)
		})  
		//Assert for Email Verification
		cy.get(CustomerSearchDialogElements.email_result).each(($el, index, $list) => {
			    cy.wrap($el).contains(customer.email)
		})		
     })
   })
   
    it('Test 15 - Search New customer with Valid First Name, invalid Last Name ', () => {
	//Enter First Name
	cy.get(CustomerSearchDialogElements.first_name_input).clear().type(customer.firstName).should('have.value', customer.firstName)
	
	//Enter Last Name
	cy.get(CustomerSearchDialogElements.last_name_input).clear().type(invalidData).should('have.value', invalidData)
	
	cy.wait('@legacy').then((xhr) => {
	  //Assert No results message
	  cy.get('div[aria-hidden=\'false\'][class=\'driveNewCustomerSplash show\']').within(()=>{
       cy.get('h4').contains("No results")
       cy.get('p').contains("You can continue by adding a new customer from scratch.")
      })
	  })
   })
   
   it('Test 16 - Search New customer with invalid First Name, valid Last name', () => {
	//Enter First Name
	cy.get(CustomerSearchDialogElements.first_name_input).clear().type(invalidData).should('have.value', invalidData)
	
	//Enter Last Name
	cy.get(CustomerSearchDialogElements.last_name_input).clear().type(customer.lastName).should('have.value', customer.lastName)
	
	cy.wait('@legacy').then((xhr) => {
	  //Assert No results message
	  cy.get('div[aria-hidden=\'false\'][class=\'driveNewCustomerSplash show\']').within(()=>{
       cy.get('h4').contains("No results")
       cy.get('p').contains("You can continue by adding a new customer from scratch.")
      })
	  })
   })
   
   it('Test 17 - Search New customer with Valid First Name, invalid phone number', () => {
	//Enter First Name
	cy.get(CustomerSearchDialogElements.first_name_input).clear().type(customer.firstName).should('have.value', customer.firstName)
	
	//Enter Phone Number
	cy.get(CustomerSearchDialogElements.phone_input).clear().type(invalidPhone).should('have.value', invalidPhone)
	
	 cy.wait('@legacy').then((xhr) => {
	  //Assert for First Name Result
	    cy.get(CustomerSearchDialogElements.firstName_result).each(($el, index, $list) => {
			    cy.wrap($el).contains(customer.firstName)
		})
	 })
   })
   
   it('Test 18 - Search New customer with Valid First Name, invalid email address', () => {
	//Enter First Name
	cy.get(CustomerSearchDialogElements.first_name_input).clear().type(customer.firstName).should('have.value', customer.firstName)
	
	//Enter Email
	cy.get(CustomerSearchDialogElements.email_input).clear().type(invalidData).should('have.value', invalidData)
	
	 cy.wait('@legacy').then((xhr) => {
	  //Assert for First Name Result
	    cy.get(CustomerSearchDialogElements.firstName_result).each(($el, index, $list) => {
			    cy.wrap($el).contains(customer.firstName)
		})
	 })
   })
   
   it('Test 19 - Search New customer with invalid First Name, Last Name, email,Company name and Valid phone number', () => {
	//Enter First Name
	cy.get(CustomerSearchDialogElements.first_name_input).clear().type(invalidData).should('have.value', invalidData)
	
	//Enter Last Name
	cy.get(CustomerSearchDialogElements.last_name_input).clear().type(invalidData).should('have.value', invalidData)
	
	//Enter Company Name
	cy.get(CustomerSearchDialogElements.company_input).clear().type(invalidData)
	
	//Enter Phone
	cy.get(CustomerSearchDialogElements.phone_input).clear().type(customer.phone).should('have.value', customer.phone)
	
	//Enter Email
	cy.get(CustomerSearchDialogElements.email_input).clear().type(invalidData).should('have.value', invalidData)
	
	cy.wait('@legacy').then((xhr) => {
	  //Assert Phone Number Result
		cy.get(CustomerSearchDialogElements.phone_result).each(($el, index, $list) => {
			    cy.wrap($el).contains(customer.phone)
		}) 
	  })
   })
   
   it('Test 20 - Search New customer with invalid First Name, Last Name, Company name, phone number and valid email', () => {
	//Enter First Name
	cy.get(CustomerSearchDialogElements.first_name_input).clear().type(invalidData).should('have.value', invalidData)
	
	//Enter Last Name
	cy.get(CustomerSearchDialogElements.last_name_input).clear().type(invalidData).should('have.value', invalidData)
	
	//Enter Company Name
	cy.get(CustomerSearchDialogElements.company_input).clear().type(invalidData)
	
	//Enter Phone
	cy.get(CustomerSearchDialogElements.phone_input).clear().type(invalidPhone).should('have.value', invalidPhone)
	
	//Enter Email
	cy.get(CustomerSearchDialogElements.email_input).clear().type(customer.email).should('have.value', customer.email)
	
	cy.wait('@legacy').then((xhr) => {
	  //Assert for Email Verification
		cy.get(CustomerSearchDialogElements.email_result).each(($el, index, $list) => {
			    cy.wrap($el).contains(customer.email)
		}) 
	  })
   })
   
   it('Test 21 - Search New customer without matching existing customers details (First Name,last name, phone number, Company, email)', () => {
	//Enter First Name
	cy.get(CustomerSearchDialogElements.first_name_input).clear().type(invalidData).should('have.value', invalidData)
	
	//Enter Last Name
	cy.get(CustomerSearchDialogElements.last_name_input).clear().type(invalidData).should('have.value', invalidData)
	
	//Enter Company Name
	cy.get(CustomerSearchDialogElements.company_input).clear().type(invalidData)
	
	//Enter Phone
	cy.get(CustomerSearchDialogElements.phone_input).clear().type(invalidPhone).should('have.value', invalidPhone)
	
	//Enter Email
	cy.get(CustomerSearchDialogElements.email_input).clear().type(invalidData).should('have.value', invalidData)
	
	cy.wait('@legacy').then((xhr) => {
	  //Assert No results message
	  cy.get('div[aria-hidden=\'false\'][class=\'driveNewCustomerSplash show\']').within(()=>{
       cy.get('h4').contains("No results")
       cy.get('p').contains("You can continue by adding a new customer from scratch.")
      }) 
	  })
   })
   
   it('Test 21 - Validate ADD CUSTOMER button in drive New Customer Search window', () => {
      cy.get(CustomerSearchDialogElements.first_name_input).clear()
      cy.get(CustomerSearchDialogElements.first_name_input).type(invalidData)
      cy.wait('@legacy').then((xhr) => {
        cy.contains(CustomerSearchDialogElements.add_customer_button).click()
        cy.get(SalesHomeElements.add_new_customer_dialog).should('be.visible')
        cy.get(AddNewCustomerDialogElements.customer_type_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.first_name_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.last_name_input).should('be.visible')
       // cy.get(AddNewCustomerDialogElements.company_name_input).should('not.be.visible')
        cy.get(AddNewCustomerDialogElements.email_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.phone_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.home_phone_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.address_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.city_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.state_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.zip_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.store_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.source_type_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.source_description_input).should('be.visible')
        cy.get(AddNewCustomerDialogElements.sales_people_div).should('be.visible')
        cy.get(AddNewCustomerDialogElements.bdc_div).should('be.visible')
        cy.get(AddNewCustomerDialogElements.interested_vehicle_div).contains("Interested Vehicle")
        cy.get(AddNewCustomerDialogElements.trade_in_div).contains("Trade-In")
		cy.contains(AddNewCustomerDialogElements.cancel_button).click({force: true})
      })
    })

  })
})
