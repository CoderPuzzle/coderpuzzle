function minCost(nums: number[], costs: number[]): number {
    const n = nums.length;
    const nextGe = new Array<number>(n).fill(-1);
    const nextLt = new Array<number>(n).fill(-1);
    const greaterStack: number[] = [];
    const lowerStack: number[] = [];
    for (let index = n - 1; index >= 0; index--) {
        while (greaterStack.length > 0 && nums[greaterStack[greaterStack.length - 1]] < nums[index]) {
            greaterStack.pop();
        }
        if (greaterStack.length > 0) {
            nextGe[index] = greaterStack[greaterStack.length - 1];
        }
        greaterStack.push(index);
        while (lowerStack.length > 0 && nums[lowerStack[lowerStack.length - 1]] >= nums[index]) {
            lowerStack.pop();
        }
        if (lowerStack.length > 0) {
            nextLt[index] = lowerStack[lowerStack.length - 1];
        }
        lowerStack.push(index);
    }
    const best = new Array<number>(n).fill(Number.MAX_SAFE_INTEGER);
    best[0] = 0;
    for (let index = 0; index < n; index++) {
        for (const target of [nextGe[index], nextLt[index]]) {
            if (target !== -1 && best[index] + costs[target] < best[target]) {
                best[target] = best[index] + costs[target];
            }
        }
    }
    return best[n - 1];
}
