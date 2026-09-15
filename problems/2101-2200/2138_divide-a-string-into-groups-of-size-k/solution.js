/**
 * @param {string} s
 * @param {number} k
 * @param {string} fill
 * @return {string[]}
 */
var divideString = function (s, k, fill) {
    const padding = (k - (s.length % k)) % k;
    const padded = s + fill.repeat(padding);
    const groups = [];
    for (let start = 0; start < padded.length; start += k) {
        groups.push(padded.slice(start, start + k));
    }
    return groups;
};
