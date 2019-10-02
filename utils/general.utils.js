const println = console.log;

const isPR = ({ pull_request }) => pull_request != undefined;
const isNotPR = (issue) => !isPR(issue);

const isOpened = ({ state }) => state == 'open';
const isClosed = ({ state }) => state == 'closed';

const findIssueById = (issues, id) => issues.find(({ number }) => number == id) || null;

const logSingleIssue = ({ title, number }, index) => {
    println(`${String(index + 1).padStart(3)}. ${`[${number}]`.padEnd(6)} ${title}`);
};

module.exports = {
    isPR,
    isNotPR,
    isOpened,
    isClosed,
    findIssueById,
    logSingleIssue,
    println,
};