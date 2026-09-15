/**
 * @param {number[]} balance
 * @return {number}
 */
var minMoves = function (balance) {
    // At most one person is negative. With none, nobody moves; with a
    // negative total, no arrangement can work. Otherwise every unit a
    // giver releases costs one move per hop of its circular distance to
    // the negative index, so draining the deficit from the nearest
    // givers first — cheapest distance, then the next, and so on —
    // totals the minimum. The total stays <= 1e9 units x 5e4 hops =
    // 5e13, far below 2^53, so plain numbers stay exact.
    const n = balance.length;
    let neg = -1;
    for (let i = 0; i < n; i++) {
        if (balance[i] < 0) {
            neg = i;
            break;
        }
    }
    if (neg === -1) {
        return 0;
    }
    let total = 0;
    for (const v of balance) {
        total += v;
    }
    if (total < 0) {
        return -1;
    }
    const supplies = [];
    for (let i = 0; i < n; i++) {
        if (i !== neg && balance[i] > 0) {
            const cw = (i - neg + n) % n;
            const ccw = (neg - i + n) % n;
            supplies.push([Math.min(cw, ccw), balance[i]]);
        }
    }
    supplies.sort((a, b) => a[0] - b[0]);
    let need = -balance[neg];
    let moves = 0;
    for (const [dist, amount] of supplies) {
        if (need === 0) {
            break;
        }
        const take = Math.min(amount, need);
        moves += take * dist;
        need -= take;
    }
    return moves;
};
