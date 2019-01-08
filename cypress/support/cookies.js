Cypress.Cookies.defaults({
  whitelist: ['UserInfo', '.ASPXAUTH', 'intercom-session-*']
})
Cypress.Cookies.debug(true)
