import * as TopNavigationHeader from './../../HTMLElementSelectors/TopNavigationHeader.json';
import * as globalsearch from './../../fixtures/global_search.json';

context('Global Customer Search', () => {

    describe('Enterprise User - Global Customer Search', () => {
		before(function () {
	       cy.loginUI('enterprise')
		})

	    beforeEach(() => {
	      cy.server()
	      cy.route({
	        method: 'POST',
	        url: '/api/legacy/*',
	      }).as('QuickSearch')
		  
		  //Load global_search.json file
		   cy.fixture('./../fixtures/global_search.json').as('globalsearch')
	    })

	    after(function () {
	    	cy.logoutUI()
	    })
	    
	  
	    it('Customer First Name Search ', function() {			
		cy.get('@globalsearch')
            .each( function (data) {
		    //Enter Customer First Name
			cy.get(TopNavigationHeader.global_search_textbox).clear().type(data.firstName).should('have.value', data.firstName)
				//Verify the displayed results
				cy.get(TopNavigationHeader.displayed_result).each(($el, index, $list) => {
				    cy.wrap($el).contains(data.firstName)
				})			
			})				 
		})

		it('Customer Last Name Search ', function() {
			cy.get('@globalsearch')
            .each( function (data) {
			//Enter Customer Last Name
			cy.get(TopNavigationHeader.global_search_textbox).clear().type(data.lastName).should('have.value', data.lastName)
				//Verify the displayed results
				cy.get(TopNavigationHeader.displayed_result).each(($el, index, $list) => {
				    cy.wrap($el).contains(data.lastName)
				})
			})
		})

		it('Customer First and Last Name Search ', function() {
			cy.get('@globalsearch')
            .each( function (data) {
			//Enter Customer Fisrt and Last Name
			cy.get(TopNavigationHeader.global_search_textbox).clear().type(data.firstName+" "+data.lastName).should('have.value', data.firstName+" "+ data.lastName)
			
				//Verify the displayed results
				cy.get(TopNavigationHeader.displayed_result1).each(($el, index, $list) => {
				    cy.wrap($el).contains(data.firstName)
				})
				cy.get(TopNavigationHeader.displayed_result2).each(($el, index, $list) => {
				    cy.wrap($el).contains(data.lastName)
				})	
			})
		}) 
		
		it('Customer Phone Number Search ', function() {
			cy.get('@globalsearch')
            .each( function (data) {
			//Enter Customer Phone Number
			cy.get(TopNavigationHeader.global_search_textbox).clear().type(data.phone).should('have.value', data.phone)
			
				//Verify the displayed results
				cy.get(TopNavigationHeader.displayed_result_not_highlight).each(($el, index, $list) => {
				    cy.wrap($el).contains(data.firstName)
				})
				cy.get(TopNavigationHeader.displayed_result_not_highlight).each(($el, index, $list) => {
				    cy.wrap($el).contains(data.lastName)
				})
			})
		})
		
		it('Customer Email Search ', function() {
			cy.get('@globalsearch')
            .each( function (data) {
			//Enter Customer Email
			cy.get(TopNavigationHeader.global_search_textbox).clear().type(data.email).should('have.value', data.email)
			
				//Verify the displayed results
				cy.get(TopNavigationHeader.displayed_result_not_highlight).each(($el, index, $list) => {
				    cy.wrap($el).contains(data.firstName)
				})
				cy.get(TopNavigationHeader.displayed_result_not_highlight).each(($el, index, $list) => {
				    cy.wrap($el).contains(data.lastName)
				})
			})			
		})
		
		it('Customer Company Name Search ', function() {
			cy.get('@globalsearch')
            .each( function (data) {
			//Enter Customer COmpany name
			cy.get(TopNavigationHeader.global_search_textbox).clear().type(data.companyName).should('have.value', data.companyName)
			
				//Verify the displayed results
				cy.get(TopNavigationHeader.displayed_result_not_highlight).each(($el, index, $list) => {
				    cy.wrap($el).contains(data.firstName)
				})
				cy.get(TopNavigationHeader.displayed_result_not_highlight).each(($el, index, $list) => {
				    cy.wrap($el).contains(data.lastName)
				})
			})			
		})
		
		it('Mouse Over Customer Name Search ', function() {
			cy.get('@globalsearch')
            .each( function (data) {
			//Enter Customer Company name
			cy.get(TopNavigationHeader.global_search_textbox).clear().type(data.firstName+" "+data.lastName).should('have.value', data.firstName+" "+data.lastName)
	
				//Verify the displayed results
				cy.get(TopNavigationHeader.displayed_result_not_highlight).each(($el, index, $list) => {
				   cy.wrap($el).trigger('mouseover').should('be.visible')
				   cy.get(TopNavigationHeader.mouse_over_name).contains(data.firstName)
				   cy.get(TopNavigationHeader.mouse_over_name).contains(data.lastName)
				})
			})			
		})

	})
})


