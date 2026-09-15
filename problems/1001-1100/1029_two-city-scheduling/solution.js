/**
 * @param {number[][]} costs
 * @return {number}
 */
var twoCitySchedCost = function (costs) {
    // Switching person i from B to A changes the total by a_i - b_i alone,
    // so the cheapest plan applies the n smallest differences.
    const ordered = [...costs].sort((a, b) => a[0] - a[1] - (b[0] - b[1]));
    // First half (most negative differences) flies A, rest fly B — the
    // split satisfies the half/half count structurally.
    const n = Math.floor(ordered.length / 2);
    let total = 0;
    for (let i = 0; i < ordered.length; i++) {
        total += i < n ? ordered[i][0] : ordered[i][1];
    }
    return total;
};
