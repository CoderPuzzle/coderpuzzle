function minOperations(nums: number[]): number {
    // One operation on the whole array replaces every element with their
    // common bitwise AND, so any array equalizes in at most one step;
    // zero steps suffice only when it already is constant.
    return nums.every((x) => x === nums[0]) ? 0 : 1;
}
