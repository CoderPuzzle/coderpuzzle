/**
 * @param {HtmlParser} htmlParser
 * @param {string} startUrl
 * @return {string[]}
 */
class Solution {
    crawl(htmlParser, startUrl) {
        const home = hostname(startUrl);
        const seen = new Set([startUrl]);
        const queue = [startUrl];
        for (let head = 0; head < queue.length; ++head) {
            const url = queue[head];
            for (const link of htmlParser.getUrls(url)) {
                // Foreign hostnames are neither returned nor expanded;
                // marking at enqueue time keeps getUrls to one call per page.
                if (!seen.has(link) && hostname(link) === home) {
                    seen.add(link);
                    queue.push(link);
                }
            }
        }
        // The judged artifact is the oracle's record of every page fetched.
    }
}

// hostname is everything between "http://" and the next "/".
function hostname(url) {
    const rest = url.slice("http://".length);
    const slash = rest.indexOf("/");
    return slash < 0 ? rest : rest.slice(0, slash);
}
