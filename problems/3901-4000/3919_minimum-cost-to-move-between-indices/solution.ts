function minCost(nums: number[], queries: number[][]): number[] {
    const n = nums.length;
    const forward = new Array<number>(Math.max(n - 1, 0)).fill(0);
    const backward = new Array<number>(Math.max(n - 1, 0)).fill(0);

    for (let i = 0; i < n; i++) {
        let closest: number;
        if (i === 0) closest = 1;
        else if (i === n - 1) closest = n - 2;
        else {
            const left = nums[i] - nums[i - 1];
            const right = nums[i + 1] - nums[i];
            closest = left <= right ? i - 1 : i + 1;
        }
        if (i > 0) backward[i - 1] = closest === i - 1 ? 1 : nums[i] - nums[i - 1];
        if (i < n - 1) forward[i] = closest === i + 1 ? 1 : nums[i + 1] - nums[i];
    }

    const prefixForward = new Array<number>(n).fill(0);
    const prefixBackward = new Array<number>(n).fill(0);
    for (let i = 1; i < n; i++) {
        prefixForward[i] = prefixForward[i - 1] + forward[i - 1];
        prefixBackward[i] = prefixBackward[i - 1] + backward[i - 1];
    }

    return queries.map(([left, right]) =>
        left <= right ? prefixForward[right] - prefixForward[left] : prefixBackward[left] - prefixBackward[right],
    );
}
