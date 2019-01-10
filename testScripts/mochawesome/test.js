const path = require('path');

const cypress = require('cypress');
const uuidv1 = require('uuid/v1');
const rimraf = require('rimraf');
const shell = require('shelljs');
const fs = require('fs');


const combine = require('./combine.js');


cypress.run()
  .then(() => {
    // generate mochawesome report
    const data = combine.combineMochaAwesomeReports();
    let uuid = uuidv1();
    combine.writeReport(data, uuid);
    rimraf(path.join(__dirname, '..', 'reports'), () => {});
    shell.exec(`./node_modules/.bin/marge ${uuid}.json  --reportDir testReports`, (code, stdout, stderr) => {
      if (stderr) throw stderr;
      fs.rename(path.join(__dirname, '..', '..', 'testReports', `${uuid}.html`), path.join(__dirname, '..', '..', 'testReports', 'index.html'), function(err) {
          if ( err ) console.log('ERROR: ' + err);
      });
      fs.rename(path.join(__dirname, '..', '..', `${uuid}.json`), path.join(__dirname, '..', '..', 'testReports', 'allReports.json'), function(err) {
          if ( err ) console.log('ERROR: ' + err);
      });
      // cleanup
      rimraf(path.join(__dirname, '..', '..', 'reports'), () => {});
    });
  })
  .catch((err) => {
    /* eslint-disable no-console */
    console.error(err);
    /* eslint-enable no-console */
  });