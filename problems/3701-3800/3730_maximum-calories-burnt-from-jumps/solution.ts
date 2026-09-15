function maxCaloriesBurnt(heights: number[]): number {
    // Sorted extremes alternate through the routine: the largest
    // remaining height takes each even index (descending), the smallest
    // takes each odd index (ascending), so every edge spans the widest
    // gap available and the first jump claims the tallest block. The
    // numeric comparator matters: the default sort is lexicographic.
    const s = [...heights].sort((a, b) => a - b);
    const n = s.length;
    const arr = new Array(n);
    let lo = 0;
    let hi = n - 1;
    for (let index = 0; index < n; ++index) {
        if (index % 2 === 0) {
            arr[index] = s[hi--];
        } else {
            arr[index] = s[lo++];
        }
    }
    // Totals peak near 10^15, under MAX_SAFE_INTEGER (~9 * 10^15), so
    // plain numbers stay exact for every allowed input.
    let total = arr[0] * arr[0];
    for (let index = 1; index < n; ++index) {
        const gap = arr[index - 1] - arr[index];
        total += gap * gap;
    }
    return total;
}
