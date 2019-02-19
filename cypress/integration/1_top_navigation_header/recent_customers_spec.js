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
	        url: '/api/legacy',
	      }).as('legacy')
	      cy.route({
	        method: 'POST',
	        url: '/api/legacy/DriveTile/GetNotificationCounts',
	      }).as('RecentCustomers')
		  cy.wait('@RecentCustomers', { timeout: 120000});
	    })
		
	    after(function () {
	    	cy.logoutUI()
	    }) 
	  
	    it('Test 1 - Verify that Recent customer search button exists at the Menu bar', function() {	
		    //Recent Customers Icon
			cy.get(TopNavigationHeader.recent_customers_icon).should('be.visible')		 
		})
		
	    it('Test 2 - Validate first eight and next 12 recent customers are displays', function() {	
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
		
		it.only('Test 3 - Validate customer card when user clicks on any of the recent customers list who has Open deals', function() {
			//Click on the Recent Customers Icon
			cy.get(TopNavigationHeader.recent_customers_icon).click();
			
			cy.wait('@RecentCustomers').then((xhr) => {
			//wait for list display
			 cy.get(TopNavigationHeader.recent_customers_loading_hide).should('exist')
				
				cy.get(TopNavigationHeader.recent_customers_displayed_value).each(($elm) => {
				cy.wrap($elm).invoke('text').then((text) => {
				if (text != "No open deal") {
				cy.wrap($elm).click()
					//wait for window display
					cy.get(TopNavigationHeader.customer_card_name).should('exist')
			 
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
					} 						
				 })
				})
		    })				 
		})
		
		it('Test 4 - Validate customer card when user clicks on any of the recent customers list who does not have Open deals', function() {
			//Click on the Recent Customers Icon
			cy.get(TopNavigationHeader.recent_customers_icon).click();
			
			cy.wait('@RecentCustomers').then((xhr) => {
			//wait for list display
			 cy.get(TopNavigationHeader.recent_customers_loading_hide).should('exist')
				
				cy.get(TopNavigationHeader.recent_customers_displayed_value).each(($elm) => {
				cy.wrap($elm).invoke('text').then((text) => {
				if (text === "No open deal") {
				cy.wrap($elm).click()
					//wait for window display
					cy.get(TopNavigationHeader.customer_card_name).should('exist')
			 
				//Verify tabs on the customer card
			   cy.get(TopNavigationHeader.customer_card_tabs).should(($tab) => {
				  expect($tab).to.contain('Activity')
				  expect($tab).to.contain('Conversation')
				  expect($tab).to.contain('Deals')
				  expect($tab).to.contain('Value')
				})
				
			   //close the window
			   cy.get(TopNavigationHeader.close_winodw).click()
				 } 			   
				 })
				})
		    })					 
		})
		
		it('Test 5 - Validate customer name in the customer card and recent customer list name', function() {
			//Click on the Recent Customers Icon
			cy.get(TopNavigationHeader.recent_customers_icon).click();
			
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
			   			
			   //close the window
			   cy.get(TopNavigationHeader.close_winodw).click()
			   
              })
		    })				 
		})
		

	})
})


