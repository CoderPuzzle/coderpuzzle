function differenceOfSum(nums: number[]): number {
    // One pass accumulates both sums at once. Totals peak near 4 * 10^6,
    // far below the exact-Number bound 2^53, so arithmetic stays exact.
    let elementSum = 0;
    let digitSum = 0;
    for (const original of nums) {
        elementSum += original;
        let value = original;
        while (value > 0) {
            digitSum += value % 10;
            value = Math.floor(value / 10);
        }
    }
    return Math.abs(elementSum - digitSum);
}
