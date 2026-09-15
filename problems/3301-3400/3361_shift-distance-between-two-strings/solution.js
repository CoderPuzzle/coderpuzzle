/**
 * @param {string} s
 * @param {string} t
 * @param {number[]} nextCost
 * @param {number[]} previousCost
 * @return {number}
 */
var shiftDistance = function (s, t, nextCost, previousCost) {
    // Prefix sums over the two cyclic cost rings give every letter
    // pair's cheaper direction; the answer sums the per-index pair
    // costs. One pair costs at most 25 * 10^9 = 2.5*10^10, but the
    // total over s.length <= 10^5 stays at most 2.5*10^15 < 2^53 ~=
    // 9.0*10^15, so JS Numbers remain exact.
    const pn = new Array(27).fill(0);
    const pp = new Array(27).fill(0);
    for (let k = 0; k < 26; k++) {
        pn[k + 1] = pn[k] + nextCost[k];
        pp[k + 1] = pp[k] + previousCost[k];
    }
    const cost = Array.from({ length: 26 }, () => new Array(26).fill(0));
    for (let a = 0; a < 26; a++) {
        for (let b = 0; b < 26; b++) {
            let nxt;
            if (a < b) {
                nxt = pn[b] - pn[a];
            } else if (a > b) {
                nxt = pn[26] - pn[a] + pn[b];
            } else {
                nxt = 0;
            }
            let prv;
            if (b < a) {
                prv = pp[a + 1] - pp[b + 1];
            } else if (b > a) {
                prv = pp[26] - pp[b + 1] + pp[a + 1];
            } else {
                prv = 0;
            }
            cost[a][b] = Math.min(nxt, prv);
        }
    }
    let total = 0;
    for (let i = 0; i < s.length; i++) {
        total += cost[s.charCodeAt(i) - 97][t.charCodeAt(i) - 97];
    }
    return total;
};
