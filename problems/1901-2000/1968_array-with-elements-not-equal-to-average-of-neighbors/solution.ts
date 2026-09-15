function rearrangeArray(nums: number[]): number[] {
    // Sort, then interleave halves: the larger half occupies the even
    // indices, the smaller half the odd ones. Each even-indexed value is
    // then strictly above both (lower-half) neighbors and each
    // odd-indexed value strictly below both (upper-half) neighbors, so no
    // interior element can equal the average of its neighbors.
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const ans = new Array(n);
    const half = Math.floor(n / 2);
    for (let k = 0; k < n - half; ++k) ans[2 * k] = nums[half + k];
    for (let k = 0; k < half; ++k) ans[2 * k + 1] = nums[k];
    return ans;
}
