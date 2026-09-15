function countPartitions(nums: number[]): number {
    // left - right = total - 2 * right, and twice any integer is even, so
    // every partition's difference carries the total's parity: either all
    // n - 1 splits are even (total even) or none is (total odd).
    let total = 0;
    for (const v of nums) {
        total += v;
    }
    return total % 2 === 0 ? nums.length - 1 : 0;
}
