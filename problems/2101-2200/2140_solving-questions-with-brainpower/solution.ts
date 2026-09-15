function mostPoints(questions: number[][]): number {
    const n = questions.length;
    // dp[i] = best score starting at question i; dp[n] = 0 is the sentinel
    // for "nothing left". Fill right to left so every future value is ready
    // before it is read.
    const dp = new Array<number>(n + 1).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        const points = questions[i][0];
        const brainpower = questions[i][1];
        // nxt is the first question unlocked after the lockout; a jump past
        // the end reads the zero sentinel.
        const nxt = i + brainpower + 1;
        const take = points + (nxt <= n ? dp[nxt] : 0);
        // Skip keeps dp[i+1]; take solves and jumps.
        dp[i] = Math.max(dp[i + 1], take);
    }
    return dp[0];
}
