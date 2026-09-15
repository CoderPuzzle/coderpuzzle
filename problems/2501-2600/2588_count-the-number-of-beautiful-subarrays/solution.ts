function beautifulSubarrays(nums: number[]): number {
    // Each operation clears one set bit in each of two elements, so the XOR
    // of a subarray is invariant; it reduces to all zeros exactly when its
    // XOR is already 0.
    const count = new Map<number, number>();
    // Seed with the empty prefix so subarrays starting at index 0 are
    // witnessed when their prefix XOR returns to 0.
    count.set(0, 1);
    let x = 0;
    let ans = 0;
    for (const v of nums) {
        x ^= v;
        // Subarray (j, i] has XOR prefix[j] ^ prefix[i], which vanishes
        // exactly when the prefixes match: each earlier equal prefix is one
        // beautiful subarray ending here.
        const c = count.get(x) || 0;
        ans += c;
        count.set(x, c + 1);
    }
    return ans;
}
