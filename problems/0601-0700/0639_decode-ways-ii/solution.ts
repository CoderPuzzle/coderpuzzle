function numDecodings(s: string): number {
    // dp[i] counts the decodings of the suffix s[i:]: its first code is
    // one character (9 openings for '*', 1 for a nonzero digit, 0 for '0')
    // or two (15 for '**', 2 or 1 for '*d' as d <= 6 or not, 9/6/0 for
    // 'd*' as d is 1/2/other, 1 for two digits valued 10..26). Only
    // dp[i+1] and dp[i+2] are ever read, so two rolling variables replace
    // the table; the raw pre-reduction step total stays below
    // 24 * (10^9 + 7), which doubles hold exactly — every integer up to
    // 2^53 does.
    const MOD = 1_000_000_007;
    let next1 = 1,
        next2 = 1; // dp[i+1], dp[i+2]; the empty suffix is one way
    for (let i = s.length - 1; i >= 0; --i) {
        const a = s[i];
        let cur = 0;
        if (a === "*") cur = 9 * next1;
        else if (a !== "0") cur = next1;
        if (i + 1 < s.length) {
            const b = s[i + 1];
            if (a === "*") cur += next2 * (b === "*" ? 15 : b <= "6" ? 2 : 1);
            else if (a === "1") cur += next2 * (b === "*" ? 9 : 1);
            else if (a === "2") cur += next2 * (b === "*" ? 6 : b <= "6" ? 1 : 0);
        }
        next2 = next1;
        next1 = cur % MOD;
    }
    return next1;
}
