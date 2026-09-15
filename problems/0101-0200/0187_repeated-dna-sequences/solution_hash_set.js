/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {
    const seen = new Set();
    // A second set collects each repeated window exactly once, even when it
    // occurs three or more times.
    const repeated = new Set();
    // Slide a fixed 10-letter window; the loop bound yields no full window
    // (hence an empty result) for strings shorter than 10.
    for (let i = 0; i + 10 <= s.length; i++) {
        const seq = s.slice(i, i + 10);
        if (seen.has(seq)) {
            // Already seen: this window occurs at least twice.
            repeated.add(seq);
        } else {
            seen.add(seq);
        }
    }
    // Sorted output for a deterministic order.
    return Array.from(repeated).sort();
};
