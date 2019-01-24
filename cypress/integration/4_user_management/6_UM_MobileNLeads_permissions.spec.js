
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

		it('Test 15 - Validate Mobile section permissions check boxes are disabled', function () {

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
				//Check the Library button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Library").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Phone Library button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Phone Library").within(() => {
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

				//Check the Library button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Library").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Phone Library button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Phone Library").within(() => {
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

		it('Test 16 - Validate Mobile section Check box enabled Permissions', function () {
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
				//Check the Library button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Library").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Phone Library button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Phone Library").within(() => {
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

				//Check the Library button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Library").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Phone Library button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Phone Library").within(() => {
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
		it('Test 17 - Validate Leads section perfmissions check boxes are disabled', function () {

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
				//Check the Clock In button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Clock In").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Clock In Others button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Clock In Others").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Delete Service Lead button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Delete Service Lead").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Service Leads button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Service Leads").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Service Leads - Parts button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Service Leads - Parts").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Service Leads - Service button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Service Leads - Service").within(() => {
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

				//Check the Clock In button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Clock In").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Clock In Others Lead button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Clock In Others").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})

				//Check the Delete Service Lead button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Delete Service Lead").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Service Leads button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Service Leads").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Service Leads - Parts button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Service Leads - Parts").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Service Leads - Service button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Service Leads - Service").within(() => {
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

		it('Test 18 - Validate Leads section Check box enabled Permissions', function () {
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
				//Check the Clock In button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Clock In").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Delete Clock In Others button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Clock In Others").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Delete Service Lead button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Delete Service Lead").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Service Leads button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Service Leads").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Service Leads - Parts button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Service Leads - Parts").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Service Leads - Service button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Service Leads - Service").within(() => {
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

				//Check the Clock In Lead button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Clock In").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Clock In Others button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Clock In Others").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Delete Service Lead button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Delete Service Lead").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Service Leads button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Service Leads").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Service Leads - Parts button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Service Leads - Parts").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Service Leads - Service button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Service Leads - Service").within(() => {
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

		it('Test 19 - Validate Settings section perfmissions check boxes are disabled', function () {

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
				//Check the Campaign Videos button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Campaign Videos").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Drive Score Edit Others button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Drive Score Edit").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Edit Deal Docs button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Edit Deal Docs").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Phone Numbers button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Phone Numbers").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the WebSite URLs button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("WebSite URLs").within(() => {
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

				//Check the Campaign Videos button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Campaign Videos").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Drive Score Edit Others Lead button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Drive Score Edit").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})

				//Check the Edit Deal Docs button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Edit Deal Docs").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Phone Numbers button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Phone Numbers").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the WebSite URLs button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("WebSite URLs").within(() => {
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

		it('Test 20 - Validate Settings section Check box enabled Permissions', function () {
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
				//Check the Campaign Videos button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Campaign Videos").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Drive Score Edit Others button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Drive Score Edit").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Edit Deal Docs button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Edit Deal Docs").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Phone Numbers button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Phone Numbers").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the WebSite URLs button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("WebSite URLs").within(() => {
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

				//Check the Campaign Videos Lead button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Campaign Videos").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Drive Score Edit Others button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Drive Score Edit").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Edit Deal Docs button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Edit Deal Docs").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Phone Numbers button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Phone Numbers").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the WebSite URLs button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("WebSite URLs").within(() => {
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

		it('Test 21 - Validate Deal Access section perfmissions check boxes are disabled', function () {

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
				//Check the Change Source button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Change Source").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Check Out button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Check Out").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Create Multiple Open button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Create Multiple Open").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Delete Deal is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Delete Deal").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Delete Planned Rule button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Delete Planned Rule").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Desking button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Desking").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Fire Caddy button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Fire Caddy").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Manually Deliver button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Manually Deliver").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Modify Delivery button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Modify Delivery").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Push to DMS button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Push to DMS").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Rescue button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Rescue").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Roadmap Access button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Roadmap Access").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Transfer Deal button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Transfer Deal").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Unwind Deal button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Unwind Deal").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'true') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the View DMS Amounts button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("View DMS Amounts").within(() => {
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

				//Check the Change Source button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Change Source").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Check Out button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Check Out").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})

				//Check the Create Multiple Open button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Create Multiple Open").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Delete Deal button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Delete Deal").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Delete Planned Rule button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Delete Planned Rule").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Desking button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Desking").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Fire Caddy button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Fire Caddy").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Manually Deliver button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Manually Deliver").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Modify Delivery button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Modify Delivery").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Push to DMS button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Push to DMS").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Rescue button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Rescue").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Roadmap Access button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Roadmap Access").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Transfer Deal button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Transfer Deal").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the Unwind Deal button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Unwind Deal").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("false")
					})
				})
				//Check the View DMS Amounts button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("View DMS Amounts").within(() => {
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

		it('Test 22 - Validate Deal Access section perfmissions check boxes are disabled', function () {

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
				//Check the Change Source button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Change Source").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Check Out button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Check Out").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Create Multiple Open button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Create Multiple Open").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Delete Deal is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Delete Deal").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Delete Planned Rule button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Delete Planned Rule").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Desking button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Desking").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Fire Caddy button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Fire Caddy").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Manually Deliver button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Manually Deliver").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Modify Delivery button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Modify Delivery").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Push to DMS button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Push to DMS").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Rescue button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Rescue").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Roadmap Access button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Roadmap Access").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Transfer Deal button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Transfer Deal").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the Unwind Deal button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("Unwind Deal").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						if (attr == 'false') {
							cy.get(".md-thumb").click()
						}
					})
				})
				//Check the View DMS Amounts button is checked, if yes uncheck and click on update.
				cy.get(UserManagementElements.dialog_main_div).contains("View DMS Amounts").within(() => {
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
				cy.get(UserManagementElements.user_dialog_tabs).contains("Permissions").should('be.visible').click()

				//Check the Change Source button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Change Source").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Check Out button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Check Out").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})

				//Check the Create Multiple Open button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Create Multiple Open").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Delete Deal button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Delete Deal").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Delete Planned Rule button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Delete Planned Rule").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Desking button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Desking").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Fire Caddy button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Fire Caddy").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Manually Deliver button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Manually Deliver").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Modify Delivery button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Modify Delivery").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Push to DMS button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Push to DMS").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Rescue button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Rescue").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Roadmap Access button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Roadmap Access").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Transfer Deal button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Transfer Deal").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the Unwind Deal button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("Unwind Deal").within(() => {
					cy.get("md-switch").should('have.attr', 'aria-checked').then((attr) => {
						expect(attr).to.equal("true")
					})
				})
				//Check the View DMS Amounts button is unchecked
				cy.get(UserManagementElements.dialog_main_div).contains("View DMS Amounts").within(() => {
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