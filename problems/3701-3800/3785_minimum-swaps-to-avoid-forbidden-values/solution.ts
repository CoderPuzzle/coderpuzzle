function minSwaps(nums: number[], forbidden: number[]): number {
    // A swap repairs at most two bad positions, and two bad positions
    // sharing a value cannot repair each other, so the answer is at least
    // max(ceil(bad/2), worst same-value cluster). A value whose combined
    // count in nums and forbidden exceeds n has nowhere to hide and makes
    // the task impossible; otherwise both lower bounds are achievable,
    // and their max is the answer.
    const n = nums.length;
    const freq = new Map<number, number>();
    for (const x of nums) {
        freq.set(x, (freq.get(x) || 0) + 1);
    }
    for (const x of forbidden) {
        freq.set(x, (freq.get(x) || 0) + 1);
    }
    for (const count of freq.values()) {
        if (count >= n + 1) {
            return -1;
        }
    }
    const bad = new Map<number, number>();
    for (let i = 0; i < n; i++) {
        if (nums[i] === forbidden[i]) {
            bad.set(nums[i], (bad.get(nums[i]) || 0) + 1);
        }
    }
    let total = 0;
    let worst = 0;
    for (const count of bad.values()) {
        total += count;
        if (count > worst) {
            worst = count;
        }
    }
    return Math.max(Math.ceil(total / 2), worst);
}
