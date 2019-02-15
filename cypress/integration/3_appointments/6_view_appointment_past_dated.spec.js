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

		it(`Test 1 - Verify SAVE button is disabled button in veiw appointment of pastdated `, function () {
			let customer_name_gird
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			cy.wait(5000)
			//click on next date button
			//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.wait("@AppointmentGrid").then((xhr) => {
				//*** Select custom date range from filters and procced
					//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
					cy.wait(10000)
					cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible')
					cy.get(AppointmentCardElements.apt_date_filter_button).click()
					cy.get(AppointmentCardElements.apt_date_button_in_filters_window).click()
					cy.get(AppointmentCardElements.apt_date_filter_list).contains(AppointmentCardElements.apt_past_date_range).click()
					cy.get(AppointmentCardElements.apt_date_filter_window_close).click()
					//let customer_name_gird
					cy.get(AppointmentCardElements.apt_customer_value_grid).should('be.visible').invoke('text').then((text) => {
					customer_name_gird = text
						cy.log(customer_name_gird)
						cy.get(AppointmentCardElements.apt_data_list).contains(customer_name_gird).click({
					force: true
				})
				//View appointment window header
				cy.get(AppointmentCardElements.card_title).should('be.exist')
				//verify Customer Name
				cy.get(AppointmentCardElements.view_apt_window_save).should('have.attr', 'disabled')
						
				})
				
			})

			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		it(`Test 2 - Verify CLOSE button is enabled button in veiw appointment of pastdated `, function () {
			let customer_name_gird
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			cy.wait(5000)
			//click on next date button
			//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.wait("@AppointmentGrid").then((xhr) => {
				//*** Select custom date range from filters and procced
					//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
					cy.wait(10000)
					cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible')
					cy.get(AppointmentCardElements.apt_date_filter_button).click()
					cy.get(AppointmentCardElements.apt_date_button_in_filters_window).click()
					cy.get(AppointmentCardElements.apt_date_filter_list).contains(AppointmentCardElements.apt_past_date_range).click()
					cy.get(AppointmentCardElements.apt_date_filter_window_close).click()
					//let customer_name_gird
					cy.get(AppointmentCardElements.apt_customer_value_grid).should('be.visible').invoke('text').then((text) => {
					customer_name_gird = text
						cy.log(customer_name_gird)
						cy.get(AppointmentCardElements.apt_data_list).contains(customer_name_gird).click({
					force: true
				})
				//View appointment window header
				cy.get(AppointmentCardElements.card_title).should('be.exist')
				//verify Customer Name
				cy.get(AppointmentCardElements.view_apt_window_close).should('be.visible')
						
				})
				
			})

			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		
		it(`Test 3 - Verify Displayed Customer Name in veiw appointment of pastdated `, function () {
			let customer_name_gird
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			cy.wait(5000)
			//click on next date button
			//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.wait("@AppointmentGrid").then((xhr) => {
				//*** Select custom date range from filters and procced
					//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
					cy.wait(10000)
					cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible')
					cy.get(AppointmentCardElements.apt_date_filter_button).click()
					cy.get(AppointmentCardElements.apt_date_button_in_filters_window).click()
					cy.get(AppointmentCardElements.apt_date_filter_list).contains(AppointmentCardElements.apt_past_date_range).click()
					cy.get(AppointmentCardElements.apt_date_filter_window_close).click()
					//let customer_name_gird
					cy.get(AppointmentCardElements.apt_customer_value_grid).should('be.visible').invoke('text').then((text) => {
					customer_name_gird = text
						cy.log(customer_name_gird)
						cy.get(AppointmentCardElements.apt_data_list).contains(customer_name_gird).click({
					force: true
				})
				//View appointment window header
				cy.get(AppointmentCardElements.card_title).should('be.exist')
				//verify Customer Name
				cy.get(AppointmentCardElements.apt_customer_name).should('be.exist').contains(customer_name_gird)
						
				})
				
			})

			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		it(`Test 4 - Navigate to Customer card from veiw appointment of pastdated by clicking on Customer Name `, function () {
			let customer_name_gird
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			cy.wait(5000)
			//click on next date button
			//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.wait("@AppointmentGrid").then((xhr) => {
				//*** Select custom date range from filters and procced
					//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
					cy.wait(10000)
					cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible')
					cy.get(AppointmentCardElements.apt_date_filter_button).click()
					cy.get(AppointmentCardElements.apt_date_button_in_filters_window).click()
					cy.get(AppointmentCardElements.apt_date_filter_list).contains(AppointmentCardElements.apt_past_date_range).click()
					cy.get(AppointmentCardElements.apt_date_filter_window_close).click()
					//let customer_name_gird
					cy.get(AppointmentCardElements.apt_customer_value_grid).should('be.visible').invoke('text').then((text) => {
					customer_name_gird = text
						cy.log(customer_name_gird)
						cy.get(AppointmentCardElements.apt_data_list).contains(customer_name_gird).click({
					force: true
				})
				//View appointment window header
				cy.get(AppointmentCardElements.card_title).should('be.exist')
				//verify Customer Name
				cy.get(AppointmentCardElements.apt_customer_name).should('be.exist').contains(customer_name_gird).click({force: true})
						
				})
				cy.get(CustomerCardElements.contact_card_button).should('be.visible')
				cy.get(CustomerCardElements.close_div).click()
				
			})

			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		it(`Test 5 - Verify Assigned user Name in veiw appointment of pastdated `, function () {
			let customer_name_gird
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			cy.wait(5000)
			//click on next date button
			//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.wait("@AppointmentGrid").then((xhr) => {
				//*** Select custom date range from filters and procced
					//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
					cy.wait(10000)
					cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible')
					cy.get(AppointmentCardElements.apt_date_filter_button).click()
					cy.get(AppointmentCardElements.apt_date_button_in_filters_window).click()
					cy.get(AppointmentCardElements.apt_date_filter_list).contains(AppointmentCardElements.apt_past_date_range).click()
					cy.get(AppointmentCardElements.apt_date_filter_window_close).click()
					//let customer_name_gird
					cy.get(AppointmentCardElements.apt_customer_value_grid).should('be.visible').invoke('text').then((text) => {
					customer_name_gird = text
						cy.log(customer_name_gird)
						cy.get(AppointmentCardElements.apt_data_list).contains(customer_name_gird).click({
					force: true
				})
				//View appointment window header
				cy.get(AppointmentCardElements.card_title).should('be.exist')
				//verify Customer Name and navigate to customer card
				//verify Assigned user Name
				cy.get(AppointmentCardElements.apt_assigned_user_name).should('be.exist')
				// .invoke('text').then((text) => {
					// expect(text.trim()).contains(loginuser)
				// })
			})
						
				})
			

			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		
		it(`Test 6 - Verify Associated Deal in veiw appointment of pastdated`, function () {
			let customer_name_gird
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			cy.wait(5000)
			//click on next date button
			//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
			cy.wait("@AppointmentGrid").then((xhr) => {
				//*** Select custom date range from filters and procced
				//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.wait(10000)
				cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible')
				cy.get(AppointmentCardElements.apt_date_filter_button).click()
				cy.get(AppointmentCardElements.apt_date_button_in_filters_window).click()
				cy.get(AppointmentCardElements.apt_date_filter_list).contains(AppointmentCardElements.apt_past_date_range).click()
				cy.get(AppointmentCardElements.apt_date_filter_window_close).click()
				//let customer_name_gird
				cy.get(AppointmentCardElements.apt_customer_value_grid).should('be.visible').invoke('text').then((text) => {
					customer_name_gird = text
						cy.log(customer_name_gird)
						cy.get(AppointmentCardElements.apt_data_list).contains(customer_name_gird).click({
							force: true
						})
						//View appointment window header
						cy.get(AppointmentCardElements.card_title).should('be.exist')
						//verify Associated deal Name
						cy.get(AppointmentCardElements.associate_deal_name).should('be.exist')

				})

			})

			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		
		it(`Test 7 - Navigate to Customer card from veiw appointment of pastdated by clicking on Associated Deal details`, function () {
			let customer_name_gird
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			cy.wait(5000)
			//click on next date button
			//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
			cy.wait("@AppointmentGrid").then((xhr) => {
				//*** Select custom date range from filters and procced
				//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.wait(10000)
				cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible')
				cy.get(AppointmentCardElements.apt_date_filter_button).click()
				cy.get(AppointmentCardElements.apt_date_button_in_filters_window).click()
				cy.get(AppointmentCardElements.apt_date_filter_list).contains(AppointmentCardElements.apt_past_date_range).click()
				cy.get(AppointmentCardElements.apt_date_filter_window_close).click()
				//let customer_name_gird
				cy.get(AppointmentCardElements.apt_customer_value_grid).should('be.visible').invoke('text').then((text) => {
					customer_name_gird = text
						cy.log(customer_name_gird)
						cy.get(AppointmentCardElements.apt_data_list).contains(customer_name_gird).click({
							force: true
						})
						//View appointment window header
						cy.get(AppointmentCardElements.card_title).should('be.exist')
						//verify Associated deal Name
						cy.get(AppointmentCardElements.associate_deal_name).should('be.exist').click({force: true})
						cy.get(CustomerCardElements.contact_card_button).should('be.visible')
						cy.get(CustomerCardElements.close_div).click()

				})

			})

			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		
		it(`Test 8 - Verify Department field is disabled in veiw appointment of pastdated`, function () {
			let customer_name_gird
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			cy.wait(5000)
			//click on next date button
			//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
			cy.wait("@AppointmentGrid").then((xhr) => {
				//*** Select custom date range from filters and procced
				//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.wait(10000)
				cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible')
				cy.get(AppointmentCardElements.apt_date_filter_button).click()
				cy.get(AppointmentCardElements.apt_date_button_in_filters_window).click()
				cy.get(AppointmentCardElements.apt_date_filter_list).contains(AppointmentCardElements.apt_past_date_range).click()
				cy.get(AppointmentCardElements.apt_date_filter_window_close).click()
				//let customer_name_gird
				cy.get(AppointmentCardElements.apt_customer_value_grid).should('be.visible').invoke('text').then((text) => {
					customer_name_gird = text
						cy.log(customer_name_gird)
						cy.get(AppointmentCardElements.apt_data_list).contains(customer_name_gird).click({
							force: true
						})
						//View appointment window header
						cy.get(AppointmentCardElements.card_title).should('be.exist')
						//verify Associated deal Name
						cy.get(AppointmentCardElements.apt_department_select).should('have.attr', 'disabled')

				})

			})

			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		it(`Test 9 - Verify Date field is disabled in veiw appointment of pastdated`, function () {
			let customer_name_gird
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			cy.wait(5000)
			//click on next date button
			//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
			cy.wait("@AppointmentGrid").then((xhr) => {
				//*** Select custom date range from filters and procced
				//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.wait(10000)
				cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible')
				cy.get(AppointmentCardElements.apt_date_filter_button).click()
				cy.get(AppointmentCardElements.apt_date_button_in_filters_window).click()
				cy.get(AppointmentCardElements.apt_date_filter_list).contains(AppointmentCardElements.apt_past_date_range).click()
				cy.get(AppointmentCardElements.apt_date_filter_window_close).click()
				//let customer_name_gird
				cy.get(AppointmentCardElements.apt_customer_value_grid).should('be.visible').invoke('text').then((text) => {
					customer_name_gird = text
						cy.log(customer_name_gird)
						cy.get(AppointmentCardElements.apt_data_list).contains(customer_name_gird).click({
							force: true
						})
						//View appointment window header
						cy.get(AppointmentCardElements.card_title).should('be.exist')
						//verify date Name
						cy.get(AppointmentCardElements.apt_date_section).should('be.exist').contains('Date')
						cy.get(AppointmentCardElements.apt_date_input).should('have.attr', 'disabled')

				})

			})

			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		
		it(`Test 10 - Verify Time field is disabled in veiw appointment of pastdated`, function () {
			let customer_name_gird
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			cy.wait(5000)
			//click on next date button
			//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
			cy.wait("@AppointmentGrid").then((xhr) => {
				//*** Select custom date range from filters and procced
				//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.wait(10000)
				cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible')
				cy.get(AppointmentCardElements.apt_date_filter_button).click()
				cy.get(AppointmentCardElements.apt_date_button_in_filters_window).click()
				cy.get(AppointmentCardElements.apt_date_filter_list).contains(AppointmentCardElements.apt_past_date_range).click()
				cy.get(AppointmentCardElements.apt_date_filter_window_close).click()
				//let customer_name_gird
				cy.get(AppointmentCardElements.apt_customer_value_grid).should('be.visible').invoke('text').then((text) => {
					customer_name_gird = text
						cy.log(customer_name_gird)
						cy.get(AppointmentCardElements.apt_data_list).contains(customer_name_gird).click({
							force: true
						})
						//View appointment window header
						cy.get(AppointmentCardElements.card_title).should('be.exist')
						//Time field existance
				cy.get(AppointmentCardElements.apt_time_section).should('be.exist').contains('Time')
				cy.get(AppointmentCardElements.apt_time_input_box).should('have.attr', 'disabled')

				})

			})

			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		
		it(`Test 11 - Verify Notes field is disabled in veiw appointment of pastdated`, function () {
			let customer_name_gird
			//Click on appointments icon at menubar
			cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			cy.wait(5000)
			//click on next date button
			//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
			cy.wait("@AppointmentGrid").then((xhr) => {
				//*** Select custom date range from filters and procced
				//cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				cy.wait(10000)
				cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible')
				cy.get(AppointmentCardElements.apt_date_filter_button).click()
				cy.get(AppointmentCardElements.apt_date_button_in_filters_window).click()
				cy.get(AppointmentCardElements.apt_date_filter_list).contains(AppointmentCardElements.apt_past_date_range).click()
				cy.get(AppointmentCardElements.apt_date_filter_window_close).click()
				//let customer_name_gird
				cy.get(AppointmentCardElements.apt_customer_value_grid).should('be.visible').invoke('text').then((text) => {
					customer_name_gird = text
						cy.log(customer_name_gird)
						cy.get(AppointmentCardElements.apt_data_list).contains(customer_name_gird).click({
							force: true
						})
						//View appointment window header
						cy.get(AppointmentCardElements.card_title).should('be.exist')
						//Notes field existance
				cy.get(AppointmentCardElements.apt_notes_section).should('be.exist').contains('Notes')
				cy.get(AppointmentCardElements.apt_notes_text_are).should('have.attr', 'disabled')

				})

			})

			//Close view appointment window
			cy.get(AppointmentCardElements.view_apt_window_close).click()
			//navigate back to home screen
			cy.get(UserManagementElemenets.dc_homelogo).click()

		})
		// it(`Test 12 - Verify Date filed value of appointment list is equal to view appointmnet window Date field value `, function () {
			// let customer_date_gird
			// //Click on appointments icon at menubar
			// cy.get(AppointmentCardElements.appointment_icon_button).should('be.visible').click()
			// cy.wait(5000)
			// //click on next date button
			// //cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
				// cy.wait("@AppointmentGrid").then((xhr) => {
				// //*** Select custom date range from filters and procced
					// //cy.get(AppointmentCardElements.apt_datefilter_next_Button).should('be.visible').click()
					// cy.wait(10000)
					// cy.get(AppointmentCardElements.aptAll_count_in_header).should('be.visible')
					// cy.get(AppointmentCardElements.apt_date_filter_button).click()
					// cy.get(AppointmentCardElements.apt_date_button_in_filters_window).click()
					// cy.get(AppointmentCardElements.apt_date_filter_list).contains(AppointmentCardElements.apt_past_date_range).click()
					// cy.get(AppointmentCardElements.apt_date_filter_window_close).click()
					// //let customer_name_gird
					// cy.get(AppointmentCardElements.apt_date_value_grid).should('be.visible').invoke('text').then((text) => {
					// customer_date_gird = text
						// cy.log(customer_date_gird)
						// cy.get(AppointmentCardElements.apt_data_list).contains(customer_date_gird).click({
					// force: true
				// })
				// //View appointment window header
				// cy.get(AppointmentCardElements.card_title).should('be.exist')
				// //verify Customer Name and navigate to customer card
				// //verify Assigned user Name
				// cy.get(AppointmentCardElements.apt_date_section).contains("Feb 05")
				// // .invoke('text').then((text) => {
					// // expect(text.trim()).contains(loginuser)
				// // })
			// })
						
				// })
			

			// //Close view appointment window
			// cy.get(AppointmentCardElements.view_apt_window_close).click()
			// //navigate back to home screen
			// cy.get(UserManagementElemenets.dc_homelogo).click()

		// })
		
		
		

	})
})