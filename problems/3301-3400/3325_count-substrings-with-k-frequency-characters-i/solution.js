/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var numberOfSubstrings = function (s, k) {
    // For each right end, grow the window left-to-right and shrink
    // from the left while some character inside has frequency k or
    // more; the last start dropped marks left-1 as the smallest start
    // making s[left-1..right] valid, so exactly `left` substrings
    // ending at right qualify (starts 0..left-1). The first valid end
    // only moves right as the start advances — dropping a character
    // never lowers an inside frequency — so the two pointers sweep
    // once. The answer counts pairs, at most n(n+1)/2 for n = 3000,
    // far inside 32 bits.
    const freq = new Array(26).fill(0);
    let saturated = 0;
    let ans = 0;
    let left = 0;
    for (let right = 0; right < s.length; right += 1) {
        const i = s.charCodeAt(right) - 97;
        freq[i] += 1;
        if (freq[i] === k) {
            saturated += 1;
        }
        while (saturated > 0) {
            const j = s.charCodeAt(left) - 97;
            if (freq[j] === k) {
                saturated -= 1;
            }
            freq[j] -= 1;
            left += 1;
        }
        ans += left;
    }
    return ans;
};
