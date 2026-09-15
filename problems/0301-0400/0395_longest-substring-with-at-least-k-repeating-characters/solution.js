/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function (s, k) {
    const longest = (lo, hi) => {
        if (lo >= hi) return 0;
        const counts = new Map();
        for (let i = lo; i < hi; i++) {
            counts.set(s[i], (counts.get(s[i]) || 0) + 1);
        }
        // A character rarer than k inside this piece can never reach k by
        // shortening the substring, so it is a hard splitter.
        const isRare = (ch) => counts.get(ch) < k;
        let best = 0;
        let start = lo;
        let allFrequent = true;
        // Recurse on the pieces between consecutive rare characters; each
        // level eliminates at least one letter, so depth is bounded by 26.
        for (let i = lo; i < hi; i++) {
            if (isRare(s[i])) {
                allFrequent = false;
                best = Math.max(best, longest(start, i));
                start = i + 1;
            }
        }
        if (allFrequent) return hi - lo; // no splitter: whole piece valid
        best = Math.max(best, longest(start, hi));
        return best;
    };
    return longest(0, s.length);
};
