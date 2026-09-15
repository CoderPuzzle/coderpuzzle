/**
 * @param {number} n
 * @return {number}
 */
var checkRecord = function (n) {
    const MOD = 1000000007;
    // dp[a][l] = number of records so far with `a` absences (<2)
    // and `l` trailing consecutive lates (<3)
    let dp = [
        [0, 0, 0],
        [0, 0, 0],
    ];
    dp[0][0] = 1;
    for (let step = 0; step < n; step++) {
        const ndp = [
            [0, 0, 0],
            [0, 0, 0],
        ];
        for (let a = 0; a < 2; a++) {
            for (let l = 0; l < 3; l++) {
                const v = dp[a][l];
                if (v === 0) continue;
                ndp[a][0] = (ndp[a][0] + v) % MOD; // append 'P'
                if (a + 1 < 2) {
                    ndp[a + 1][0] = (ndp[a + 1][0] + v) % MOD; // append 'A'
                }
                if (l + 1 < 3) {
                    ndp[a][l + 1] = (ndp[a][l + 1] + v) % MOD; // append 'L'
                }
            }
        }
        dp = ndp;
    }
    let total = 0;
    for (let a = 0; a < 2; a++) {
        for (let l = 0; l < 3; l++) {
            total = (total + dp[a][l]) % MOD;
        }
    }
    return total;
};
