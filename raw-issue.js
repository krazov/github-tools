const issues = require('./wad/issues.json');
const { findIssueById, println } = require('./utils/general.utils');

if (process.argv.length == 2) {
    println(issues.slice(0, 1)[0]);
} else {
    const id = process.argv[2];
    const issue = findIssueById(issues, id);

    println(issue || 'No issue with given id has been found');
}

process.exit(0);