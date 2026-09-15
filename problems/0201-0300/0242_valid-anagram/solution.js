/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
    // An anagram is a rearrangement: both strings must hold exactly the
    // same letters with the same counts. The constraints promise lowercase
    // English letters, so 26 counters, one per letter, capture the multiset.
    if (s.length !== t.length) {
        // Different lengths can never share the same multiset of letters.
        return false;
    }
    const counts = new Array(26).fill(0);
    for (let index = 0; index < s.length; ++index) {
        counts[s.charCodeAt(index) - 97]++;
        counts[t.charCodeAt(index) - 97]--;
    }
    // A nonzero slot is a letter the two strings disagreed on.
    return counts.every((count) => count === 0);
};
