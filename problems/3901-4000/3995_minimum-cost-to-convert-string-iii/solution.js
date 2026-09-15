var minCost = function (s, t, rules, costs) {
    const n = s.length,
        dp = Array(n + 1).fill(1e9);
    dp[0] = 0;
    for (let i = 0; i < n; i++) {
        if (dp[i] === 1e9) continue;
        if (s[i] === t[i]) dp[i + 1] = Math.min(dp[i + 1], dp[i]);
        for (let q = 0; q < rules.length; q++) {
            const [p, r] = rules[q],
                z = p.length;
            if (i + z > n || t.slice(i, i + z) !== r) continue;
            let ok = true,
                stars = 0;
            for (let j = 0; j < z; j++) {
                if (p[j] === "*") stars++;
                else if (p[j] !== s[i + j]) ok = false;
            }
            if (ok) dp[i + z] = Math.min(dp[i + z], dp[i] + costs[q] + stars);
        }
    }
    return dp[n] === 1e9 ? -1 : dp[n];
};
