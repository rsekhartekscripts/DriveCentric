import * as TopNavigationHeader from './../../HTMLElementSelectors/TopNavigationHeader.json';
import * as customersList from './../../fixtures/customers.json';
const customer = customersList[0];

context('Appointments', () => {

    describe('Enterprise User - Add New Appointment', () => {
		before(function () {
	       cy.loginUI('enterprise')
		})

	    beforeEach(() => {
	      cy.server()
	      cy.route({
	        method: 'POST',
	        url: '/api/legacy/DriveSearch/QuickSearch',
	      }).as('QuickSearch')
	    })
	    
	  
	    it('Validate Add Appointment Tab visibility', function() {
		    //Enter Customer First Name
			cy.get(TopNavigationHeader.global_search_textbox).clear().type(customer.firstName+" "+customer.lastName)
			cy.wait('@QuickSearch').then((xhr) => {
				//Verify the displayed results
				cy.get(TopNavigationHeader.displayed_result).then(($list) => {
		          if($list.length > 0){
		            cy.wrap($list).first().click()
		            cy.get(CustomerCardElements.main_div).should('be.visible')
		            cy.get(CustomerCardElements.contact_card_button).should('be.visible')
		            cy.get(CustomerCardElements.contact_card_button).click()
		            cy.get(CustomerContactCardElements.main_div).should('be.visible')
		          }
		        })
		    })
			
		  
		})

		it('Customer Last Name Search ', function() {
			//Enter Customer Last Name
			cy.get(TopNavigationHeader.global_search_textbox).clear().type('Schwartz').should('have.value', 'Schwartz')
			cy.wait('@QuickSearch').then((xhr) => {
				//Verify the displayed results
				cy.get(TopNavigationHeader.displayed_result).each(($el, index, $list) => {
				    cy.wrap($el).contains('Schwartz')
				})
		    })
		})

		it('Customer First and Last Name Search ', function() {
			//Enter Customer Fisrt and Last Name
			cy.get(TopNavigationHeader.global_search_textbox).clear().type('Roger Schwartz').should('have.value', 'Roger Schwartz')
			cy.wait('@QuickSearch').then((xhr) => {
				//Verify the displayed results
				cy.get(TopNavigationHeader.displayed_result).each(($el, index, $list) => {
				    cy.wrap($el).contains(/Roger|Schwartz/)
				})
			})
		  
		}) 

	})
})


