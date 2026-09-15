function minSubarraySort(nums: number[], k: number): number[] {
    // Per window (hint 2): the segment to sort ends at the last element
    // smaller than the running max before it, and starts at the first
    // element larger than the running min after it. A sorted window sets
    // neither boundary, so its answer is 0.
    const n = nums.length;
    const res: number[] = [];
    for (let s = 0; s + k <= n; s++) {
        const e = s + k;
        let right = -1;
        let mx = 0;
        for (let i = s; i < e; i++) {
            if (nums[i] < mx) {
                right = i;
            } else {
                mx = nums[i];
            }
        }
        if (right === -1) {
            res.push(0);
            continue;
        }
        let left = 0;
        let mn = Infinity;
        for (let i = e - 1; i >= s; i--) {
            if (nums[i] > mn) {
                left = i;
            } else {
                mn = nums[i];
            }
        }
        res.push(right - left + 1);
    }
    return res;
}
