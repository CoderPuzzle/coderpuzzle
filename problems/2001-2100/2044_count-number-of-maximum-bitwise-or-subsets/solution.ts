function countMaxOrSubsets(nums: number[]): number {
    let maximum = 0;
    for (const value of nums) maximum |= value;

    function count(index: number, current: number): number {
        if (index === nums.length) return current === maximum ? 1 : 0;
        return count(index + 1, current) + count(index + 1, current | nums[index]);
    }
    return count(0, 0);
}
