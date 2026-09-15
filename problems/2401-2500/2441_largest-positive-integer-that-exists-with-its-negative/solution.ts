function findMaxK(nums: number[]): number {
    // A positive k is valid exactly when -k sits in the same array, so
    // membership is the whole question -- drop every value into a hash
    // set once, then scan for the largest positive whose negation is
    // present. Values are nonzero by the constraints, so no value can
    // be its own partner.
    const seen = new Set(nums);
    let best = -1;
    for (const value of nums) {
        if (value > 0 && seen.has(-value) && value > best) {
            best = value;
        }
    }
    return best;
}
