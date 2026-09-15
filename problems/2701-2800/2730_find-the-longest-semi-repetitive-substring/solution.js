/**
 * @param {string} s
 * @return {number}
 */
var longestSemiRepetitiveSubstring = function (s) {
    let best = 0;
    let left = 0;
    let pairs = 0;
    for (let right = 0; right < s.length; right++) {
        if (right > 0 && s[right] === s[right - 1]) {
            pairs++;
        }
        while (pairs > 1) {
            if (s[left] === s[left + 1]) {
                pairs--;
            }
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
};
