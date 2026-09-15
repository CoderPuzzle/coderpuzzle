/**
 * @param {string[]} queries
 * @param {string} pattern
 * @return {boolean[]}
 */
var camelMatch = function (queries, pattern) {
    // Two-pointer scan: advance the pattern pointer on a match, skip a
    // lowercase letter as an implicit insertion, and reject outright on an
    // uppercase letter that doesn't match. The query matches only if every
    // pattern character was consumed by the end of the scan.
    const matches = (query) => {
        let j = 0;
        for (const c of query) {
            if (j < pattern.length && c === pattern[j]) {
                j++;
            } else if (c >= "A" && c <= "Z") {
                return false;
            }
        }
        return j === pattern.length;
    };

    return queries.map(matches);
};
