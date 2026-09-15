/**
 * @param {string} s
 * @param {number[]} distance
 * @return {boolean}
 */
var checkDistances = function (s, distance) {
    // Remember each letter's first index; on the second sighting the
    // letters strictly between number second - first - 1, which must
    // equal that letter's distance entry.
    const first = new Map();
    for (let i = 0; i < s.length; ++i) {
        const k = s.charCodeAt(i) - 97;
        if (!first.has(k)) {
            first.set(k, i);
        } else if (i - first.get(k) - 1 !== distance[k]) {
            return false;
        }
    }
    return true;
};
