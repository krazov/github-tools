const issues = require('../wad/issues.json');
const { download } = require('../utils/download.utils');
const { saveFile } = require('../utils/file.utils');
const { println } = require('../utils/general.utils');

async function main() {
    const commentsData = {};

    for (const issue of issues) {
        const { number, comments, comments_url } = issue;
        const data = comments ? await download(comments_url) : [];
        Object.assign(commentsData, { [number]: data });
    }

    saveFile(JSON.stringify(commentsData), 'comments')
        .catch((error) => {
            println(`Error: ${error}`);
        })
        .then(() => {
            process.exit(0);
        });
}

main();