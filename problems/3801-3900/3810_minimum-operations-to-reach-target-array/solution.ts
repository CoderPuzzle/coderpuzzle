function minOperations(nums: number[], target: number[]): number {
    // Choosing x rewrites exactly the cells whose current value is x (all
    // maximal x-segments land on their target values), so a mismatched cell
    // keeps its value until an operation names that value. Naming a value
    // clears its whole mismatch class; no other cell moves. The answer is
    // the number of classes: distinct nums[i] where it differs from
    // target[i]. The count is at most 1e5, exact as a JS Number (< 2^53).
    const distinct = new Set<number>();
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== target[i]) {
            distinct.add(nums[i]);
        }
    }
    return distinct.size;
}
