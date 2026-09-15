/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var takeCharacters = function (s, k) {
    // Equivalently: keep the longest middle stretch whose letter counts
    // stay at or under total - k; the ends taken to delete it are then
    // k of each letter or more. Answer = n - that longest window.
    const n = s.length;
    const total = [0, 0, 0];
    for (const ch of s) total[ch.charCodeAt(0) - 97]++;
    if (total[0] < k || total[1] < k || total[2] < k) return -1;
    const window = [0, 0, 0];
    let left = 0;
    let best = 0;
    for (let right = 0; right < n; ++right) {
        window[s.charCodeAt(right) - 97]++;
        while (window.some((c, i) => c > total[i] - k)) {
            window[s.charCodeAt(left) - 97]--;
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return n - best;
};
