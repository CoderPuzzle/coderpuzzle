/**
 * @param {string[]} words
 * @return {number[]}
 */
var longestCommonPrefix = function (words) {
    // Removing words[i] keeps every adjacent pair except (i-1, i) and
    // (i, i+1), and adds the single new pair (i-1, i+1). With
    // adj[j] = lcp(words[j], words[j+1]), the best surviving old pair is
    // the max of adj[0..i-2] and adj[i+1..n-2] — pre/suffix maxima answer
    // that in O(1) — so each answer is the max of the left max, the right
    // max, and that one new LCP.
    const n = words.length;
    const lcp = (a, b) => {
        const limit = Math.min(a.length, b.length);
        let j = 0;
        while (j < limit && a[j] === b[j]) ++j;
        return j;
    };
    const adj = new Array(Math.max(n - 1, 0));
    for (let i = 0; i + 1 < n; ++i) adj[i] = lcp(words[i], words[i + 1]);

    const pre = new Array(n).fill(0); // max(adj[0..i-2]) — best pair fully left of i
    for (let i = 2; i < n; ++i) pre[i] = Math.max(pre[i - 1], adj[i - 2]);
    const suf = new Array(n).fill(0); // max(adj[i+1..n-2]) — best pair fully right of i
    for (let i = n - 3; i >= 0; --i) suf[i] = Math.max(suf[i + 1], adj[i + 1]);

    const answer = new Array(n).fill(0);
    for (let i = 0; i < n; ++i) {
        let best = Math.max(pre[i], suf[i]);
        if (i > 0 && i < n - 1) best = Math.max(best, lcp(words[i - 1], words[i + 1]));
        answer[i] = best;
    }
    return answer;
};
