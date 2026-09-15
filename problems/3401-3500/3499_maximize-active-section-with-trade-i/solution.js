/**
 * @param {string} s
 * @return {number}
 */
var maxActiveSectionsAfterTrade = function (s) {
    // Augment with '1' at both ends, then run-length encode the result. A
    // trade turns an internal '1'-run (one '0'-run on each side) plus both
    // flanking '0'-runs into '1's, gaining their combined length.
    const t = "1" + s + "1";
    let total = 0;
    for (let i = 0; i < s.length; i++) {
        total += s.charCodeAt(i) - 48;
    }
    const runs = [];
    let i = 0;
    while (i < t.length) {
        let j = i;
        while (j < t.length && t[j] === t[i]) {
            j++;
        }
        runs.push(j - i);
        i = j;
    }
    // Runs alternate starting with '1', so the internal '1'-runs sit at even
    // indices 2, 4, ..., runs.length - 3 with a '0'-run on each side.
    let best = 0;
    for (let k = 2; k < runs.length - 2; k += 2) {
        best = Math.max(best, runs[k - 1] + runs[k + 1]);
    }
    return total + best;
};
