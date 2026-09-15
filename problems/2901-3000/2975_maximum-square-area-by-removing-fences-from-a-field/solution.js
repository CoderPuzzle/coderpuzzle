/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} hFences
 * @param {number[]} vFences
 * @return {number}
 */
var maximizeSquareArea = function (m, n, hFences, vFences) {
    // Adding the immovable border fences at 1 and outer makes every
    // surviving region width a pairwise difference of the positions. The
    // square side is the largest gap present in both directions.
    const allGaps = (outer, fences) => {
        const xs = [...fences, 1, outer].sort((a, b) => a - b);
        const out = new Set();
        for (let i = 0; i < xs.length; i++) {
            for (let j = i + 1; j < xs.length; j++) {
                out.add(xs[j] - xs[i]);
            }
        }
        return out;
    };
    const hGaps = allGaps(m, hFences);
    let best = -1;
    for (const d of allGaps(n, vFences)) {
        if (d > best && hGaps.has(d)) {
            best = d;
        }
    }
    // best <= 10^9 - 1, so the square is up to ~10^18 — past 2^53, so the
    // product goes through BigInt before the modulo.
    return best < 0 ? -1 : Number((BigInt(best) * BigInt(best)) % 1000000007n);
};
