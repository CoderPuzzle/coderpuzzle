/**
 * @param {string} s
 * @return {string}
 */
var reverseOnlyLetters = function (s) {
    // JS strings are immutable, so the scan runs on a char array — the
    // honest equivalent of the in-place algorithm.
    const isLetter = (c) => (c >= "a" && c <= "z") || (c >= "A" && c <= "Z");
    const chars = s.split("");
    let lo = 0;
    let hi = chars.length - 1;
    while (lo < hi) {
        // Advance whichever side does not sit on a letter.
        if (!isLetter(chars[lo])) {
            lo++;
        } else if (!isLetter(chars[hi])) {
            hi--;
        } else {
            // Both ends hold a letter: swap them and step both inward.
            [chars[lo], chars[hi]] = [chars[hi], chars[lo]];
            lo++;
            hi--;
        }
    }
    return chars.join("");
};
