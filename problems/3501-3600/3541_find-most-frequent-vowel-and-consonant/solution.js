/**
 * @param {string} s
 * @return {number}
 */
var maxFreqSum = function (s) {
    // One pass into 26 buckets, then the max over the vowel buckets and the
    // max over the consonant buckets. Missing letters (no vowels or no
    // consonants at all) stay at 0, matching the statement's rule.
    const counts = new Array(26).fill(0);
    for (const ch of s) counts[ch.charCodeAt(0) - 97]++;
    const vowels = new Set(["a", "e", "i", "o", "u"]);
    let bestVowel = 0;
    let bestConsonant = 0;
    for (let i = 0; i < 26; i++) {
        if (vowels.has(String.fromCharCode(97 + i))) {
            bestVowel = Math.max(bestVowel, counts[i]);
        } else {
            bestConsonant = Math.max(bestConsonant, counts[i]);
        }
    }
    return bestVowel + bestConsonant;
};
