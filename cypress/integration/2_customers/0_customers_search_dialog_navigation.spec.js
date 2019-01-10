import * as SalesHomeElements from './../../HTMLElementSelectors/SalesHome.json';
import * as CustomerSearchDialogElements from './../../HTMLElementSelectors/CustomerSearchDialog.json';
import * as searchData from './../../testdata/NewCustomerSearchData.json';

const customer = {
    "firstName": "Appointment",
    "lastName": "One",
    "email": "testEmail@test.com",
    "phone": "9999999999",
    "companyName": "Test Company"
  }


context('Customer', () => {

  describe('All Perms User - Customer Search Dialog Navigation', () => {

    before(function () {
      cy.loginUI('enterprise')
    })

    beforeEach(() => {
      cy.server()
      cy.route({
        method: 'POST',
        url: '/api/legacy',
      }).as('legacy')
    })

	afterEach(function () {
       cy.get(CustomerSearchDialogElements.first_name_input).clear()
	   cy.get(CustomerSearchDialogElements.last_name_input).clear()
	   cy.get(CustomerSearchDialogElements.company_input).clear()
	   cy.get(CustomerSearchDialogElements.phone_input).clear()
	   cy.get(CustomerSearchDialogElements.email_input).clear()	   
    })
	
    it('Test 1 - Navigate to Search New Customer Dialog', () => {
      cy.get(SalesHomeElements.add_new_customer_button).click()
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
	cy.get(CustomerSearchDialogElements.first_name_input).clear().type(searchData.firstname).should('have.value', searchData.firstname)
	cy.wait('@legacy').then((xhr) => {
       //Assert for First Name Result
		cy.get(CustomerSearchDialogElements.firstName_result).invoke('text').then((text) => {
		expect(searchData.firstname).equal(text.trim())
		})
    })
   })
  
    it('Test 8 - Customer Last Name Search Results Verification With Valid Data ', () => {
	//Enter Last Name
	cy.get(CustomerSearchDialogElements.last_name_input).clear().type(searchData.lastname).should('have.value', searchData.lastname)
	cy.wait('@legacy').then((xhr) => {
       //Assert for Last Name Result
		cy.get(CustomerSearchDialogElements.lastName_result).invoke('text').then((text) => {
		expect(searchData.lastname).equal(text.trim())
		})
    })
   })
  
    it('Test 9 - Customer Phone Number Search Results Verification With Valid Data', () => {
	//Enter Phone
	cy.get(CustomerSearchDialogElements.phone_input).clear().type(searchData.phone).should('have.value', searchData.phone)
	cy.wait('@legacy').then((xhr) => {
		//Assert Phone Number Result
		cy.get(CustomerSearchDialogElements.phone_result).invoke('text').then((text) => {
		expect(searchData.phone).equal(text.trim())
		})
    })	
   })
  
   it('Test 10 - Customer Company Name Search Results Verification With Valid Data', () => {
	//Enter Company Name
	cy.get(CustomerSearchDialogElements.company_input).clear().type(searchData.company).should('have.value', searchData.company)
	cy.wait('@legacy').then((xhr) => {
		//Assert for Company Verification
		cy.get(CustomerSearchDialogElements.company_result).invoke('text').then((text) => {
		expect(searchData.company).equal(text.trim())
		})
    })	
   })
  
   it('Test 11 - Customer Email Search Results Verification With Valid Data', () => {
	 //Enter Email
	cy.get(CustomerSearchDialogElements.email_input).clear().type(searchData.email).should('have.value', searchData.email)
	cy.wait('@legacy').then((xhr) => {
		//Assert for Email Verification
		cy.get(CustomerSearchDialogElements.email_result).invoke('text').then((text) => {
		expect(searchData.email).equal(text.trim())
		})
    })	
   })
   
   it('Test 12 - Customer First & Last Name Search Results Verification With Valid Data ', () => {
	//Enter First Name
	cy.get(CustomerSearchDialogElements.first_name_input).clear().type(searchData.firstname).should('have.value', searchData.firstname)
	
	//Enter Last Name
	cy.get(CustomerSearchDialogElements.last_name_input).clear().type(searchData.lastname).should('have.value', searchData.lastname)
	
	cy.wait('@legacy').then((xhr) => {
       //Assert for First Name Result
		cy.get(CustomerSearchDialogElements.firstName_result).invoke('text').then((text) => {
		expect(searchData.firstname).equal(text.trim())
		})
		//Assert for Last Name Result
		cy.get(CustomerSearchDialogElements.lastName_result).invoke('text').then((text) => {
		expect(searchData.lastname).equal(text.trim())
		})
    })
   })
   
   it('Test 13 - Customer First,Last Name & Phone Number Search Results Verification With Valid Data ', () => {
	//Enter First Name
	cy.get(CustomerSearchDialogElements.first_name_input).clear().type(searchData.firstname).should('have.value', searchData.firstname)
	
	//Enter Last Name
	cy.get(CustomerSearchDialogElements.last_name_input).clear().type(searchData.lastname).should('have.value', searchData.lastname)
	
	//Enter Phone
	cy.get(CustomerSearchDialogElements.phone_input).clear().type(searchData.phone).should('have.value', searchData.phone)
	
	cy.wait('@legacy').then((xhr) => {
       //Assert for First Name Result
		cy.get(CustomerSearchDialogElements.firstName_result).invoke('text').then((text) => {
		expect(searchData.firstname).equal(text.trim())
		})
		//Assert for Last Name Result
		cy.get(CustomerSearchDialogElements.lastName_result).invoke('text').then((text) => {
		expect(searchData.lastname).equal(text.trim())
		})
		//Assert Phone Number Result
		cy.get(CustomerSearchDialogElements.phone_result).invoke('text').then((text) => {
		expect(searchData.phone).equal(text.trim())
		})        
    })
   })
   
   it('Test 14 - Customer First,Last Name,Phone & Email Search Results Verification With Valid Data ', () => {
	//Enter First Name
	cy.get(CustomerSearchDialogElements.first_name_input).clear().type(searchData.firstname).should('have.value', searchData.firstname)
	
	//Enter Last Name
	cy.get(CustomerSearchDialogElements.last_name_input).clear().type(searchData.lastname).should('have.value', searchData.lastname)
	
	//Enter Phone
	cy.get(CustomerSearchDialogElements.phone_input).clear().type(searchData.phone).should('have.value', searchData.phone)
	
	 //Enter Email
	cy.get(CustomerSearchDialogElements.email_input).clear().type(searchData.email).should('have.value', searchData.email)
	
	cy.wait('@legacy').then((xhr) => {
       //Assert for First Name Result
		cy.get(CustomerSearchDialogElements.firstName_result).invoke('text').then((text) => {
		expect(searchData.firstname).equal(text.trim())
		})
		//Assert for Last Name Result
		cy.get(CustomerSearchDialogElements.lastName_result).invoke('text').then((text) => {
		expect(searchData.lastname).equal(text.trim())
		})
		//Assert Phone Number Result
		cy.get(CustomerSearchDialogElements.phone_result).invoke('text').then((text) => {
		expect(searchData.phone).equal(text.trim())
		})     
		//Assert for Email Verification
		cy.get(CustomerSearchDialogElements.email_result).invoke('text').then((text) => {
		expect(searchData.email).equal(text.trim())
		})		
    })
   })
	
  })
})
