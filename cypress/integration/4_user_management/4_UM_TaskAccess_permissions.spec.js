
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

		it('Test 9 - Validate TaskAccess section perfmissions check boxes are disabled', function () {

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

			cy.get(UserManagementElements.dialog_main_div).should('be.visible')

			cy.wait("@legacy").then((xhr) => {
				//check if details tab visible
				cy.get(UserManagementElements.user_details_first_name).should('be.visible')

				//Click on Permission
				cy.get(UserManagementElements.user_dialog_tabs).contains("Permissions").should('be.visible').click()

				//get initial values of all checkboxes
				//Check the Delete Task button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Delete Task").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Edit Task button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Edit Task").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Reassign Task button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Reassign Task").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				
				cy.wait(4000)
				cy.get(UserManagementElements.user_permissions_update_button).click()

				//Enter User Names in the Search Box
				cy.get(UserManagementElements.search_user_input).clear({
					force: true
				}).type(UserManagementElements.search_user_name, {
					force: true
				}).should('have.value', UserManagementElements.search_user_name)

				//Click displayed user name
				cy.get(UserManagementElements.displayed_search_user_div).contains(UserManagementElements.search_user_name).click()

				//check if details tab visible
				cy.get(UserManagementElements.user_details_first_name).should('be.visible')

				//Click on Permission
				cy.get(UserManagementElements.user_dialog_tabs).contains("Permissions").should('be.visible').click()

				//Check the Delete Task button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Delete Task").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Edit Task button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Edit Task").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Reassign Task button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Reassign Task").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Close the User permissions window.
				cy.get(UserManagementElements.user_permissions_window_close).click()
				//Click on Drivecentric logo on home page
				cy.get(UserManagementElements.dc_homelogo).click()
			})
		})

		it('Test 10 - Validate TaskAccess section Check box enabled Permissions', function () {
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

			cy.get(UserManagementElements.dialog_main_div).should('be.visible')

			cy.wait("@legacy").then((xhr) => {

				//check if details tab visible
				cy.get(UserManagementElements.user_details_first_name).should('be.visible')

				//Click on Permission
				cy.get(UserManagementElements.user_dialog_tabs).contains("Permissions").should('be.visible').click()

				//get initial values of all checkboxes
				//Check the Delete Task button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Delete Task").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Edit Task button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Edit Task").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Reassign Task button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Reassign Task").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				cy.wait(4000)
				cy.get(UserManagementElements.user_permissions_update_button).click()

				//Enter User Names in the Search Box
				cy.get(UserManagementElements.search_user_input).clear({
					force: true
				}).type(UserManagementElements.search_user_name, {
					force: true
				}).should('have.value', UserManagementElements.search_user_name)

				//Click displayed user name
				cy.get(UserManagementElements.displayed_search_user_div).contains(UserManagementElements.search_user_name).click()

				//check if details tab visible
				cy.get(UserManagementElements.user_details_first_name).should('be.visible')

				//Click on Permission
				cy.get(UserManagementElements.user_dialog_tabs).contains("Permissions").click()

				//Check the Delete Task button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Delete Task").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Edit Task button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Edit Task").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Reassign Task button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Reassign Task").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Close the User permissions window.
				cy.get(UserManagementElements.user_permissions_window_close).click()
				//Click on Drivecentric logo on home page
				cy.get(UserManagementElements.dc_homelogo).click()
			})

		})

	})
})