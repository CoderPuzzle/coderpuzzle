/**
 * @param {string} moves
 * @return {number}
 */
var furthestDistanceFromOrigin = function (moves) {
    // Only the split between the fixed moves matters: each 'L' steps
    // -1 and each 'R' +1, so together they settle at the offset
    // left - right. Every '_' is free to become either character, and
    // spending all of them on one side dominates any mixed assignment
    // — a mixture only lets some of them cancel out against the rest.
    // The furthest point is therefore |left - right| + wilds, reached
    // by rewriting every '_' as whichever fixed character already
    // leads; ties choose either side at no cost.
    let left = 0;
    let right = 0;
    let wilds = 0;
    for (const ch of moves) {
        if (ch === "L") {
            left++;
        } else if (ch === "R") {
            right++;
        } else {
            wilds++;
        }
    }
    return Math.abs(left - right) + wilds;
};
