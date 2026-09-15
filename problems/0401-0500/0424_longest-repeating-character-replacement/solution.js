/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
    // A window is fixable with k changes iff length - (count of its most
    // frequent char) <= k: the non-majority chars are what get replaced.
    const count = new Array(128).fill(0);
    let best = 0,
        left = 0,
        maxFreq = 0;
    for (let right = 0; right < s.length; right++) {
        const c = s.charCodeAt(right);
        count[c]++;
        // maxFreq is only raised, never lowered: a stale high value can
        // merely under-shrink, and each new longest window really contains
        // the char that set it, so validity is preserved.
        if (count[c] > maxFreq) maxFreq = count[c];
        // Shrink from the left until the window fits the budget again.
        while (right - left + 1 - maxFreq > k) {
            count[s.charCodeAt(left)]--;
            left++;
        }
        if (right - left + 1 > best) best = right - left + 1;
    }
    return best;
};
