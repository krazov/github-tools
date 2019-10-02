const https = require('https');
const URL = require('url');
const { println } = require('./general.utils');
const { accessToken } = require('../config/config');

const extractNextLink = ({ headers: { link } }) => {
    if (!link) {
        return null;
    }

    // else
    const [[nextLink = null] = []] = link
        .split(',')
        .map((link) => link.split(';').map((string) => string.trim()))
        .filter((array) => array.includes('rel="next"'));

    return nextLink && nextLink.replace(/^<|>$/g, '');
};

const performRequest = (host, path) => new Promise((resolve, reject) => {
    const options = {
        host,
        path,
        headers: {
            // NOTE: issues comments endpoint didn't want to work unless access token was passed in URL, not headers
            // 'Authorization': `token ${accessToken}`,
            'User-Agent': 'Seb Browser',
        }
    };

    const responseCallback = (response) => {
        let requestedData = '';

        response
            .on('data', (chunk) => {
                requestedData += chunk;
            })
            .on('end', () => {
                resolve({ requestedData, nextLink: extractNextLink(response) });
            });
    };

    https
        .request(options, responseCallback)
        .on('error', (err) => {
            reject(`[performRequest] Error: ${err.message}`);
        })
        .end();
});

const awaitHandler = (error) => {
    println(`[awaitHandler] Error: ${error}`);

    return { terminate: true };
};

const requestPathname = (pathname, search) =>
    [
        pathname,
        (search || ''),
        (search ? '&' : '?'),
        'access_token=',
        accessToken,
    ].join('');

async function download(endpointUrl) {
    let data = [];
    let url = URL.parse(endpointUrl);

    println('Starting downloading with link:');
    println(endpointUrl);

    while (true) {
        const host = url.hostname;
        const path = requestPathname(url.pathname, url.search);

        const {
            requestedData,
            nextLink = null,
            terminate = false,
        } = await performRequest(host, path).catch(awaitHandler);

        if (terminate) {
            throw Error('Download terminated');
        }

        data = [
            ...data,
            ...JSON.parse(requestedData),
        ];

        if (nextLink == null) {
            println('No more data for this endpoint');
            break;
        }

        println('Proceeding to the next link:');
        println(nextLink.replace(/[?&]{1}access_token=[0-9a-f]*/g, ''));

        url = URL.parse(nextLink);
    }

    return data;
}

module.exports = { download };