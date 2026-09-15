function minOperations(nums: number[], k: number): number {
    // Each operation removes the current smallest element, so exactly the
    // values strictly below k get removed, each exactly once.
    let count = 0;
    for (const value of nums) {
        if (value < k) ++count;
    }
    return count;
}
