
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

		// it('Test 27 - Validate All tabs in User Management window ', function () {

			// //Click on EO Menu
			// cy.get(LoginLogoutElements.profile_menu).should('be.visible').click()

			// //Click on Store Settings
			// cy.get(UserManagementElements.store_settings_option).should('be.visible').click()

			// //Click on General
			// cy.contains(UserManagementElements.general_link).should('be.visible').click()

			// //Scroll to UserManagement and click
			// cy.contains(UserManagementElements.user_management_link).should('be.visible').click()
			
			// // cy.get(UserManagementElements.user_management_tabs).contains("All").within(() => {
					// // cy.get("span").should('have.class', 'filterLabel').click()
					// // })
			// cy.wait(4000)
			// cy.get(UserManagementElements.user_management_tabs).contains('All').should('be.visible').click()
			// cy.get(UserManagementElements.user_management_tabs).contains('BDC').should('be.visible').click()
			// cy.get(UserManagementElements.user_management_tabs).contains('Sales').should('be.visible').click()
			// //cy.get(UserManagementElements.user_management_tabs).contains('Service').click()
			// //cy.get(UserManagementElements.user_management_tabs).contains('Owner').click()
			// //cy.get(UserManagementElements.user_management_tabs).contains('Inactive').click()

		// })
		// it('Test 28 - Search for existing users in a given store', function () {

			// //Click on EO Menu
			// cy.get(LoginLogoutElements.profile_menu).should('be.visible').click()

			// //Click on Store Settings
			// cy.get(UserManagementElements.store_settings_option).should('be.visible').click()

			// //Click on General
			// cy.contains(UserManagementElements.general_link).should('be.visible').click()

			// //Scroll to UserManagement and click
			// cy.contains(UserManagementElements.user_management_link).should('be.visible').click()
			// //Enter User Names in the Search Box
			// cy.get(UserManagementElements.search_user_input).clear({
				// force: true
			// }).type(UserManagementElements.search_user_name, {
				// force: true
			// }).should('have.value', UserManagementElements.search_user_name)

			// //Click displayed user name
			// cy.get(UserManagementElements.displayed_search_user_div).contains(UserManagementElements.search_user_name).click()
		// })
		// it('Test 29 - Validate fields in Details section under Details tab', function () {

			// //Click on EO Menu
			// cy.get(LoginLogoutElements.profile_menu).should('be.visible').click()

			// //Click on Store Settings
			// cy.get(UserManagementElements.store_settings_option).should('be.visible').click()

			// //Click on General
			// cy.contains(UserManagementElements.general_link).should('be.visible').click()

			// //Scroll to UserManagement and click
			// cy.contains(UserManagementElements.user_management_link).should('be.visible').click()

			// //Enter User Names in the Search Box
			// cy.get(UserManagementElements.search_user_input).clear({
				// force: true
			// }).type(UserManagementElements.default_permission_user, {
				// force: true
			// }).should('have.value', UserManagementElements.default_permission_user)

			// //Click displayed user name
			// cy.get(UserManagementElements.displayed_search_user_div).contains(UserManagementElements.default_permission_user).click()

			// cy.get(UserManagementElements.dialog_main_div).should('be.visible')

			// cy.wait("@legacy").then((xhr) => {
				// //check if details tab visible
				// cy.get(UserManagementElements.user_details_first_name).should('be.visible')
				// //check if last name field
				// cy.get(UserManagementElements.user_details_last_name).should('be.visible')
				// //check if title field
				// cy.get(UserManagementElements.user_details_title).should('be.visible')
				// //check if email field
				// cy.get(UserManagementElements.user_details_email).should('be.visible')
				// //check if Drive alias field
				// cy.get(UserManagementElements.user_details_alias).should('be.visible')
				// //check if Forward email field
				// cy.get(UserManagementElements.user_details_forwardemail).should('be.visible')
				// //check if Work phone field
				// cy.get(UserManagementElements.user_details_phone).should('be.visible')
				// //check if Cell phone field
				// cy.get(UserManagementElements.user_details_cell).should('be.visible')
				// //check if Tags field
				// cy.get(UserManagementElements.user_details_tags).should('be.visible')
				// //check if DMS field
				// cy.get(UserManagementElements.user_details_dms).should('be.visible')
				// //check if Password field
				// cy.get(UserManagementElements.user_details_password).should('be.visible')
				// //check if Confirm Password field
				// cy.get(UserManagementElements.user_details_confirmpassword).should('be.visible')
				
				
				// //Close the User permissions window.
				// cy.get(UserManagementElements.user_permissions_window_close).click()
				// //Click on Drivecentric logo on home page
				// cy.get(UserManagementElements.dc_homelogo).click()
			// })
		// })
		// it('Test 30 - Validate fields in Details section under Details tab', function () {

			// //Click on EO Menu
			// cy.get(LoginLogoutElements.profile_menu).should('be.visible').click()

			// //Click on Store Settings
			// cy.get(UserManagementElements.store_settings_option).should('be.visible').click()

			// //Click on General
			// cy.contains(UserManagementElements.general_link).should('be.visible').click()

			// //Scroll to UserManagement and click
			// cy.contains(UserManagementElements.user_management_link).should('be.visible').click()

			// //Enter User Names in the Search Box
			// cy.get(UserManagementElements.search_user_input).clear({
				// force: true
			// }).type(UserManagementElements.default_permission_user, {
				// force: true
			// }).should('have.value', UserManagementElements.default_permission_user)

			// //Click displayed user name
			// cy.get(UserManagementElements.displayed_search_user_div).contains(UserManagementElements.default_permission_user).click()

			// cy.get(UserManagementElements.dialog_main_div).should('be.visible')

			// cy.wait("@legacy").then((xhr) => {
				// //check if details tab visible
				// cy.get(UserManagementElements.user_details_first_name).should('be.visible')
				
				// cy.get(UserManagementElements.user_details_types).children().should('contain','Salesman').and('have.length','10')
				// cy.get(UserManagementElements.user_details_types).children().should('contain','Manager')
				// cy.get(UserManagementElements.user_details_types).children().should('contain','Owner')
				// cy.get(UserManagementElements.user_details_types).children().should('contain','Service Advisor')
				// cy.get(UserManagementElements.user_details_types).children().should('contain','BDC')
				// cy.get(UserManagementElements.user_details_types).children().should('contain','Sales Manager')
				// cy.get(UserManagementElements.user_details_types).children().should('contain','Team Leader')
				// cy.get(UserManagementElements.user_details_types).children().should('contain','Finance Manager')
				// cy.get(UserManagementElements.user_details_types).children().should('contain','Closer')
				// cy.get(UserManagementElements.user_details_types).children().should('contain','Caddy')
				// //cy.get(UserManagementElements.user_details_types).children().should('contain','Manager')
				// //Close the User permissions window.
				// cy.get(UserManagementElements.user_permissions_window_close).click()
				// //Click on Drivecentric logo on home page
				// cy.get(UserManagementElements.dc_homelogo).click()
			// })
		// })
		
		// it('Test 31 - Validate Leader toggle button and Team dropdown in Team leader section under Details tab', function () {

			// //Click on EO Menu
			// cy.get(LoginLogoutElements.profile_menu).should('be.visible').click()

			// //Click on Store Settings
			// cy.get(UserManagementElements.store_settings_option).should('be.visible').click()

			// //Click on General
			// cy.contains(UserManagementElements.general_link).should('be.visible').click()

			// //Scroll to UserManagement and click
			// cy.contains(UserManagementElements.user_management_link).should('be.visible').click()

			// //Enter User Names in the Search Box
			// cy.get(UserManagementElements.search_user_input).clear({
				// force: true
			// }).type(UserManagementElements.default_permission_user, {
				// force: true
			// }).should('have.value', UserManagementElements.default_permission_user)

			// //Click displayed user name
			// cy.get(UserManagementElements.displayed_search_user_div).contains(UserManagementElements.default_permission_user).click()

			// cy.get(UserManagementElements.dialog_main_div).should('be.visible')

			// cy.wait("@legacy").then((xhr) => {
				// //check if details tab visible
				// cy.get(UserManagementElements.user_details_team_leader).should('contain','Leader')
				// cy.get(UserManagementElements.user_details_team).should('contain','No Team')
				
				// //Close the User permissions window.
				// cy.get(UserManagementElements.user_permissions_window_close).click()
				// //Click on Drivecentric logo on home page
				// cy.get(UserManagementElements.dc_homelogo).click()
			// })
		// })
		
		// it('Test 32 - Validate Active and Vacation toggle buttons in Status section under Details tab', function () {

			// //Click on EO Menu
			// cy.get(LoginLogoutElements.profile_menu).should('be.visible').click()

			// //Click on Store Settings
			// cy.get(UserManagementElements.store_settings_option).should('be.visible').click()

			// //Click on General
			// cy.contains(UserManagementElements.general_link).should('be.visible').click()

			// //Scroll to UserManagement and click
			// cy.contains(UserManagementElements.user_management_link).should('be.visible').click()

			// //Enter User Names in the Search Box
			// cy.get(UserManagementElements.search_user_input).clear({
				// force: true
			// }).type(UserManagementElements.default_permission_user, {
				// force: true
			// }).should('have.value', UserManagementElements.default_permission_user)

			// //Click displayed user name
			// cy.get(UserManagementElements.displayed_search_user_div).contains(UserManagementElements.default_permission_user).click()

			// cy.get(UserManagementElements.dialog_main_div).should('be.visible')

			// cy.wait("@legacy").then((xhr) => {
				// //check if details tab visible
				// cy.get(UserManagementElements.user_details_div).contains("Active")
				// cy.get(UserManagementElements.user_details_div).contains("Vacation")
				// cy.get(UserManagementElements.user_details_div).contains("Exclude")
				
				
				// //Close the User permissions window.
				// cy.get(UserManagementElements.user_permissions_window_close).click()
				// //Click on Drivecentric logo on home page
				// cy.get(UserManagementElements.dc_homelogo).click()
			// })
		// })
		
		it('Test 33 - Update User Phone and Cell numbers', function () {

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
			}).type(UserManagementElements.default_permission_user, {
				force: true
			}).should('have.value', UserManagementElements.default_permission_user)

			//Click displayed user name
			cy.get(UserManagementElements.displayed_search_user_div).contains(UserManagementElements.default_permission_user).click()

			cy.get(UserManagementElements.dialog_main_div).should('be.visible')

			cy.wait("@legacy").then((xhr) => {
				//check if details tab visible
				//cy.get(UserManagementElements.user_details_first_name).should('be.visible')
				//check if last name field
				//cy.get(UserManagementElements.user_details_last_name).should('be.visible')
				//check if title field
				//cy.get(UserManagementElements.user_details_title).should('be.visible')
				//check if email field
				//cy.get(UserManagementElements.user_details_email).should('be.visible')
				//check if Drive alias field
				//cy.get(UserManagementElements.user_details_alias).should('be.visible')
				//check if Forward email field
				//cy.get(UserManagementElements.user_details_forwardemail).should('be.visible')
				//check if Work phone field
				cy.wait(4000)
				cy.get(UserManagementElements.user_details_phone).clear({force: true}).click().type(UserManagementElements.user_details_phonenumber).should('have.value',UserManagementElements.user_details_phonenumber)
				//check if Cell phone field
				cy.wait(4000)
				cy.get(UserManagementElements.user_details_cell).clear({force: true}).click().type(UserManagementElements.user_details_cellnumber).should('have.value',UserManagementElements.user_details_cellnumber)
				//check if Tags field
				//cy.get(UserManagementElements.user_details_tags).should('be.visible')
				//check if DMS field
				//cy.get(UserManagementElements.user_details_dms).should('be.visible')
				//check if Password field
				//cy.get(UserManagementElements.user_details_password).should('be.visible')
				//check if Confirm Password field
				//cy.get(UserManagementElements.user_details_confirmpassword).should('be.visible')
				cy.wait(4000)
				cy.get(".driveDialogActions li:nth-of-type(2) button").should('be.visible').click()
				
				//Close the User permissions window.
				//cy.get(UserManagementElements.user_permissions_window_close).click()
				//Click on Drivecentric logo on home page
				//cy.get(UserManagementElements.dc_homelogo).click()
			})
		})


	})
})