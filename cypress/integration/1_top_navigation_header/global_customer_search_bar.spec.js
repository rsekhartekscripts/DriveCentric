import * as TopNavigationHeader from './../../HTMLElementSelectors/TopNavigationHeader.json';

context('Global Customer Search', () => {

    describe('All Perms User - Global Customer Search', () => {
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
	    
		// after(function () {
		// 	//Logout From DriveCentric
		// 	cy.wait(3000)
		//     cy.logout()
		// })
	  
	    it('Customer First Name Search ', function() {
		    //Enter Customer First Name
			cy.get(TopNavigationHeader.global_search_textbox).clear().type('Roger').should('have.value', 'Roger')
			cy.wait('@QuickSearch').then((xhr) => {
				//Verify the displayed results
				cy.get(TopNavigationHeader.displayed_result).each(($el, index, $list) => {
				    cy.wrap($el).contains('Roger')
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


