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
	        url: '/api/legacy/*',
	      }).as('RecentCustomers')
	    })
		
		afterEach(() => {
			cy.get(TopNavigationHeader.recent_customers_icon_afterclick).then((attr) => {
					if(attr == 'true'){
						cy.get(TopNavigationHeader.recent_customers_icon_afterclick).click()
					}
				})	      
	    })
		
	    after(function () {
	    	cy.logoutUI()
	    }) 
	  
	    it.only('Verification Of Recent Customers Displayed List', function() {	
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
		
		it('Verification Of Recent Customers Card', function() {		
		    //Click on the Recent Customers Icon
			cy.get(TopNavigationHeader.recent_customers_icon).click();
			
			cy.wait('@RecentCustomers').then((xhr) => {
			cy.get(TopNavigationHeader.recent_customers_displayed).then(($ele) => {

			  //wait for list display
			 cy.get(TopNavigationHeader.recent_customers_loading_hide).should('exist')
				
              //store the first customer name
               const firstCustomerName = $ele.get(1).text();
			   cy.log(firstCustomerName);

			   //click on the first customer name
			 //  cy.get(TopNavigationHeader.recent_customers_first_record).click()
			   $ele.get(1).click()
			   //verify cistomer card name
			   cy.get(TopNavigationHeader.recent_customers_first_record).should('have.text', firstCustomerName)
			   
              })
		    })				 
		})
		

	})
})


