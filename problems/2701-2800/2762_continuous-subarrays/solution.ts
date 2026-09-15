function continuousSubarrays(nums: number[]): number {
    const minDq: number[] = []; // indices, values increasing (front = min)
    const maxDq: number[] = []; // indices, values decreasing (front = max)
    let left = 0;
    let count = 0;
    for (let right = 0; right < nums.length; right++) {
        const value = nums[right];
        while (minDq.length && nums[minDq[minDq.length - 1]] >= value) minDq.pop();
        minDq.push(right);
        while (maxDq.length && nums[maxDq[maxDq.length - 1]] <= value) maxDq.pop();
        maxDq.push(right);
        // equality is allowed, so only a spread above 2 forces the shrink
        while (nums[maxDq[0]] - nums[minDq[0]] > 2) {
            if (maxDq[0] === left) maxDq.shift();
            if (minDq[0] === left) minDq.shift();
            left++;
        }
        // every start in [left, right] keeps the spread within the band
        count += right - left + 1;
    }
    return count;
}
