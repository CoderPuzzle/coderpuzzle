/**
 * @param {number[]} queries
 * @param {number} m
 * @return {number[]}
 */
var processQueries = function (queries, m) {
    const p = [];
    for (let value = 1; value <= m; value++) {
        p.push(value);
    }
    const result = [];
    for (const q of queries) {
        const pos = p.indexOf(q);
        result.push(pos);
        p.splice(pos, 1);
        p.unshift(q);
    }
    return result;
};
