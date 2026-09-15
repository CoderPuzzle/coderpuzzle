function longestPalindromeSubseq(s: string): number {
    const n = s.length;
    if (n === 0) return 0;
    // A mirror reads the same both ways, so it survives reversing the
    // string: the answer is the longest common subsequence of s and its
    // reversal. Each row of that table reads only the row above, so two
    // rows carry the whole computation.
    const t = s.split("").reverse().join("");
    let prev: number[] = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        const curr: number[] = new Array(n + 1).fill(0);
        for (let j = 1; j <= n; j++) {
            if (s[i - 1] === t[j - 1]) {
                // Agreeing first letters open a common subsequence built
                // from the two remainders.
                curr[j] = prev[j - 1] + 1;
            } else {
                // At least one of the two first letters is absent from
                // an optimal common subsequence.
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        prev = curr;
    }
    return prev[n];
}
