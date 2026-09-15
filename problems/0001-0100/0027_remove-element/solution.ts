function removeElement(nums: number[], val: number): number[] {
    // Write pointer: nums[:k] always holds the survivors seen so far, so
    // one read pass compacts them to the front in place — no shifting.
    let k = 0;
    for (const value of nums) {
        if (value !== val) {
            nums[k] = value;
            k++;
        }
    }
    // The statement frees both the order and the tail beyond k, so the
    // compacted prefix is the whole judged answer; its length is k.
    nums.length = k;
    return nums;
}
