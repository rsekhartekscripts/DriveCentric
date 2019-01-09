import * as TopNavigationHeader from './../../HTMLElementSelectors/TopNavigationHeader.json';
import * as customersList from './../../fixtures/customers.json';

import * as SalesHomeElements from './../../HTMLElementSelectors/SalesHome.json';
import * as CustomerCardElements from './../../HTMLElementSelectors/CustomerCard.json';

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

context('Appointments', () => {

    describe('Enterprise User - Add New Appointment', () => {
		before(function () {
	       cy.loginUI('enterprise')
		})

	    beforeEach(() => {
	      cy.server()
	      cy.route({
	        method: 'POST',
	        url: '/api/legacy/DriveSearch/QuickSearch',
	      }).as('QuickSearch')
	      cy.route({
	        method: 'POST',
	        url: '/api/customers/*/appointment',
	      }).as('CreateAppointment')
	      cy.route({
	        method: 'GET',
	        url: '/api/customers/*/timeline/',
	      }).as('Timeline')
	      cy.get(TopNavigationHeader.global_search_textbox).clear().type(customer.firstName+" "+customer.lastName)
			cy.wait('@QuickSearch').then((xhr) => {
				cy.get(TopNavigationHeader.displayed_result).then(($list) => {
		          if($list.length > 0){
		            cy.wrap($list).first().click()
            		cy.get(CustomerCardElements.main_div).should('be.visible')
		            cy.get(CustomerCardElements.main_tabs).contains('Activity').click()
		            cy.get(CustomerCardElements.activity_tabs).contains('appt').click()
		          }
		        })
		    })
	    })

	    afterEach(() => {
	    	cy.get(CustomerCardElements.close_div).click()
	    })
	    
	  
	    it('Test 1 - Validate Add Appointment Tab visibility', function() {
            cy.get(CustomerCardElements.activity_appt_textarea).should('be.visible')
		})
	  
	    it('Test 2 - Validate fields for Types of Appointments under APPT', function() {
		    cy.get(CustomerCardElements.activity_appt_textarea).type("Test Text").then(()=>{
		   		cy.get(CustomerCardElements.activity_appt_textarea).clear()
		    })
		    cy.get(CustomerCardElements.activity_appt_extra_options).then(($list) => {
		    	assert($list.length == 4)
		    })
		    cy.get(CustomerCardElements.activity_appt_extra_options).first().get("select").within(() => {
		    	cy.contains("Sales")
		    	cy.contains("Delivery")
		    	cy.contains("Service")
		    	cy.contains("General")
		    })
		    cy.get(CustomerCardElements.activity_appt_time_slot).focus()
		    cy.get(CustomerCardElements.activity_appt_time_slot_options).within(() =>{
		    	for(let i=0; i<timeSlots.length; i++){
		    		cy.contains(timeSlots[i])
		    	}
		    })
			cy.get(CustomerCardElements.activity_appt_extra_options).last().get("select").within(() => {
		    	cy.contains("Assign to me")
		    })
		})

	    it('Test 3 - Create Sales Appointment and assign to me', function() {
		    cy.get(CustomerCardElements.activity_appt_textarea).type("Test Text")
		    cy.get(CustomerCardElements.activity_appt_extra_options).first().within(() => {
		    	cy.get("select").select("Sales")
		    })
		    cy.get(CustomerCardElements.activity_appt_time_slot).focus()
		    cy.get(CustomerCardElements.activity_appt_time_slot_options).within(() =>{
		    	cy.contains(timeSlots[22]).click()
		    })
		    let selectedTimeSlot = ""
		    cy.get(CustomerCardElements.activity_appt_time_slot).invoke("val").then(text => {
		    	selectedTimeSlot = text
		    })
		    cy.get(CustomerCardElements.activity_appt_date).click()
		    cy.wait(1000)
		    cy.get(CustomerCardElements.activity_appt_date_not_disabled_cell).last().click()
		    let selectedDate = ""
		    cy.get(CustomerCardElements.activity_appt_date_input).invoke("val").then(text => {
		    	selectedDate = text
		    })
			cy.get(CustomerCardElements.activity_appt_extra_options).last().within(() => {
				cy.get("select").select("Assign to me")
			})
			cy.get(CustomerCardElements.activity_appt_save_button).should('not.have.attr', 'disabled')
			cy.get(CustomerCardElements.activity_appt_save_button).click()
			cy.wait("@CreateAppointment").then((xhr) => {
				// console.log(xhr)
				cy.get(CustomerCardElements.activity_appt_save_button).should('have.attr', 'disabled')
				cy.wait("@Timeline").then((xhr) => {
					cy.wait(4000)
					// console.log(xhr)
					cy.get(CustomerCardElements.activity_appts_list).should("be.visible")
					cy.get(CustomerCardElements.activity_appts_list).last().within(() => {
						cy.contains("Test Text")
						cy.contains(selectedDate)
						cy.contains(selectedTimeSlot)
					})
				})
			})
		})


	    it('Test 4 - Create Duplicate Sales Appointment <with existing appointment date and time> ', function() {
		    cy.get(CustomerCardElements.activity_appt_textarea).type("Test Text")
		    cy.get(CustomerCardElements.activity_appt_extra_options).first().within(() => {
		    	cy.get("select").select("Sales")
		    })
		    cy.get(CustomerCardElements.activity_appt_time_slot).focus()
		    cy.get(CustomerCardElements.activity_appt_time_slot_options).within(() =>{
		    	cy.contains(timeSlots[22]).click()
		    })
		    let selectedTimeSlot = ""
		    cy.get(CustomerCardElements.activity_appt_time_slot).invoke("val").then(text => {
		    	selectedTimeSlot = text
		    })
		    cy.get(CustomerCardElements.activity_appt_date).click()
		    cy.wait(1000)
		    cy.get(CustomerCardElements.activity_appt_date_not_disabled_cell).last().click()
		    let selectedDate = ""
		    cy.get(CustomerCardElements.activity_appt_date_input).invoke("val").then(text => {
		    	selectedDate = text
		    })
			cy.get(CustomerCardElements.activity_appt_extra_options).last().within(() => {
				cy.get("select").select("Assign to me")
			})
			cy.get(CustomerCardElements.activity_appt_save_button).should('not.have.attr', 'disabled')
			cy.get(CustomerCardElements.activity_appt_save_button).click()
			cy.wait("@CreateAppointment").then((xhr) => {
				// console.log(xhr)
				cy.get(CustomerCardElements.alert_dialog).should("be.visible")
				cy.get(CustomerCardElements.alert_dialog).within(() => {
					cy.contains(existingAppointmentText)
				})
				cy.get(CustomerCardElements.alert_dialog_actions).within(() => {
					cy.contains("Done").click()
				})
			})
		})

		it('Test 5 - Create Sales Appointment with After business hours ', function() {
		    cy.get(CustomerCardElements.activity_appt_textarea).type("Test Text")
		    cy.get(CustomerCardElements.activity_appt_extra_options).first().within(() => {
		    	cy.get("select").select("Sales")
		    })
		    cy.get(CustomerCardElements.activity_appt_time_slot).focus()
		    cy.get(CustomerCardElements.activity_appt_time_slot_options).within(() =>{
		    	cy.contains(timeSlots[0]).click()
		    })
		    let selectedTimeSlot = ""
		    cy.get(CustomerCardElements.activity_appt_time_slot).invoke("val").then(text => {
		    	selectedTimeSlot = text
		    })
		    cy.get(CustomerCardElements.activity_appt_date).click()
		    cy.wait(1000)
		    cy.get(CustomerCardElements.activity_appt_date_not_disabled_cell).last().click()
		    let selectedDate = ""
		    cy.get(CustomerCardElements.activity_appt_date_input).invoke("val").then(text => {
		    	selectedDate = text
		    })
			cy.get(CustomerCardElements.activity_appt_extra_options).last().within(() => {
				cy.get("select").select("Assign to me")
			})
			cy.get(CustomerCardElements.activity_appt_save_button).should('not.have.attr', 'disabled')
			cy.get(CustomerCardElements.activity_appt_save_button).click()
			cy.wait("@CreateAppointment").then((xhr) => {
				// console.log(xhr)
				cy.get(CustomerCardElements.alert_dialog).should("be.visible")
				cy.get(CustomerCardElements.alert_dialog).within(() => {
					cy.contains(outOfBusinessHoursErrortext)
				})
				cy.get(CustomerCardElements.alert_dialog_actions).within(() => {
					cy.contains("Done").click()
				})
				cy.wait(2000)
			})
		})


		it('Test 6 - Create Sales Appointment with Past date', function() {
		    cy.get(CustomerCardElements.activity_appt_date).click()
		    cy.wait(1000)
		    cy.get(CustomerCardElements.activity_appt_date_disabled_cell).first().click({force: true})
		    let selectedDate = ""
		    cy.get(CustomerCardElements.activity_appt_date_input).invoke("val").then(text => {
		    	assert((!text || text.trim().length <=0 ))
		    })
		})


	})
})


