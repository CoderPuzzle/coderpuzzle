function maxBalancedSubarray(nums: number[]): number {
    // Two prefixes pin a window down: a repeated prefix XOR cancels the
    // shared head (the window's own XOR is 0), and a repeated parity gap
    // (evens minus odds so far) means the window's even and odd counts
    // tie. Matching pairs therefore bracket a balanced, zero-XOR
    // subarray, and the earliest occurrence of each pair maximizes the
    // length read off it.
    //
    // The pair packs into one number key: pxor < 2^30 and gap + n lies in
    // [0, 2n], so pxor * (2n + 1) + (gap + n) stays near 2.2e14, safely
    // inside the 2^53 exact range.
    const n = nums.length;
    const width = 2 * n + 1;
    const first = new Map<number, number>();
    first.set(n, -1);
    let pxor = 0;
    let gap = 0;
    let best = 0;
    for (let i = 0; i < n; i++) {
        const value = nums[i];
        pxor ^= value;
        gap += value % 2 === 0 ? 1 : -1;
        const key = pxor * width + (gap + n);
        const j = first.get(key);
        if (j === undefined) {
            first.set(key, i);
        } else if (i - j > best) {
            best = i - j;
        }
    }
    return best;
}
