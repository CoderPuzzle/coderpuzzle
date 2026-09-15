function xorGame(nums: number[]): boolean {
    // Alice wins exactly when the board already folds to 0 (she wins
    // on the spot) or the count is even, letting her always hand Bob
    // a nonzero odd board he cannot escape.
    let total = 0;
    for (const value of nums) {
        total ^= value;
    }
    return total === 0 || nums.length % 2 === 0;
}
