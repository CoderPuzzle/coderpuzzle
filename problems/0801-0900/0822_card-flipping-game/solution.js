/**
 * @param {number[]} fronts
 * @param {number[]} backs
 * @return {number}
 */
var flipgame = function (fronts, backs) {
    // A card printed with the same number on both faces shows that number
    // no matter which way it is flipped, so that number can never be good.
    // Any other printed number can be good: rest one card carrying it with
    // that side down, and every other card — at most one of its two faces
    // carries the number — hides it face down. The flips are independent,
    // so nothing else has to be planned: the answer is the smallest
    // printed number that no both-faces card forces upward.
    const forced = new Set();
    for (let i = 0; i < fronts.length; ++i) {
        if (fronts[i] === backs[i]) {
            forced.add(fronts[i]);
        }
    }
    let best = 0;
    for (const value of [...fronts, ...backs]) {
        if (!forced.has(value) && (best === 0 || value < best)) {
            best = value;
        }
    }
    return best;
};
