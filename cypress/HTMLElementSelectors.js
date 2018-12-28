export default {
	'urlPaths': {
		'login':'Login.aspx',
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
			'email': '[placeholder=Email]'
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
			'phone' :'.cell input'
		}
	}
}