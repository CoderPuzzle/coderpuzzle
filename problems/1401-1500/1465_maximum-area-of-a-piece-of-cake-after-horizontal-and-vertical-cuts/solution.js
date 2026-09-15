/**
 * @param {number} h
 * @param {number} w
 * @param {number[]} horizontalCuts
 * @param {number[]} verticalCuts
 * @return {number}
 */
var maxArea = function (h, w, horizontalCuts, verticalCuts) {
    const MOD = 1000000007;
    const widest = (length, cuts) => {
        cuts.sort((a, b) => a - b);
        let best = Math.max(cuts[0], length - cuts[cuts.length - 1]);
        for (let i = 1; i < cuts.length; i++) {
            best = Math.max(best, cuts[i] - cuts[i - 1]);
        }
        return best;
    };
    const maxH = widest(h, horizontalCuts);
    const maxW = widest(w, verticalCuts);
    // Both maxima are <= 1e9, so the product stays below 2^53 and is exact.
    return Number((BigInt(maxH) * BigInt(maxW)) % BigInt(MOD));
};
