/**
 * @param {number} total
 * @param {number} cost1
 * @param {number} cost2
 * @return {number}
 */
var waysToBuyPensPencils = function (total, cost1, cost2) {
    let ways = 0;
    for (let pens = 0; pens <= Math.floor(total / cost1); pens++) {
        const remaining = total - pens * cost1;
        ways += Math.floor(remaining / cost2) + 1;
    }
    return ways;
};
