function sortColors(nums: number[]): number[] {
    // Three growing regions and an unexplored tail:
    //   [0, low)   settled 0s
    //   [low, mid) settled 1s
    //   [mid, high] unexamined
    //   (high, end) settled 2s
    // Each step examines nums[mid] and shrinks the unexamined band.
    let low = 0;
    let mid = 0;
    let high = nums.length - 1;
    while (mid <= high) {
        const value = nums[mid]!;
        if (value === 0) {
            // The element swapped in from `low` is a settled 1 (or mid ==
            // low, swapping with itself), so mid may advance too.
            const held = nums[low]!;
            nums[low] = nums[mid]!;
            nums[mid] = held;
            low++;
            mid++;
        } else if (value === 1) {
            // Already in its home region: the unexamined band alone shrinks.
            mid++;
        } else {
            // The element swapped in from `high` is unexamined, so mid
            // stays put and re-reads it on the next pass.
            const held = nums[mid]!;
            nums[mid] = nums[high]!;
            nums[high] = held;
            high--;
        }
    }
    return nums;
}
