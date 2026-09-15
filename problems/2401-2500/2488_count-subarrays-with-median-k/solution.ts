function countSubarrays(nums: number[], k: number): number {
    const n = nums.length;
    let pos = -1;
    for (let i = 0; i < n; i++) {
        if (nums[i] === k) {
            pos = i;
            break;
        }
    }
    // balance ranges over [-n, n]; offset by n.
    const balance = new Array<number>(2 * n + 1).fill(0);
    balance[n] = 1;
    let current = 0;
    let count = 0;
    for (let i = 0; i < n; i++) {
        const v = nums[i];
        if (v > k) current += 1;
        else if (v < k) current -= 1;
        if (i >= pos) {
            count += balance[current + n] + balance[current - 1 + n];
        } else {
            balance[current + n] += 1;
        }
    }
    return count;
}
