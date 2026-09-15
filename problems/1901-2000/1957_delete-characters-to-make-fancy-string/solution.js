/**
 * @param {string} s
 * @return {string}
 */
var makeFancyString = function (s) {
    // Greedy append: keep s[i] unless it would extend a run of three. Runs
    // of a repeated character are independent, so truncating every maximal
    // run to two chars is both minimal (every extra char beyond two in a run
    // must be deleted) and the unique answer.
    const res = [];
    for (const c of s) {
        const n = res.length;
        if (n >= 2 && res[n - 1] === c && res[n - 2] === c) continue;
        res.push(c);
    }
    return res.join("");
};
