function maxSlidingWindow(nums: number[], k: number): number[] {
    const dq: number[] = []; // indices, values decreasing
    const result: number[] = [];
    for (let i = 0; i < nums.length; i++) {
        const value = nums[i];
        while (dq.length && nums[dq[dq.length - 1]] <= value) dq.pop();
        dq.push(i);
        if (dq[0] <= i - k) dq.shift();
        if (i >= k - 1) result.push(nums[dq[0]]);
    }
    return result;
}
