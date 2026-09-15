function kthLargestNumber(nums: string[], k: number): string {
    // A string of more digits is always the larger integer, so ordering by
    // length first and lexicographically second is numeric order.
    nums.sort((a, b) => (a.length !== b.length ? a.length - b.length : a < b ? -1 : a > b ? 1 : 0));
    return nums[nums.length - k];
}
