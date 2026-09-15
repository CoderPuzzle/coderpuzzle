function triangleNumber(nums: number[]): number {
    const sorted = [...nums].sort((a, b) => a - b);
    const n = sorted.length;
    let count = 0;
    // Fix the largest side; sorted order leaves a + b > c as the only check needed.
    for (let i = n - 1; i > 1; i--) {
        // First zero seen from the top means every remaining side is 0 too.
        if (sorted[i] === 0) break;
        let lo = 0,
            hi = i - 1;
        while (lo < hi) {
            if (sorted[lo] + sorted[hi] > sorted[i]) {
                // Sum already suffices at the leftmost lo, so every index
                // up to hi - 1 also pairs with hi: hi - lo triplets at once.
                count += hi - lo;
                hi--;
            } else {
                // Too small even at the rightmost partner; only lo can move up.
                lo++;
            }
        }
    }
    return count;
}
