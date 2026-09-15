// @ts-nocheck
var maximumSaleItems = function (items, B) {
    let n = items.length,
        fc = Array(n + 1).fill(0),
        cheap = Infinity;
    for (const [f, p] of items) {
        fc[f]++;
        cheap = Math.min(cheap, p);
    }
    let d = Array(n + 1).fill(0);
    for (let f = 1; f <= n; f++) for (let x = f; x <= n; x += f) d[f] += fc[x];
    let q = items.map(([f, p]) => [p, d[f] - 1]).sort((a, b) => a[0] - b[0]),
        best = Math.floor(B / cheap),
        spent = 0,
        boost = 0;
    for (const [p, cap] of q) {
        if (p > 2 * cheap || !cap) continue;
        let take = Math.min(cap, Math.floor((B - spent) / p));
        spent += take * p;
        boost += take;
        best = Math.max(best, 2 * boost + Math.floor((B - spent) / cheap));
        if (take < cap) break;
    }
    return best;
};
