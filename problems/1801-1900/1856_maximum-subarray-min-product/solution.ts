function maxSumMinProduct(nums: number[]): number {
    const MOD = 1000000007;
    const n = nums.length;
    const prefix: number[] = new Array(n + 1);
    prefix[0] = 0;
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    let best = 0;
    const stack: number[] = []; // indices with strictly increasing values
    for (let i = 0; i <= n; i++) {
        const cur = i < n ? nums[i] : 0; // sentinel 0 pops everything
        while (stack.length > 0 && nums[stack[stack.length - 1]] >= cur) {
            const m = nums[stack.pop()!];
            const left = stack.length > 0 ? stack[stack.length - 1] : -1;
            const total = prefix[i] - prefix[left + 1];
            best = Math.max(best, m * total);
        }
        if (i < n) {
            stack.push(i);
        }
    }
    return best % MOD;
}
