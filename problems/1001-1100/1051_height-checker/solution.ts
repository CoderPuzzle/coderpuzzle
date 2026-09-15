function heightChecker(heights: number[]): number {
    // The expected order is just heights sorted into non-decreasing order.
    // Compare position-by-position and count every mismatch.
    const expected = [...heights].sort((a, b) => a - b);
    let count = 0;
    for (let i = 0; i < heights.length; i++) {
        if (heights[i] !== expected[i]) {
            count++;
        }
    }
    return count;
}
