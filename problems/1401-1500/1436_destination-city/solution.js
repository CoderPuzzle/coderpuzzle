/**
 * @param {string[][]} paths
 * @return {string}
 */
var destCity = function (paths) {
    const sources = new Set(paths.map((path) => path[0]));
    for (const [, destination] of paths) {
        if (!sources.has(destination)) {
            return destination;
        }
    }
    return "";
};
