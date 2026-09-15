/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    // JS strings are immutable, so the flips run on a char array — the honest
    // equivalent of the in-place algorithm.
    const chars = s.split("");
    // Flip the whole text once: the words land in reverse order, each with its
    // letters backwards. Re-flipping every word restores the letters.
    reverseRange(chars, 0, chars.length - 1);
    const n = chars.length;
    let start = 0;
    for (let stop = 0; stop <= n; ++stop) {
        // A word ends at each separating space (and at the end of the line).
        if (stop === n || chars[stop] === " ") {
            reverseRange(chars, start, stop - 1);
            start = stop + 1;
        }
    }
    return chars.join("");
};

// Flip a range of the array in place, endpoints included.
function reverseRange(chars, lo, hi) {
    while (lo < hi) {
        [chars[lo], chars[hi]] = [chars[hi], chars[lo]];
        lo++;
        hi--;
    }
}
