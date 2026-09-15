function maxPalindromes(s: string, k: number): number {
    // For each end index r, best[r] is the largest start l of a palindrome
    // s[l..r] with length at least k. Among all palindromes ending at r, the
    // one starting latest leaves the most room on the left and reaches the
    // biggest dp[l], since dp never decreases.
    const n = s.length;
    const best: number[] = new Array(n).fill(-1);
    for (let center = 0; center < n; center++) {
        let l = center;
        let r = center;
        while (l >= 0 && r < n && s[l] === s[r]) {
            if (r - l + 1 >= k && l > best[r]) best[r] = l;
            l--;
            r++;
        }
    }
    for (let center = 0; center + 1 < n; center++) {
        let l = center;
        let r = center + 1;
        while (l >= 0 && r < n && s[l] === s[r]) {
            if (r - l + 1 >= k && l > best[r]) best[r] = l;
            l--;
            r++;
        }
    }
    // dp[i] = answer for the prefix s[0..i-1]; either skip index i-1 or
    // take the latest-starting palindrome that ends there.
    const dp: number[] = new Array(n + 1).fill(0);
    for (let r = 0; r < n; r++) {
        dp[r + 1] = dp[r];
        const l = best[r];
        if (l !== -1 && dp[l] + 1 > dp[r + 1]) dp[r + 1] = dp[l] + 1;
    }
    return dp[n];
}
