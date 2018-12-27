const salesAppointment = 'todaySales'

const userAccessUser = 'userAccess'
const teamAccessUser = 'teamAccess'
const storeAccessUser = 'storeAccess'
const enterpriseUser = 'enterprise'
const teamMemberUser = 'teamMember'
const genericUser = 'generic'
const store2User = 'store2'

const userAccessCustomer = 'appt1'
const teamAccessCustomer = 'appt2'
const storeAccessCustomer = 'appt3'
const enterpriseCustomer = 'appt4'
const teamMemberCustomer =  'appt5'
const genericCustomer = 'appt6'
const store2Customer = 'apptStore2'

const testing1Store = 'testing1'
const testing2Store = 'testing2'

const customerNameItem = '[data-test=list-CustomerMiniSquare]'

const allAppointmentsTabUrl = '#/list/All/LibraryTopTabAllAppointmentsToday/0/'

const store1AppointmentIds = []
const store2AppointmentIds = []

context('Appointment List Permissions', () => {

  before(() => {
    cy.login('power')
    cy.getStaticCustomers().as('customers')
    cy.createAppointment(salesAppointment, userAccessCustomer, testing1Store, userAccessUser)
      .then(resp => store1AppointmentIds.push(resp.body.id))
    cy.createAppointment(salesAppointment, teamAccessCustomer, testing1Store, teamAccessUser)
      .then(resp => store1AppointmentIds.push(resp.body.id))
    cy.createAppointment(salesAppointment, storeAccessCustomer, testing1Store, storeAccessUser)
      .then(resp => store1AppointmentIds.push(resp.body.id))
    cy.createAppointment(salesAppointment, enterpriseCustomer, testing1Store, enterpriseUser)
      .then(resp => store1AppointmentIds.push(resp.body.id))
    cy.createAppointment(salesAppointment, teamMemberCustomer, testing1Store, teamMemberUser)
      .then(resp => store1AppointmentIds.push(resp.body.id))
    cy.createAppointment(salesAppointment, genericCustomer, testing1Store, genericUser)
      .then(resp => store1AppointmentIds.push(resp.body.id))
    cy.createAppointment(salesAppointment, store2Customer, testing2Store, store2User)
      .then(resp => store2AppointmentIds.push(resp.body.id))
  })

  describe('UserAccess User', () => {
    beforeEach(function() {
      cy.login(userAccessUser)
      cy.visit(allAppointmentsTabUrl)
    })

    it('Test 33 - Can see an appointment assigned to them', function() {
      cy.get(customerNameItem)
        .contains(this.customers[userAccessCustomer].name)
        .should('exist')
    })

    it('Test 34 - Cannot see a team members appointment', function() {
      cy.get(customerNameItem)
        .contains(this.customers[teamMemberCustomer].name)
        .should('not.exist')
    })

    it('Test 35 - Cannot see a non-team members appointment in their store', function() {
      cy.get(customerNameItem)
        .contains(this.customers[genericCustomer].name)
        .should('not.exist')
    })

    it('Test 36 - Cannot see an appointment outside their store', function() {
      cy.get(customerNameItem)
        .contains(this.customers[store2Customer].name)
        .should('not.exist')
    })
  })

  describe('TeamAccess User', () => {
    beforeEach(function() {
      cy.login(teamAccessUser)
      cy.visit(allAppointmentsTabUrl)
    })

    it('Test 37 - Can see an appointment assigned to them', function() {
      cy.get(customerNameItem)
        .contains(this.customers[teamAccessCustomer].name)
        .should('exist')
    })

    it('Test 38 - Can see a team members appointment', function() {
      cy.get(customerNameItem)
        .contains(this.customers[teamMemberCustomer].name)
        .should('exist')
    })

    it('Test 39 - Cannot see a non-team members appointment in their store', function() {
      cy.get(customerNameItem)
        .contains(this.customers[genericCustomer].name)
        .should('not.exist')
    })

    it('Test 40 - Cannot see an appointment outside their store', function() {
      cy.get(customerNameItem)
        .contains(this.customers[store2Customer].name)
        .should('not.exist')
    })
  })

  describe('StoreAccess User', () => {
    beforeEach(function() {
      cy.login(storeAccessUser)
      cy.visit(allAppointmentsTabUrl)
    })

    it('Test 41 - Can see an appointment assigned to them', function() {
      cy.get(customerNameItem)
        .contains(this.customers[storeAccessCustomer].name)
        .should('exist')
    })

    it('Test 42 - Can see a team members appointment', function() {
      cy.get(customerNameItem)
        .contains(this.customers[teamMemberCustomer].name)
        .should('exist')
    })

    it('Test 43 - Can see a non-team members appointment in their store', function() {
      cy.get(customerNameItem)
        .contains(this.customers[genericCustomer].name)
        .should('exist')
    })

    it('Test 44 - Cannot see an appointment outside their store', function() {
      cy.get(customerNameItem)
        .contains(this.customers[store2Customer].name)
        .should('not.exist')
    })
  })

  describe('Enterprise User', () => {
    beforeEach(function() {
      cy.login(enterpriseUser)
      cy.visit(allAppointmentsTabUrl)
    })

    it('Test 45 - Can see an appointment assigned to them', function() {
      cy.get(customerNameItem)
        .contains(this.customers[enterpriseCustomer].name)
        .should('exist')
    })

    it('Test 46 - Can see a non-team members appointment in their store', function() {
      cy.get(customerNameItem)
        .contains(this.customers[genericCustomer].name)
        .should('exist')
    })

    it('Test 47 - Can see an appointment outside their store within their store group', function() {
      cy.get(customerNameItem)
        .contains(this.customers[store2Customer].name)
        .should('exist')
    })
  })

  after(() => {
    for(let i=0; i<store1AppointmentIds.length; i++) {
      cy.deleteAppointment(store1AppointmentIds[i], testing1Store)
    }
    for(let i=0; i<store2AppointmentIds.length; i++) {
      cy.deleteAppointment(store2AppointmentIds[i], testing2Store)
    }
  })
})
