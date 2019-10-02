const issues = require('./wad/issues.json');
const { isNotPR, isClosed, logSingleIssue } = require('./utils/general.utils');

issues
    .filter(isClosed)
    .filter(isNotPR)
    .reverse()
    .forEach(logSingleIssue);

process.exit(0);