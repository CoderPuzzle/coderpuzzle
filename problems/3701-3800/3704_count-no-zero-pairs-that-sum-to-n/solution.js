/**
 * @param {number} n
 * @return {number}
 */
var countNoZeroPairs = function (n) {
    const MOD = 1000000007;
    const ds = [];
    let x = n;
    if (x === 0) ds.push(0);
    while (x > 0) {
        ds.push(x % 10);
        x = Math.floor(x / 10);
    }
    ds.push(0);
    const length = ds.length;

    // g[carry][a_active][b_active]
    let g = [
        [
            [0, 0],
            [0, 0],
        ],
        [
            [0, 0],
            [0, 0],
        ],
    ];
    g[0][0][0] = 1;
    for (let pos = length - 1; pos >= 0; pos--) {
        const ng = [
            [
                [0, 0],
                [0, 0],
            ],
            [
                [0, 0],
                [0, 0],
            ],
        ];
        for (let carry = 0; carry < 2; carry++) {
            for (let aa = 0; aa < 2; aa++) {
                for (let ba = 0; ba < 2; ba++) {
                    let res = 0;
                    for (let da = 0; da < 10; da++) {
                        if (aa === 0 && da !== 0) break;
                        for (let db = 0; db < 10; db++) {
                            if (ba === 0 && db !== 0) break;
                            if (pos === 0 && (da === 0 || db === 0)) continue;
                            const s = da + db + carry;
                            if (s % 10 !== ds[pos]) continue;
                            const nc = Math.floor(s / 10);
                            res += g[nc][aa && da !== 0 ? 1 : 0][ba && db !== 0 ? 1 : 0];
                        }
                    }
                    ng[carry][aa][ba] = res % MOD;
                }
            }
        }
        g = ng;
    }
    return g[0][1][1];
};
