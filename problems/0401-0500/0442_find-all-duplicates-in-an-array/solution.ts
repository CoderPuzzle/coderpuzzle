function findDuplicates(nums: number[]): number[] {
    // Values in [1, n] let the array index itself be the hash: value v maps
    // to slot v-1, and flipping that slot's sign records "v seen". A slot
    // already negative means |v| was visited before: a duplicate.
    const duplicates: number[] = [];
    for (const value of nums) {
        const index = Math.abs(value) - 1;
        if (nums[index] < 0) {
            duplicates.push(index + 1);
        } else {
            nums[index] = -nums[index];
        }
    }
    // Restore every sign so the array is left as it was found, then emit the
    // ascending order this judge pins on the original's any-order freedom.
    for (let index = 0; index < nums.length; ++index) {
        nums[index] = Math.abs(nums[index]);
    }
    duplicates.sort((a, b) => a - b);
    return duplicates;
}
