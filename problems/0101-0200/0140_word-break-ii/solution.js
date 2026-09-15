/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
    const words = new Set(wordDict);
    const n = s.length;
    // dp[i] holds every sentence for the prefix s.slice(0, i). Each entry is
    // built by appending one last word to a sentence of a shorter prefix, so a
    // prefix that cannot be segmented stays empty and every split hanging off
    // it is pruned before any substring is cut.
    const dp = Array.from({ length: n + 1 }, () => []);
    // The empty prefix segments into exactly one sentence: the empty one.
    dp[0] = [""];
    for (let i = 1; i <= n; ++i) {
        // The split j runs downward, so the candidate last word s.slice(j, i)
        // is one character long first and grows: sentences whose last word is
        // shorter come first, and among equal last words the sentences of
        // dp[j] keep their own order. That is exactly the order the statement
        // pins, emitted for free — no sorting pass at the end.
        for (let j = i - 1; j >= 0; --j) {
            if (dp[j].length === 0) {
                continue;
            }
            const last = s.slice(j, i);
            if (!words.has(last)) {
                continue;
            }
            if (j === 0) {
                dp[i].push(last);
            } else {
                for (const head of dp[j]) {
                    dp[i].push(head + " " + last);
                }
            }
        }
    }
    return dp[n];
};
