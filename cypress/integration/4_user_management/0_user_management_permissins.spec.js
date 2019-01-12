import * as UserManagementElements from './../../HTMLElementSelectors/UserManagement.json';
import * as LoginLogoutElements from './../../HTMLElementSelectors/LoginLogout.json';

context('User Management', () => {

    describe('Enterprise User - Add New Appointment', () => {
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
	    
	  
	    it('Test 1 - Verify all Appointment Access Permissions', function() {

	     let appointmentAccessCheckboxes = {
	     	confirm: false,
	     	deleteAppointment: false,
	     	editAppointment: false,
	     	reassignAppointment: false,
	     	reschedule: false
	     }

         //Click on EO Menu
	     cy.get(LoginLogoutElements.profile_menu).should('be.visible').click()
	
	     //Click on Store Settings
	     cy.get(UserManagementElements.store_settings_option).should('be.visible').click()
		 
		 //Click on General
		  cy.contains(UserManagementElements.general_link).should('be.visible').click()
		  
		//Scroll to UserManagement and click
		 cy.contains(UserManagementElements.user_management_link).should('be.visible').click()
		 
		//Enter User Names in the Search Box
		 cy.get(UserManagementElements.search_user_input).clear({force: true}).type('SALES ONE A', { force: true }).should('have.value', 'SALES ONE A')
		 
		 //Click displayed user name
		 cy.get(UserManagementElements.displayed_search_user_div).contains('Sales One A').click()

		 cy.get(UserManagementElements.dialog_main_div).should('be.visible')
		 
		 cy.wait("@legacy").then((xhr) => {

		 	//check if details tab visible
		 	cy.get(UserManagementElements.user_details_first_name).should('be.visible')

		 	//Click on Permission
		    cy.get(UserManagementElements.user_dialog_tabs).contains("Permissions").should('be.visible').click()
		  
			//get initial values of all checkboxes
			cy.get(UserManagementElements.dialog_main_div).contains("Confirm").within(() => {
				cy.get("md-switch").should('have.attr','aria-checked').then((attr) => {
					if(attr == 'true'){
						appointmentAccessCheckboxes.confirm = true
					}else{
						appointmentAccessCheckboxes.confirm = false
					}
				})
			})
			cy.get(UserManagementElements.dialog_main_div).contains("Delete Appointment").within(() => {
				cy.get("md-switch").should('have.attr','aria-checked').then((attr) => {
					if(attr == 'true'){
						appointmentAccessCheckboxes.deleteAppointment = true
					}else{
						appointmentAccessCheckboxes.deleteAppointment = false
					}
				})
			})
			cy.get(UserManagementElements.dialog_main_div).contains("Edit Appointment").within(() => {
				cy.get("md-switch").should('have.attr','aria-checked').then((attr) => {
					if(attr == 'true'){
						appointmentAccessCheckboxes.editAppointment = true
					}else{
						appointmentAccessCheckboxes.editAppointment = false
					}
				})
			})
			cy.get(UserManagementElements.dialog_main_div).contains("Reassign Appointment").within(() => {
				cy.get("md-switch").should('have.attr','aria-checked').then((attr) => {
					if(attr == 'true'){
						appointmentAccessCheckboxes.reassignAppointment = true
					}else{
						appointmentAccessCheckboxes.reassignAppointment = false
					}
				})
			})
			cy.get(UserManagementElements.dialog_main_div).contains("Reschedule").within(() => {
				cy.get("md-switch").should('have.attr','aria-checked').then((attr) => {
					if(attr == 'true'){
						appointmentAccessCheckboxes.reschedule = true
					}else{
						appointmentAccessCheckboxes.reschedule = false
					}
				})
			})
			cy.wait(4000)
			cy.get(UserManagementElements.dialog_main_div).contains("Confirm").within(() => {
				cy.get(".md-container").click()
				if(appointmentAccessCheckboxes.confirm){
					appointmentAccessCheckboxes.confirm = false
				}else{
					appointmentAccessCheckboxes.confirm = true
				}
			})
			cy.get(UserManagementElements.dialog_main_div).contains("Delete Appointment").within(() => {
				cy.get(".md-container").click()
				if(appointmentAccessCheckboxes.deleteAppointment){
					appointmentAccessCheckboxes.deleteAppointment = false
				}else{
					appointmentAccessCheckboxes.deleteAppointment = true
				}
			})
			cy.get(UserManagementElements.dialog_main_div).contains("Edit Appointment").within(() => {
				cy.get(".md-container").click()
				if(appointmentAccessCheckboxes.editAppointment){
					appointmentAccessCheckboxes.editAppointment = false
				}else{
					appointmentAccessCheckboxes.editAppointment = true
				}
			})
			cy.get(UserManagementElements.dialog_main_div).contains("Reassign Appointment").within(() => {
				cy.get(".md-container").click()
				if(appointmentAccessCheckboxes.reassignAppointment){
					appointmentAccessCheckboxes.reassignAppointment = false
				}else{
					appointmentAccessCheckboxes.reassignAppointment = true
				}
			})
			cy.get(UserManagementElements.dialog_main_div).contains("Reschedule").within(() => {
				cy.get(".md-container").click()
				if(appointmentAccessCheckboxes.reschedule){
					appointmentAccessCheckboxes.reschedule = false
				}else{
					appointmentAccessCheckboxes.reschedule = true
				}
			})



			cy.wait("@legacy").then((xhr) => {
				cy.get(UserManagementElements.dialog_main_actions).contains(UserManagementElements.Cancel_button).click()
				cy.get(UserManagementElements.displayed_search_user_div).contains('Sales One A').click()
				cy.get(UserManagementElements.dialog_main_div).should('be.visible')
		 
				 cy.wait("@legacy").then((xhr) => {

				 	//check if details tab visible
				 	cy.get(UserManagementElements.user_details_first_name).should('be.visible')

				 	//Click on Permission
				    cy.get(UserManagementElements.user_dialog_tabs).contains("Permissions").should('be.visible').click()
				  
					//Validate on Confirm check box
					cy.get(UserManagementElements.dialog_main_div).contains("Confirm").within(() => {
						cy.get("md-switch").should('have.attr','aria-checked').then((attr) => {
							expect(appointmentAccessCheckboxes.confirm+'').to.equal(attr)
						})
					})
					cy.get(UserManagementElements.dialog_main_div).contains("Delete Appointment").within(() => {
						cy.get("md-switch").should('have.attr','aria-checked').then((attr) => {
							expect(appointmentAccessCheckboxes.deleteAppointment+'').to.equal(attr)
						})
					})
					cy.get(UserManagementElements.dialog_main_div).contains("Edit Appointment").within(() => {
						cy.get("md-switch").should('have.attr','aria-checked').then((attr) => {
							expect(appointmentAccessCheckboxes.editAppointment+'').to.equal(attr)
						})
					})
					cy.get(UserManagementElements.dialog_main_div).contains("Reassign Appointment").within(() => {
						cy.get("md-switch").should('have.attr','aria-checked').then((attr) => {
							expect(appointmentAccessCheckboxes.reassignAppointment+'').to.equal(attr)
						})
					})
					cy.get(UserManagementElements.dialog_main_div).contains("Reschedule").within(() => {
						cy.get("md-switch").should('have.attr','aria-checked').then((attr) => {
							expect(appointmentAccessCheckboxes.reschedule+'').to.equal(attr)
						})
					})

				 })
			})

			

		 })
		 
		 //Click on Delete Appointment ckeck box
		 // cy.get(UserManagementElements.delete_appointment_checkbox_false).click()
		 
		 //Click on Edit Appointment ckeck box
		 // cy.get(UserManagementElements.edit_appointment_false).click()
		 
		 //Click on Reassign Appointment ckeck box
		 // cy.get(UserManagementElements.reassign_appointment_false).click()
		 
		 //Click on Reschedule ckeck box
		 // cy.get(UserManagementElements.reschedule_checkbox_false).click()
		 
		 //Click Update button
		  // cy.contains(UserManagementElements.update_button).should('be.visible').click()
		 
		  //Click displayed user name
		 // cy.contains(UserManagementElements.displayed_search_user).should('be.visible').click()
		 
		 //Click on Permission
		  // cy.contains(UserManagementElements.Permissions_tab).should('be.visible').click()
		  
		  
		  // cy.get(UserManagementElements.confirm_checkbox_true).should('be.visible')
			 
			// cy.get(UserManagementElements.delete_appointment_checkbox_true).should('be.visible')
			// cy.get(UserManagementElements.edit_appointment_true).should('be.visible')
			// cy.get(UserManagementElements.reassign_appointment_true).should('be.visible')
			// cy.get(UserManagementElements.reschedule_checkbox_truee).should('be.visible')
		  
		})
	 

	})
})


