function pairSum(nums: number[], target: number): number[] {
    // Hash map from value -> index: one pass answers "seen the complement?"
    // in O(1), replacing the nested brute-force scan.
    const seen = new Map<number, number>();
    for (let index = 0; index < nums.length; ++index) {
        // Look up before inserting, so an element can never match itself
        // and the two returned indices are guaranteed distinct.
        const earlier = seen.get(target - nums[index]);
        if (earlier !== undefined) return [earlier, index];
        seen.set(nums[index], index);
    }
    return [];
}
