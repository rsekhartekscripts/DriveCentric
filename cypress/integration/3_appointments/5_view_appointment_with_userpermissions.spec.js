//#author: Rajasekhar on 6th Feb,19
import * as TopNavigationHeader from './../../HTMLElementSelectors/TopNavigationHeader.json';
import * as customersList from './../../fixtures/customers.json';

import * as SalesHomeElements from './../../HTMLElementSelectors/SalesHome.json';
import * as CustomerCardElements from './../../HTMLElementSelectors/CustomerCard.json';
import * as AppointmentCardElements from './../../HTMLElementSelectors/AppointmentCard.json';
import * as UserManagementElemenets from './../../HTMLElementSelectors/UserManagement.json';

const customer = customersList[0];

const timeSlots = [
	"12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM",
	"5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM",
	"10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
	"2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM",
	"7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
]

const existingAppointmentText = "This customer already has an appointment scheduled for them at this time";
const outOfBusinessHoursErrortext = "Sorry, you can't schedule an appointment for this time. It is outside of business hours";

//const appointmentTypes = ["Sales", "Delivery", "Service", "General"];
// const appointmentTypes = ["Sales"];

context('Appointments', () => {

	describe('Appointment User - View Appointment', () => {

		let currentTestNum = 2;

		before(function () {
			cy.loginUI('viewaptWithUserPerm')
			cy.server()
			cy.route({
				method: 'POST',
				url: '/api/legacy/DriveSearch/QuickSearch',
			}).as('QuickSearch')
			
		})

		beforeEach(() => {
			cy.server()
			cy.route({
				method: 'POST',
				url: '/api/legacy/',
			}).as('Legacy')
			cy.route({
				method: 'POST',
				url: '/api/legacy/DriveUser/HasPermission',
			}).as('profimg')
			cy.route({
				method: 'POST',
				url: '/api/legacy/DriveSearch/QuickSearch',
			}).as('QuickSearch')
			cy.route({
				method: 'GET',
				url: '/api/customers/*/summary',
			}).as('CustomerSummary')
			cy.route({
				method: 'POST',
				url: '/api/customers/*/appointment',
			}).as('CreateAppointment')
			cy.route({
				method: 'POST',
				url: '/api/appointments',
			}).as('EditAppointment')
			cy.route({
				method: 'DELETE',
				url: '/api/appointments/*',
			}).as('DeleteAppointment')
			cy.route({
				method: 'GET',
				url: '/api/customers/*/timeline/',
			}).as('Timeline')
			cy.route({
				method: 'POST',
				url: '/api/legacy/DriveTile/GetNotificationCounts',
			}).as('AppointmentGrid')
		})

		after(() => {
			cy.logoutUI()
		})

		// it(`Test 1 - Create an Appointment WITH a User Confirm Appointment Permission `, function () {
			// cy.get(TopNavigationHeader.global_search_textbox).clear().type(customer.firstName + " " + customer.lastName)
			// cy.wait('@QuickSearch').then((xhr) => {
				// cy.get(TopNavigationHeader.displayed_result).then(($list) => {
					// if ($list.length > 0) {
						// cy.wrap($list).first().click()
						// cy.wait("@CustomerSummary").then((xhr) => {
							// cy.get(CustomerCardElements.main_div).should('be.visible')
							// cy.get(CustomerCardElements.main_tabs).contains('Activity').click()
							// cy.get(CustomerCardElements.activity_tabs).contains('appt').click()
						// })
					// }
				// })
			// })
			// //Create appointment with the type as sales
			// let dataToType = "Test Text " + (new Date()).getTime()
				// cy.get(CustomerCardElements.activity_appt_textarea).type(dataToType)
				// cy.get(CustomerCardElements.activity_appt_extra_options).first().within(() => {
					// cy.get("select").select("Sales")
				// })
				// cy.get(CustomerCardElements.activity_appt_date).click()
				// cy.wait(1000)
				// cy.get(CustomerCardElements.activity_appt_date_not_disabled_cell).last().click({
					// force: true
				// })
				// let selectedDate = ""
				// cy.get(CustomerCardElements.activity_appt_date_input).invoke("val").then(text => {
					// selectedDate = text
				// })
				// cy.wait(2000)
				// // cy.get(CustomerCardElements.activity_appt_time_slot).focus()
				// // cy.get(CustomerCardElements.activity_appt_time_slot_options).within(() => {
				// // cy.contains(timeSlots[22]).click({
				// // force: true
				// // })
				// // })
				// //Enter time into Time field
				// cy.get(CustomerCardElements.activity_appt_time_slot).type('11:25 AM', {
					// force: true
				// })
				// let selectedTimeSlot = ""
				// cy.get(CustomerCardElements.activity_appt_time_slot).invoke("val").then(text => {
					// selectedTimeSlot = text
				// })
				// cy.get(CustomerCardElements.activity_appt_extra_options).last().within(() => {
					// cy.get("select").select("Assign to me")
				// })
				// cy.get(CustomerCardElements.activity_appt_save_button).should('not.have.attr', 'disabled')
				// cy.get(CustomerCardElements.activity_appt_save_button).click()
				// cy.get(".modal-close").click()

		// })

		// it(`Test 2 - Delete appointment from view appointment screen with a user permission and confirmation "NO"`, function () {
			// //Click on appointments icon at menubar
			// cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click({
				// force: true
			// })
			// //click on next date button
			// cy.wait("@AppointmentGrid").then((xhr) => {
				// cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible').invoke('text').then((text) => {
					// // capture what num is right now
					// const num1 = text
						// //cy.log(num1)

				// })
				// cy.get(AppointmentCardElements.apt_date_filter_button).click()
					// cy.get(AppointmentCardElements.apt_date_button_in_filters_window).click()
					// cy.get(AppointmentCardElements.apt_date_filter_list).contains('Custom').click()
					// // const todaysDate = Cypress.moment().format('MM/DD/YYYY')
					// // cy.log(todaysDate)
					// cy.get(AppointmentCardElements.apt_date_filter_enddate_grid).last().click({
						// force: true
					// })
					// cy.get(AppointmentCardElements.apt_sate_custom_date_range).click()
					// cy.get(AppointmentCardElements.apt_date_filter_window_close).click()
				// cy.get(AppointmentCardElements.apt_data_list).contains(customer.firstName + " " + customer.lastName).click({
					// force: true
				// })
				// //View appointment window header
				// cy.get(AppointmentCardElements.card_title).should('be.exist')
				// //Delete Button existance
				// cy.get(AppointmentCardElements.appointment_delete_button).should('be.exist')
				// //cy.get(AppointmentCardElements.apt_notes_text_are).should('have.attr', 'disabled')
				// cy.get(AppointmentCardElements.appointment_delete_button).click()
				// cy.get(AppointmentCardElements.appointment_delete_confirm_NO).click()
				
				
			// })
			// //Close view appointment window
			// cy.get(AppointmentCardElements.view_apt_window_close).click()
			// //navigate back to home screen
			// cy.get(UserManagementElemenets.dc_homelogo).click()

		// })
		
		// it(`Test 3 - Delete appointment from view appointment screen with a user permission and confirmation "Yes"`, function () {
			// //Click on appointments icon at menubar
			// cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click({
				// force: true
			// })
			// //click on next date button
			// cy.wait("@AppointmentGrid").then((xhr) => {
				// cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible').invoke('text').then((text) => {
					// // capture what num is right now
					// const num1 = text
						// //cy.log(num1)

				// })
				// cy.get(AppointmentCardElements.apt_date_filter_button).click()
					// cy.get(AppointmentCardElements.apt_date_button_in_filters_window).click()
					// cy.get(AppointmentCardElements.apt_date_filter_list).contains('Custom').click()
					// // const todaysDate = Cypress.moment().format('MM/DD/YYYY')
					// // cy.log(todaysDate)
					// cy.get(AppointmentCardElements.apt_date_filter_enddate_grid).last().click({
						// force: true
					// })
					// cy.get(AppointmentCardElements.apt_sate_custom_date_range).click()
					// cy.get(AppointmentCardElements.apt_date_filter_window_close).click()
				// cy.get(AppointmentCardElements.apt_data_list).contains(customer.firstName + " " + customer.lastName).click({
					// force: true
				// })
				// //View appointment window header
				// cy.get(AppointmentCardElements.card_title).should('be.exist')
				// //Delete Button existance
				// cy.get(AppointmentCardElements.appointment_delete_button).should('be.exist')
				// //cy.get(AppointmentCardElements.apt_notes_text_are).should('have.attr', 'disabled')
				// cy.get(AppointmentCardElements.appointment_delete_button).click()
				// cy.get(AppointmentCardElements.appointment_delete_confirm_YES).click()
				
				
			// })
			// //Close view appointment window
			// cy.get(AppointmentCardElements.view_apt_window_close).click()
			// //navigate back to home screen
			// cy.get(UserManagementElemenets.dc_homelogo).click()

		// })

		it(`Test 4 - Reassign an Appointment with a User a Permission from view appointment window`, function () {
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click({
				force: true
			})
			//click on next date button
			cy.wait("@AppointmentGrid").then((xhr) => {
				cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible').invoke('text').then((text) => {
					// capture what num is right now
					const num1 = text
						//cy.log(num1)

				})
				cy.get(AppointmentCardElements.apt_date_filter_button).click()
					cy.get(AppointmentCardElements.apt_date_button_in_filters_window).click()
					cy.get(AppointmentCardElements.apt_date_filter_list).contains('Custom').click()
					// const todaysDate = Cypress.moment().format('MM/DD/YYYY')
					// cy.log(todaysDate)
					cy.get(AppointmentCardElements.apt_date_filter_enddate_grid).last().click({
						force: true
					})
					cy.get(AppointmentCardElements.apt_sate_custom_date_range).click()
					cy.get(AppointmentCardElements.apt_date_filter_window_close).click()
				cy.get(AppointmentCardElements.apt_data_list).contains(customer.firstName + " " + customer.lastName).click({
					force: true
				})
				//View appointment window header
				cy.get(AppointmentCardElements.card_title).should('be.exist')
				cy.get(AppointmentCardElements.appointment_assigned_to).click({force: true})
				cy.get(AppointmentCardElements.apt_search_user_input_box).clear({
					force: true
				}).type(AppointmentCardElements.appointment_reassign_user)
				cy.get(AppointmentCardElements.apt_search_user_results).should('have.value', AppointmentCardElements.appointment_reassign_user).click()
			})
			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		// it(`Test 5 - Reschedule an Appointment without a User a Permission from view appointment window`, function () {
			// //Click on appointments icon at menubar
			// cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click({
				// force: true
			// })
			// //click on next date button
			// cy.wait("@AppointmentGrid").then((xhr) => {
				// cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible').invoke('text').then((text) => {
					// // capture what num is right now
					// const num1 = text
						// //cy.log(num1)

				// })
				// cy.get(AppointmentCardElements.apt_date_filter_button).click()
					// cy.get(AppointmentCardElements.apt_date_button_in_filters_window).click()
					// cy.get(AppointmentCardElements.apt_date_filter_list).contains('Custom').click()
					// // const todaysDate = Cypress.moment().format('MM/DD/YYYY')
					// // cy.log(todaysDate)
					// cy.get(AppointmentCardElements.apt_date_filter_enddate_grid).last().click({
						// force: true
					// })
					// cy.get(AppointmentCardElements.apt_sate_custom_date_range).click()
					// cy.get(AppointmentCardElements.apt_date_filter_window_close).click()
				// cy.get(AppointmentCardElements.apt_data_list).contains(customer.firstName + " " + customer.lastName).click({
					// force: true
				// })
				// //View appointment window header
				// cy.get(AppointmentCardElements.card_title).should('be.exist')
				// cy.get(AppointmentCardElements.apt_date_input).should('have.attr', 'disabled')
				// cy.get(AppointmentCardElements.apt_time_input_box).should('be.disabled')
				
			// })
			// //Close view appointment window
			// cy.get(AppointmentCardElements.view_apt_window_close).click()
			// //navigate back to home screen
			// cy.get(UserManagementElemenets.dc_homelogo).click()

		// })
		// it(`Test 6 - Delete Appointment After test`, function () {
			// cy.get(TopNavigationHeader.global_search_textbox).clear().type(customer.firstName + " " + customer.lastName)
			// cy.wait('@QuickSearch').then((xhr) => {
				// cy.get(TopNavigationHeader.displayed_result).then(($list) => {
					// if ($list.length > 0) {
						// cy.wrap($list).first().click()
						// cy.wait("@CustomerSummary").then((xhr) => {
							// cy.get(CustomerCardElements.main_div).should('be.visible')
							// cy.get(CustomerCardElements.main_tabs).contains('Activity').click()
							// cy.get(CustomerCardElements.activity_tabs).contains('appt').click()
						// })
					// }
				// })
			// })
			// let listOfAppointments = 0
				// cy.get(CustomerCardElements.activity_appts_list).then(($list) => {
					// listOfAppointments = $list.length
						// if (listOfAppointments > 0) {
							// cy.get(CustomerCardElements.activity_appts_list_actions).first().contains("Delete").click()
							// cy.get(CustomerCardElements.confirmation_dialog).should("be.visible")
							// cy.get(CustomerCardElements.confirmation_dialog_content).contains("Are you sure you want to delete this appointment")
							// cy.get(CustomerCardElements.confirmation_dialog_actions).contains("Yes").click()
							// cy.wait("@DeleteAppointment").then((xhr) => {
								// cy.get(CustomerCardElements.confirmation_dialog).should("not.be.visible")
								// cy.wait("@Timeline").then((xhr) => {
									// cy.wait(4000)
									// cy.get(CustomerCardElements.activity_appts_list_parent).should("be.visible")
									// cy.get(CustomerCardElements.activity_appts_list_parent).then(($ulElement) => {
										// assert($ulElement.find("ul li.appointment").length < listOfAppointments)
									// })
								// })
							// })
						// }
				// })
		// })
		
		

	})
})