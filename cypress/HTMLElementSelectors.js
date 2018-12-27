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
	}
}