/**
 * @param {number} n
 * @param {number} time
 * @return {number}
 */
var passThePillow = function (n, time) {
    // One forward traversal of the line spans n - 1 seconds, so the
    // walk decomposes into full traversals plus a remainder leg.
    const legs = Math.floor(time / (n - 1));
    const rem = time % (n - 1);
    // An even count of traversals ends moving forward from person 1;
    // an odd count ends moving backward from person n.
    return legs % 2 === 0 ? 1 + rem : n - rem;
};
