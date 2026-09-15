function minimumOperations(nums: number[]): number {
    // Elements are independent: each operation touches exactly one
    // element, so every element needs only the distance from its nearest
    // multiple of 3 — a remainder of 1 or 2 costs exactly one +/- 1,
    // remainder 0 costs nothing.
    let ops = 0;
    for (const v of nums) {
        ops += Math.min(v % 3, (3 - (v % 3)) % 3);
    }
    return ops;
}
