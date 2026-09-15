function getWordsInLongestSubsequence(words: string[], groups: number[]): string[] {
    // dp[i] is the length of the longest valid subsequence ending at index
    // i; prev[i] remembers the predecessor that achieved it. Scanning
    // predecessors from i - 1 downward and updating only on a strict
    // improvement keeps the latest compatible index attaining the maximum,
    // which pins one deterministic answer out of the many the statement
    // permits.
    const n = words.length;
    const dp: number[] = new Array(n).fill(1);
    const prev: number[] = new Array(n).fill(-1);
    for (let i = 0; i < n; ++i) {
        for (let j = i - 1; j >= 0; --j) {
            if (groups[j] === groups[i] || words[j].length !== words[i].length) {
                continue;
            }
            if (dp[j] + 1 <= dp[i]) {
                continue;
            }
            // Hamming distance exactly 1: walk the equal-length strings and
            // stop at a second mismatch.
            let diffs = 0;
            for (let p = 0; p < words[j].length && diffs < 2; ++p) {
                if (words[j][p] !== words[i][p]) ++diffs;
            }
            if (diffs === 1) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
    }
    let best = n - 1;
    for (let i = n - 2; i >= 0; --i) {
        if (dp[i] > dp[best]) best = i;
    }
    const answer: string[] = [];
    for (let i = best; i !== -1; i = prev[i]) answer.push(words[i]);
    return answer.reverse();
}
