function minOperations(nums: number[]): number {
    // Strict increase forces each element to at least prev + 1, and
    // lifting an element any higher only raises the floor of the next
    // one, so the cheapest reachable target is exactly that floor.
    let ops = 0;
    let prev = nums[0];
    for (let i = 1; i < nums.length; i++) {
        const target = Math.max(prev + 1, nums[i]);
        ops += target - nums[i];
        prev = target;
    }
    return ops;
}
