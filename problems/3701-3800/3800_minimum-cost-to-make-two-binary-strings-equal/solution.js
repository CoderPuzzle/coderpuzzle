/**
 * @param {string} s
 * @param {string} t
 * @param {number} flipCost
 * @param {number} swapCost
 * @param {number} crossCost
 * @return {number}
 */
var minimumCost = function (s, t, flipCost, swapCost, crossCost) {
    // Mismatch classes decide everything: a01 counts columns needing 0->1,
    // a10 the mirror image. Opposite kinds cancel pairwise with one swap
    // (or two flips); leftovers of a single kind pair up via cross-swap +
    // swap (or two flips); a lone leftover takes one flip.
    let a01 = 0;
    let a10 = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "0" && t[i] === "1") {
            a01++;
        } else if (s[i] === "1" && t[i] === "0") {
            a10++;
        }
    }
    // Opposite-kind mismatches fix each other: reorder one string so they
    // meet, paying one swap; two flips is the alternative. Totals stay below
    // 1e14, inside Number's exact integer range.
    const pairs = Math.min(a01, a10);
    let cost = pairs * Math.min(swapCost, 2 * flipCost);
    const same = Math.abs(a01 - a10);
    // Same-kind mismatches: a cross-swap turns one into the other kind,
    // then a swap pairs it — or just flip both.
    cost += Math.floor(same / 2) * Math.min(crossCost + swapCost, 2 * flipCost);
    if (same % 2 === 1) {
        cost += flipCost;
    }
    return cost;
};
