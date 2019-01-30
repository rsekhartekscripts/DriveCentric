
import * as UserManagementElements from './../../HTMLElementSelectors/UserManagement.json';
import * as LoginLogoutElements from './../../HTMLElementSelectors/LoginLogout.json';

context('User Management', () => {

	describe('Enterprise User - User Management Permissions', () => {
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

		after(() => {
			cy.logoutUI()
		})

		it('Test 27 - Validate All tabs in User Management window ', function () {

			//Click on EO Menu
			cy.get(LoginLogoutElements.profile_menu).should('be.visible').click()

			//Click on Store Settings
			cy.get(UserManagementElements.store_settings_option).should('be.visible').click()

			//Click on General
			cy.contains(UserManagementElements.general_link).should('be.visible').click()

			//Scroll to UserManagement and click
			cy.contains(UserManagementElements.user_management_link).should('be.visible').click()
			
			// cy.get(UserManagementElements.user_management_tabs).contains("All").within(() => {
					// cy.get("span").should('have.class', 'filterLabel').click()
					// })
			cy.wait(4000)
			cy.get(UserManagementElements.user_management_tabs).contains('All').should('be.visible').click()
			cy.get(UserManagementElements.user_management_tabs).contains('BDC').should('be.visible').click()
			cy.get(UserManagementElements.user_management_tabs).contains('Sales').should('be.visible').click()
			//cy.get(UserManagementElements.user_management_tabs).contains('Service').click()
			//cy.get(UserManagementElements.user_management_tabs).contains('Owner').click()
			//cy.get(UserManagementElements.user_management_tabs).contains('Inactive').click()

		})
		it('Test 28 - Validate All tabs in User Management window ', function () {

			//Click on EO Menu
			cy.get(LoginLogoutElements.profile_menu).should('be.visible').click()

			//Click on Store Settings
			cy.get(UserManagementElements.store_settings_option).should('be.visible').click()

			//Click on General
			cy.contains(UserManagementElements.general_link).should('be.visible').click()

			//Scroll to UserManagement and click
			cy.contains(UserManagementElements.user_management_link).should('be.visible').click()
			//Enter User Names in the Search Box
			cy.get(UserManagementElements.search_user_input).clear({
				force: true
			}).type(UserManagementElements.search_user_name, {
				force: true
			}).should('have.value', UserManagementElements.search_user_name)

			//Click displayed user name
			cy.get(UserManagementElements.displayed_search_user_div).contains(UserManagementElements.search_user_name).click()
		})
		
		

	})
})