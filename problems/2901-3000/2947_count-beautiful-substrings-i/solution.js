/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var beautifulSubstrings = function (s, k) {
    // Straight from the definition: for each start, extend the substring
    // while maintaining the vowel-minus-consonant balance. Balance 0 means
    // equal vowel and consonant counts, each equal to half the length, so
    // the divisibility test is ((L / 2) * (L / 2)) % k == 0.
    const n = s.length;
    const vowels = new Set(["a", "e", "i", "o", "u"]);
    let total = 0;
    for (let i = 0; i < n; i++) {
        let balance = 0;
        for (let j = i; j < n; j++) {
            balance += vowels.has(s[j]) ? 1 : -1;
            if (balance === 0) {
                const half = (j - i + 1) >> 1;
                if ((half * half) % k === 0) total++;
            }
        }
    }
    return total;
};
