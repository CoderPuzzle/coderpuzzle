function getMaximumGenerated(n: number): number {
    if (n === 0) {
        return 0;
    }
    const nums = new Array(n + 1).fill(0);
    nums[1] = 1;
    let best = 1;
    for (let i = 2; i <= n; i++) {
        if (i % 2 === 0) {
            nums[i] = nums[i / 2];
        } else {
            nums[i] = nums[(i - 1) / 2] + nums[(i - 1) / 2 + 1];
        }
        best = Math.max(best, nums[i]);
    }
    return best;
}
