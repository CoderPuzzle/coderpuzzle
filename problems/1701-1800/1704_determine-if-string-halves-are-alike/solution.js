/**
 * @param {string} s
 * @return {boolean}
 */
var halvesAreAlike = function (s) {
    // Only the vowel totals of the two halves matter — which vowel it is,
    // where it sits, and whether it is upper- or lowercase are all
    // irrelevant. One pass with a single counter: +1 for every vowel in the
    // first half, -1 for every vowel in the second; equal totals land the
    // counter back at exactly zero.
    const vowels = new Set("aeiouAEIOU");
    const half = s.length / 2;
    let balance = 0;
    for (let i = 0; i < s.length; i++) {
        if (vowels.has(s[i])) {
            balance += i < half ? 1 : -1;
        }
    }
    return balance === 0;
};
