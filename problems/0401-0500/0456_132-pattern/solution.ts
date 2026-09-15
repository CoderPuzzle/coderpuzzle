function find132pattern(nums: number[]): boolean {
    if (nums.length < 3) {
        return false;
    }
    const stack: number[] = [];
    // Scan right-to-left; `third` is the largest value known to sit after
    // something bigger — the best nums[k] candidate (-Infinity = none yet).
    let third = -Infinity;
    for (let i = nums.length - 1; i >= 0; i--) {
        const value = nums[i];
        // Current value below third makes it a valid nums[i]; the pair that
        // produced third lies entirely to its right.
        if (value < third) {
            return true;
        }
        // Popped values are smaller than `value` and lie to its right, so
        // each has a larger number before it; the last (largest) popped
        // becomes third. The stack stays decreasing.
        while (stack.length > 0 && stack[stack.length - 1] < value) {
            third = stack.pop()!;
        }
        stack.push(value);
    }
    return false;
}
