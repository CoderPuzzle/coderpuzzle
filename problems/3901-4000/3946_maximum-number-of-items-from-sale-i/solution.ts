// @ts-nocheck
var maximumSaleItems = function (items, B) {
    let M = Math.max(...items.map((x) => x[0])),
        fc = Array(M + 1).fill(0);
    for (const [f] of items) fc[f]++;
    let dv = Array(M + 1).fill(0);
    for (let f = 1; f <= M; f++) for (let x = f; x <= M; x += f) dv[f] += fc[x];
    let dp = Array(B + 1).fill(-1e9);
    dp[0] = 0;
    for (const [f, p] of items) {
        let old = dp,
            nw = [...old],
            g = dv[f];
        for (let r = 0; r < Math.min(p, B + 1); r++) {
            let best = -1e9,
                q = 0;
            for (let cost = r; cost <= B; cost += p, q++) {
                if (q > 0 && old[cost - p] > -1e9) best = Math.max(best, old[cost - p] - (q - 1));
                if (best > -1e9) nw[cost] = Math.max(nw[cost], q + g - 1 + best);
            }
        }
        dp = nw;
    }
    return Math.max(...dp);
};
