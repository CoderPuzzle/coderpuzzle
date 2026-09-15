function minStartValue(nums: number[]): number {
    let minPrefix = 0;
    let prefix = 0;
    for (const x of nums) {
        prefix += x;
        minPrefix = Math.min(minPrefix, prefix);
    }
    return Math.max(1, 1 - minPrefix);
}
