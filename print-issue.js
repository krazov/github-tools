const issues = require('./wad/issues.json');
const allComments = require('./wad/comments.json');
const { findIssueById, println } = require('./utils/general.utils');

const cleanUp = (string) =>
    string
        .replace(/<!--(.|\r\n)*-->\n*/gi, '')
        .replace(/^(- \[.\].*\r\n).*\r\n(- \[.\])/gmi, '$1$2')
        .replace(/^(- \[.\].*\r\n).*\r\n(- \[.\])/gmi, '$1$2')
        .replace(/(\r\n){3,}/g, '\n\n');

const logIssueDetails = ({
    number: id,
    title,
    user: { login: openedBy },
    created_at: openedOn,
    body,
}) => {
    println(`Id:         ${id}`);
    println(`Title:      ${title}`);
    println(`Opened on:  ${openedOn}`);
    println(`Opened by:  ${openedBy}`);
    println('');
    println(cleanUp(body));
};

const id = process.argv[2];
const issue = findIssueById(issues, id);

if (issue) {
    logIssueDetails(issue);

    println('');
    println(':: COMMENTS');

    try {
        const comments = allComments[id];

        if (comments.length) {
            comments.forEach(({ user: { login: author }, body }, index) => {
                println('');
                println('_'.repeat(`#${index + 1} ${author}:`.length));
                println(`#${index + 1} ${author}:`);
                println(body);
            });
        } else {
            println('No comments.');
        }
    } catch (error) {
        println('No comments.');
    }
} else {
    println('No issue with given id has been found');
}

process.exit(0);