/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
    // JS strings are immutable, so the scan runs on a char array — the
    // honest equivalent of the in-place algorithm.
    const chars = s.split("");
    const n = chars.length;
    let start = 0;
    while (start < n) {
        let end = start;
        while (end < n && chars[end] !== " ") {
            end++;
        }
        // chars[start:end] is one word: reverse it with two pointers.
        let lo = start;
        let hi = end - 1;
        while (lo < hi) {
            [chars[lo], chars[hi]] = [chars[hi], chars[lo]];
            lo++;
            hi--;
        }
        start = end + 1;
    }
    return chars.join("");
};
