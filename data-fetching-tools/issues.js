const { repoOwner, repoName } = require('../config/config');
const { download } = require('../utils/download.utils');
const { saveFile } = require('../utils/file.utils');
const { println } = require('../utils/general.utils');

const issuesEndpointUrl =
    `https://api.github.com/repos/${repoOwner}/${repoName}/issues?state=all&filter=all&per_page=100&page=1`;

download(issuesEndpointUrl)
    .then((data) => saveFile(JSON.stringify(data), 'issues'))
    .catch((error) => {
        println(`Error: ${error}`);
    })
    .then(() => {
        process.exit(0);
    });