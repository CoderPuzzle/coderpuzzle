/**
 * @param {number[]} ranks
 * @return {number}
 */
var totalReplacements = function (ranks) {
    // One sweep: best is the smallest rank seen so far. A strictly better
    // (lower) arrival displaces it and counts as a replacement; equal or
    // worse ranks leave the selection untouched.
    let best = ranks[0];
    let replacements = 0;
    for (let i = 1; i < ranks.length; i++) {
        if (ranks[i] < best) {
            best = ranks[i];
            replacements++;
        }
    }
    return replacements;
};
