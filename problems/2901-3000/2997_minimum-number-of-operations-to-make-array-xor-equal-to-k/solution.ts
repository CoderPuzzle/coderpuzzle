function minOperations(nums: number[], k: number): number {
    // Flipping one bit of any element toggles exactly that bit of the
    // array-wide XOR, so one operation changes the XOR's Hamming distance
    // to k by exactly one: fold nums into a single XOR and count the bits
    // where it differs from k.
    let xorAll = 0;
    for (const v of nums) {
        xorAll ^= v;
    }
    let diff = xorAll ^ k;
    let count = 0;
    while (diff !== 0) {
        diff &= diff - 1; // clear the lowest set bit, one per count
        count += 1;
    }
    return count;
}
