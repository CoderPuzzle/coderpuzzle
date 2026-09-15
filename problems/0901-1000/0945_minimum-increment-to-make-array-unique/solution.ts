function minIncrementForUnique(nums: number[]): number {
    // Sorted, an element never regrets landing on the first free value
    // above its predecessor's final value — anything higher wastes moves.
    nums.sort((a, b) => a - b);
    let moves = 0;
    let prev = nums[0];
    for (let i = 1; i < nums.length; ++i) {
        const need = prev + 1 - nums[i];
        if (need > 0) {
            moves += need;
            prev = nums[i] + need;
        } else {
            prev = nums[i];
        }
    }
    return moves;
}
