export default {
	'urlPaths': {
		'login':'login.aspx',
		'salesHome':'#/salesHome'
	},
	'login': {
		'inputs': {
			'username':'[data-test=login-textinput-username]',
			'password':'[data-test=login-textinput-password]'
		},
		'buttons': {
			'login':'[data-test=login-button-login]',
			'learnMore':'[data-test=login-link-learn-more]'
		},
		'texts': {
			'errorMessage':'[data-test=login-text-error-message]'
		},
		'links': {
			'privacyPolicy':'[data-test=login-link-privacy-policy]'
		}
	},
	'salesHome': {
		'buttons':{
			'addNewCustomer': '[data-test=header-li-newcustomer]'
		},
		'divs': {
			'customerSearchDialog': '[data-test=dialog-newCustomer-div-container]',
			'addNewCustomerDialog': '.driveNewCustomerDialog'
		}
	},
	'customerSearchDialog': {
		'inputs': {
			'firstName': '#newFirstName',
			'lastName': '#newLastName',
			'company': '[placeholder=Company]',
			'phone': '#newPhone',
			'email': '[placeholder=Email]',
			'store': '.driveNewCustomerSearch select'
		},
		'buttons': {
			'addCustomerButton': 'Add Customer',
			'closeDialog': '.driveDialogClose'
		}
	},
	'addNewCustomerDialog': {
		'inputs': {
			'customerType': '.apptype select',
			'firstName' :'.firstname input',
			'lastName' :'.lastname input',
			'companyName' :'.companyname input',
			'email' :'.email input',
			'phone' :'.cell input',
			'homePhone' :'.cell input',
			'homePhone' :'.home input',
			'address' :'.address input',
			'city' :'.city input',
			'state' :'.state input',
			'zip' :'.zip input',
			'store' :'.sourceDescription input',
			'sourceType' :'.sourceType select',
			'sourceDescription' :'.sourceDescription select',
			'addSalesPersonInput': '.srNewContentAdd input',
			'addBDCInput': '.srNewContentAdd input'
		},
		'divs':{
			'salesPeople': '[new-customer-salespeople]',
			'bdc': '[new-customer-bdc]',
			'interestedVehicles': '.driveNewCustomerVehicleInterested',
			'tradeIn': '.driveNewCustomerVehicleTrade',
			'alertDialog': '[data-test=dialog-alert-div]',
			'salesPeopleList': 'ul li',
			'salesPeopleAddNewList': 'ul li.addNew',
			'salesPeopleProfile': '.miniSquareProfile',
			'addSalesPersonsListLi': '.srNewContentAddList ul li',
			'bdcList': 'ul li',
			'bdcAddNewList': 'ul li.addNew',
			'addBDCListLi': '.srNewContentAddList ul li'
		},
		'buttons': {
			'cancel': 'Cancel',
			'addNewCustomer': 'ADD CUSTOMER',
			'salesPersonRemoveButton': '.srContentCustomerRemove',
			'bdcRemoveButton': '.srContentCustomerRemove',
			'bdcCloseButton': '.srContentCustomerClose'
		}
	},
	'addNewCustomerAlertDialog': {
		'buttons': {
			'done': '[data-test=dialog-alert-button-done]'
		}
	}
}