import * as TopNavigationHeader from './../../HTMLElementSelectors/TopNavigationHeader.json';

context('Recent Customers Search', () => {

    describe('Enterprise User - Recent Customers Search', () => {
		before(function () {
	       cy.loginUI('enterprise')
		})

	    beforeEach(() => {
	      cy.server()
	      cy.route({
	        method: 'POST',
	        url: '/api/legacy/DriveTile/GetNotificationCounts',
	      }).as('RecentCustomers')
	    })
		
	    after(function () {
	    	cy.logoutUI()
	    }) 
	  
	    it('Verification Of Recent Customers Displayed List', function() {	
		    //Click on the Recent Customers Icon
			cy.get(TopNavigationHeader.recent_customers_icon).click();
			
			cy.wait('@RecentCustomers').then((xhr) => {				
				//wait for list display
				cy.get(TopNavigationHeader.recent_customers_loading_hide).should('exist')
				
				//Verify the header
				cy.get(TopNavigationHeader.recent_customers_heaer).should('have.text', 'Recent Customers')
				
				//Verify the displayed results
				cy.get(TopNavigationHeader.recent_customers_displayed).should('have.length', 20)
		    })			 
		})
		
		it('Verification Name in The Recent Customers Card', function() {
			cy.wait('@RecentCustomers').then((xhr) => {
			cy.get(TopNavigationHeader.recent_customers_displayed).first().then(($ele) => {

			 //wait for list display
			 cy.get(TopNavigationHeader.recent_customers_loading_hide).should('exist')
				
              //store the first customer name
               const firstCustomerName = $ele.text();
			   cy.log(firstCustomerName);

			   //click on the first customer name
			   $ele.click()
			   
			  //wait for window display
			  cy.get(TopNavigationHeader.customer_card_name).should('exist')
			 
			   //verify customer card name
			   cy.get(TopNavigationHeader.customer_card_name).should('have.text', firstCustomerName)
			   
			   //Verify tabs on the customer card
			   cy.get(TopNavigationHeader.customer_card_tabs).should(($tab) => {
				  expect($tab).to.contain('Activity')
				  expect($tab).to.contain('Conversation')
				  expect($tab).to.contain('Open')
				  expect($tab).to.contain('Deals')
				  expect($tab).to.contain('Value')
				})
				
			   //close the window
			   cy.get(TopNavigationHeader.close_winodw).click()
			   
              })
		    })				 
		})
		

	})
})


