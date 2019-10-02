const issues = require('./wad/issues.json');
const { isNotPR, isOpened, logSingleIssue } = require('./utils/general.utils');

issues
    .filter(isOpened)
    .filter(isNotPR)
    .reverse()
    .forEach(logSingleIssue);

process.exit(0);