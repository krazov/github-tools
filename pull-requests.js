const issues = require('./wad/issues.json');
const { isPR, logSingleIssue } = require('./utils/general.utils');

issues
    .filter(isPR)
    .forEach(logSingleIssue);

process.exit(0);