function numberOfPoints(nums: number[][]): number {
    // Sorted by start point, a car only gains coverage past the rightmost
    // point counted so far — add its uncovered suffix there and extend
    // that reach.
    nums.sort((a, b) => a[0] - b[0]);
    let total = 0;
    let reach = 0;
    for (const [start, end] of nums) {
        if (end > reach) {
            total += end - Math.max(start, reach + 1) + 1;
            reach = end;
        }
    }
    return total;
}
