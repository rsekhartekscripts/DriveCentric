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
			cy.loginUI('viewaptUser')
			cy.server()
			cy.route({
				method: 'POST',
				url: '/api/legacy/DriveSearch/QuickSearch',
			}).as('QuickSearch')
			// cy.route({
			// method: 'GET',
			// url: '/api/customers/*/summary',
			// }).as('CustomerSummary')
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

		it(`Test 1 - Create an Appointment WITH a User Confirm Appointment Permission `, function () {
			cy.get(TopNavigationHeader.global_search_textbox).clear().type(customer.firstName + " " + customer.lastName)
			cy.wait('@QuickSearch').then((xhr) => {
				cy.get(TopNavigationHeader.displayed_result).then(($list) => {
					if ($list.length > 0) {
						cy.wrap($list).first().click()
						cy.wait("@CustomerSummary").then((xhr) => {
							cy.get(CustomerCardElements.main_div).should('be.visible')
							cy.get(CustomerCardElements.main_tabs).contains('Activity').click()
							cy.get(CustomerCardElements.activity_tabs).contains('appt').click()
						})
					}
				})
			})
			//Create appointment with the type as sales
			let dataToType = "Test Text " + (new Date()).getTime()
				cy.get(CustomerCardElements.activity_appt_textarea).type(dataToType)
				cy.get(CustomerCardElements.activity_appt_extra_options).first().within(() => {
					cy.get("select").select("Sales")
				})
				cy.get(CustomerCardElements.activity_appt_date).click()
				cy.wait(1000)
				cy.get(CustomerCardElements.activity_appt_date_not_disabled_cell).first().next().click({
					force: true
				})
				let selectedDate = ""
				cy.get(CustomerCardElements.activity_appt_date_input).invoke("val").then(text => {
					selectedDate = text
				})
				cy.wait(2000)
				// cy.get(CustomerCardElements.activity_appt_time_slot).focus()
				// cy.get(CustomerCardElements.activity_appt_time_slot_options).within(() => {
				// cy.contains(timeSlots[22]).click({
				// force: true
				// })
				// })
				cy.get(CustomerCardElements.activity_appt_time_slot).type('1111:25 AM', {
					force: true
				})
				let selectedTimeSlot = ""
				cy.get(CustomerCardElements.activity_appt_time_slot).invoke("val").then(text => {
					selectedTimeSlot = text
				})
				cy.get(CustomerCardElements.activity_appt_extra_options).last().within(() => {
					cy.get("select").select("Assign to me")
				})
				cy.get(CustomerCardElements.activity_appt_save_button).should('not.have.attr', 'disabled')
				cy.get(CustomerCardElements.activity_appt_save_button).click()
				cy.get(".modal-close").click()

				//NOt required at this movment can Delete created appointment as to avoid the duplicates
				let listOfAppointments = 0
				cy.get(CustomerCardElements.activity_appts_list).then(($list) => {
					listOfAppointments = $list.length
						if (listOfAppointments > 0) {
							cy.get(CustomerCardElements.activity_appts_list_actions).first().contains("Delete").click()
							cy.get(CustomerCardElements.confirmation_dialog).should("be.visible")
							cy.get(CustomerCardElements.confirmation_dialog_content).contains("Are you sure you want to delete this appointment")
							cy.get(CustomerCardElements.confirmation_dialog_actions).contains("Yes").click()
							cy.wait("@DeleteAppointment").then((xhr) => {
								cy.get(CustomerCardElements.confirmation_dialog).should("not.be.visible")
								cy.wait("@Timeline").then((xhr) => {
									cy.wait(4000)
									cy.get(CustomerCardElements.activity_appts_list_parent).should("be.visible")
									cy.get(CustomerCardElements.activity_appts_list_parent).then(($ulElement) => {
										assert($ulElement.find("ul li.appointment").length < listOfAppointments)
									})
								})
							})
						}
				})
		})

		it(`Test 2 - Navigate to Appointments list from menu bar `, function () {
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			//Wait to display data
			cy.get(AppointmentCardElements.apt_data_list).should('be.exist')
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		it(`Test 3 - View appointment from Appointment list `, function () {
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			//cy.get(AppointmentCardElements.apt_data_list).should('be.exist')
			cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
			cy.get(AppointmentCardElements.apt_data_list).should('be.exist')
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		it(`Test 4 - Validate view appointment window Header `, function () {
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			//click on next date button
			cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
			//appointment data list of elements in the grid and click on it
			cy.get(AppointmentCardElements.apt_data_list).should('be.exist').click()
			//View appointment window header
			cy.get(AppointmentCardElements.card_title).should('be.exist')
			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		it(`Test 5 - Verify Displayed Customer Name in view appointment screen `, function () {
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			//click on next date button
			cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
			//appointment data list of elements in the grid and click on it
			//cy.get(AppointmentCardElements.apt_data_list).should('be.exist').click()

			cy.wait("@AppointmentGrid").then((xhr) => {
				cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.get(AppointmentCardElements.apt_data_list).contains(customer.firstName + " " + customer.lastName).click({
					force: true
				})
				//View appointment window header
				cy.get(AppointmentCardElements.card_title).should('be.exist')
				//View appointment window header
				cy.get(AppointmentCardElements.card_title).should('be.exist')
				//verify Customer Name
				cy.get(AppointmentCardElements.apt_customer_name).should('be.exist').contains(customer.firstName + " " + customer.lastName)
			})

			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		it(`Test 6 - Navigate to Customer card from view appointment window by clicking on Customer Name `, function () {
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			//click on next date button
			cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
			//appointment data list of elements in the grid and click on it
			//cy.get(AppointmentCardElements.apt_data_list).should('be.exist').click()

			cy.wait("@AppointmentGrid").then((xhr) => {
				cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.get(AppointmentCardElements.apt_data_list).contains(customer.firstName + " " + customer.lastName).click({
					force: true
				})
				//View appointment window header
				cy.get(AppointmentCardElements.card_title).should('be.exist')
				//View appointment window header
				cy.get(AppointmentCardElements.card_title).should('be.exist')
				//verify Customer Name and click
				cy.get(AppointmentCardElements.apt_customer_name).should('be.exist').contains(customer.firstName + " " + customer.lastName).click({
					force: true
				})
				//customer card window
				cy.get(CustomerCardElements.contact_card_button).should('be.visible')
				cy.get(CustomerCardElements.close_div).click()
			})

			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		it(`Test 7 - Verify Assigned user Name in view appointment screen `, function () {
			let loginuser
			cy.wait("@profimg").then((xhr) => {
				cy.get(AppointmentCardElements.profile_Button).should('be.visible').click()
				cy.get(AppointmentCardElements.get_loggedin_user_name).should('be.visible').invoke('text').then((text) => {
					loginuser = text
						//cy.log(loginuser)
				})

			})
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click({
				force: true
			})
			//click on next date button
			cy.wait("@AppointmentGrid").then((xhr) => {
				cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible').invoke('text').then((text) => {
					// capture what num is right now
					const num1 = text
						cy.log(num1)

				})
				cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.get(AppointmentCardElements.apt_data_list).contains(customer.firstName + " " + customer.lastName).click({
					force: true
				})
				//View appointment window header
				cy.get(AppointmentCardElements.card_title).should('be.exist')
				//verify Assigned user Name
				cy.get(AppointmentCardElements.apt_assigned_user_name).should('be.exist').invoke('text').then((text) => {
					expect(text.trim()).contains(loginuser)
				})
			})
			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})

		it(`Test 9 - Navigate to Customer card from view appointment window by clicking on Associated Deal `, function () {
			let loginuser
			cy.wait("@profimg").then((xhr) => {
				cy.get(AppointmentCardElements.profile_Button).should('be.visible').click()
				cy.get(AppointmentCardElements.get_loggedin_user_name).should('be.visible').invoke('text').then((text) => {
					loginuser = text
						//cy.log(loginuser)
				})

			})
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click({
				force: true
			})
			//click on next date button
			cy.wait("@AppointmentGrid").then((xhr) => {
				cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible').invoke('text').then((text) => {
					// capture what num is right now
					const num1 = text
						cy.log(num1)

				})
				cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.get(AppointmentCardElements.apt_data_list).contains(customer.firstName + " " + customer.lastName).click({
					force: true
				})
				//View appointment window header
				cy.get(AppointmentCardElements.card_title).should('be.exist')
				//verify Assigned user Name
				cy.get(AppointmentCardElements.associate_deal_name).should('be.exist').click({
					force: true
				})
				cy.get(CustomerCardElements.contact_card_button).should('be.visible')
				cy.get(CustomerCardElements.close_div).click()
			})
			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		it(`Test 10 - Verify Department in view appointment screen `, function () {
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
				//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.get(AppointmentCardElements.apt_data_list).contains(customer.firstName + " " + customer.lastName).click({
					force: true
				})
				//View appointment window header
				cy.get(AppointmentCardElements.card_title).should('be.exist')
				//verify Department field
				cy.get(AppointmentCardElements.apt_department).should('be.exist').contains('Department')
				cy.get(AppointmentCardElements.apt_department_list).should('be.exist').invoke('text').then((text) => {
					cy.log(text)
				})
			})
			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})

		it(`Test 11 - Edit Department field in view appointment  `, function () {
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
				//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.get(AppointmentCardElements.apt_data_list).contains(customer.firstName + " " + customer.lastName).click({
					force: true
				})
				//View appointment window header
				cy.get(AppointmentCardElements.card_title).should('be.exist')
				//verify Department field
				cy.get(AppointmentCardElements.apt_department).should('be.exist').contains('Department')
				cy.get(AppointmentCardElements.apt_department_select).should('be.disabled')
			})
			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		it(`Test 12 - Verify Date in view appointment screen `, function () {
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
				//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.get(AppointmentCardElements.apt_data_list).contains(customer.firstName + " " + customer.lastName).click({
					force: true
				})
				//View appointment window header
				cy.get(AppointmentCardElements.card_title).should('be.exist')
				//Date field existance
				cy.get(AppointmentCardElements.apt_date_section).should('be.exist').contains('Date')
				cy.get(AppointmentCardElements.apt_date_input).should('have.attr', 'readonly')
			})
			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		it(`Test 13 - Edit Date field in view appointment `, function () {
			let selectedDate = ""
				let selectedDate1 = ""
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
					//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
					cy.get(AppointmentCardElements.apt_data_list).contains(customer.firstName + " " + customer.lastName).click({
						force: true
					})
					//View appointment window header
					cy.get(AppointmentCardElements.card_title).should('be.exist')
					//Date field existance
					cy.get(AppointmentCardElements.apt_date_section).should('be.exist').contains('Date')
					//cy.get(AppointmentCardElements.apt_date_input).type("Feb 20", {force: true})

					cy.get(AppointmentCardElements.apt_date_input).invoke("val").then(text => {
						selectedDate1 = text
							cy.log(selectedDate1)
					})
					cy.wait(1000)
					cy.get(AppointmentCardElements.apt_date_icon).click()
					cy.wait(1000)
					cy.get(AppointmentCardElements.appt_view__date_not_disabled_cell).last().click({
						force: true
					})
					cy.get(AppointmentCardElements.view_apt_window_save).click()
					cy.get(AppointmentCardElements.apt_user_msg_alert_window).contains("Sorry, you don't have permission to edit appointments.")
					cy.get(AppointmentCardElements.apt_alert_window_done_button).click()
					//close the view appointment window and reopen to get the date value and compare with previous one
					cy.get(AppointmentCardElements.view_apt_window_close).click()
					cy.get(AppointmentCardElements.apt_data_list).contains(customer.firstName + " " + customer.lastName).click({
						force: true
					})
					cy.get(AppointmentCardElements.apt_date_input).invoke("val").then(text => {
						selectedDate = text
							expect(selectedDate).to.equal(selectedDate1)
							cy.log(selectedDate)

					})
				})
				//Close view appointment window
				cy.get(AppointmentCardElements.view_apt_window_close).click()
				//navigate back to home screen
				cy.get(UserManagementElemenets.dc_homelogo).click()
		})

		it(`Test 14 - Verify Time in view appointment screen `, function () {
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
				//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.get(AppointmentCardElements.apt_data_list).contains(customer.firstName + " " + customer.lastName).click({
					force: true
				})
				//View appointment window header
				cy.get(AppointmentCardElements.card_title).should('be.exist')
				//Date field existance
				cy.get(AppointmentCardElements.apt_time_section).should('be.exist').contains('Time')
				cy.get(AppointmentCardElements.apt_time_input_box).should('be.visible')
			})
			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		it(`Test 15 - Edit Time field in view appointment `, function () {
			let selectedTime = ""
				let selectedTime1 = ""
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
					//*** Select custom date range from filters and procced
					//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
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
					//Date field existance
					cy.get(AppointmentCardElements.apt_time_section).should('be.exist').contains('Time')

					cy.get(AppointmentCardElements.apt_time_input_box).invoke("val").then(text => {
						selectedTime1 = text
							cy.log(selectedTime1)
					})
					cy.wait(1000)
					cy.get(AppointmentCardElements.apt_time_input_box).clear().type('11:00 PM', {
						force: true
					})
					// cy.wait(1000)
					// cy.get(AppointmentCardElements.appt_view__date_not_disabled_cell).last().click({
					// force: true
					// })
					cy.get(AppointmentCardElements.view_apt_window_save).click()
					cy.get(AppointmentCardElements.apt_user_msg_alert_window).contains("Sorry, you don't have permission to edit appointments.")
					cy.get(AppointmentCardElements.apt_alert_window_done_button).click()
					//close the view appointment window and reopen to get the date value and compare with previous one
					cy.get(AppointmentCardElements.view_apt_window_close).click()
					cy.get(AppointmentCardElements.apt_data_list).contains(customer.firstName + " " + customer.lastName).click({
						force: true
					})
					cy.get(AppointmentCardElements.apt_time_input_box).invoke("val").then(text => {
						selectedTime = text
							expect(selectedTime).to.equal(selectedTime1)
							cy.log(selectedTime)

					})
				})
				//Close view appointment window
				cy.get(AppointmentCardElements.view_apt_window_close).click()
				//navigate back to home screen
				cy.get(UserManagementElemenets.dc_homelogo).click()
		})

	})
})