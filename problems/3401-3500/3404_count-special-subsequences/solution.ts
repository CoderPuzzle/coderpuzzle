function numberOfSubsequences(nums: number[]): number {
    // nums[p] * nums[r] == nums[q] * nums[s] rearranges to
    // nums[p] / nums[q] == nums[s] / nums[r]: a leading pair (p, q) and a
    // trailing pair (r, s) sharing one reduced fraction. Sweep r left to
    // right; when r clears q + 2 the pair (p, q) joins the counter, and
    // every (r, s) with s >= r + 2 looks its fraction up.
    const counts = new Map<number, number>();
    let total = 0;
    for (let r = 0; r < nums.length; r++) {
        if (r >= 2) {
            const q = r - 2;
            for (let p = 0; p <= q - 2; p++) {
                const divisor = gcd(nums[p], nums[q]);
                const key = (nums[p] / divisor) * 1001 + nums[q] / divisor;
                counts.set(key, (counts.get(key) ?? 0) + 1);
            }
        }
        for (let s = r + 2; s < nums.length; s++) {
            const divisor = gcd(nums[s], nums[r]);
            const key = (nums[s] / divisor) * 1001 + nums[r] / divisor;
            total += counts.get(key) ?? 0;
        }
    }
    return total;
}

function gcd(a: number, b: number): number {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}
