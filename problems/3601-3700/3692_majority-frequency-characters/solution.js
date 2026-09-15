/**
 * @param {string} s
 * @return {string}
 */
var majorityFrequencyGroup = function (s) {
    // Tally every occurrence into a fixed 26-slot table; the lowercase-only
    // input makes each index a plain char-code offset from 'a'.
    const counts = new Array(26).fill(0);
    for (const ch of s) {
        counts[ch.charCodeAt(0) - 97]++;
    }
    // Evaluate each candidate frequency's bucket and keep the largest
    // gathering of distinct characters; sweeping frequencies upward lets
    // ">=" hand size ties to the larger frequency, and the ascending slot
    // scan collects the winners already in lexicographic order.
    let best = [];
    for (let k = 1; k <= s.length; k++) {
        const chars = [];
        for (let i = 0; i < 26; i++) {
            if (counts[i] === k) {
                chars.push(String.fromCharCode(97 + i));
            }
        }
        if (chars.length >= best.length) {
            best = chars;
        }
    }
    return best.join("");
};
