function goodBinaryStrings(minLength: number, maxLength: number, oneGroup: number, zeroGroup: number): number {
    // dp[i] counts good strings of length i: peel off the final run of
    // equal characters — its size is a positive multiple of oneGroup or
    // zeroGroup, and what remains is any shorter good string (or nothing).
    // Every stored value stays below 1e9+7 and each sum below 2^31,
    // far inside Number's exact range.
    const MOD = 1e9 + 7;
    const dp: number[] = new Array(maxLength + 1).fill(0);
    dp[0] = 1;
    for (let i = 1; i <= maxLength; i++) {
        let v = 0;
        if (i >= oneGroup) v += dp[i - oneGroup];
        if (i >= zeroGroup) v += dp[i - zeroGroup];
        dp[i] = v % MOD;
    }
    let total = 0;
    for (let i = minLength; i <= maxLength; i++) {
        total += dp[i];
    }
    return total % MOD;
}
