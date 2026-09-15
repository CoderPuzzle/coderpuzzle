function maxArea(h: number, w: number, horizontalCuts: number[], verticalCuts: number[]): number {
    const MOD = 1000000007;
    const widest = (length: number, cuts: number[]): number => {
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
}
