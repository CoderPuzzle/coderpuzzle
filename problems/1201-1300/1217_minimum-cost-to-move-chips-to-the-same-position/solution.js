/**
 * @param {number[]} position
 * @return {number}
 */
var minCostToMoveChips = function (position) {
    // A +-2 move is free, so only parity matters; a +-1 move flips it
    // at cost 1. Pay for whichever side has fewer chips.
    let odd = 0;
    for (const p of position) odd += p % 2;
    return Math.min(odd, position.length - odd);
};
