function longestObstacleCourseAtEachPosition(obstacles: number[]): number[] {
    // tails[j] = smallest possible tail of a non-decreasing subsequence of
    // length j+1 over the prefix so far; it stays sorted, so each obstacle
    // is placed by binary search.
    const tails: number[] = [];
    const ans: number[] = [];
    for (const x of obstacles) {
        // Search for the first strictly greater tail (upper bound): an
        // obstacle equal to a tail extends that course instead of replacing
        // it -- the only change vs strict LIS.
        let lo = 0,
            hi = tails.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (tails[mid] <= x) lo = mid + 1;
            else hi = mid;
        }
        // Overwrite the first improvable tail (keeping it minimal), or
        // extend when x is at least as tall as every current tail.
        if (lo === tails.length) tails.push(x);
        else tails[lo] = x;
        // Insertion index + 1 = longest course ending with this obstacle.
        ans.push(lo + 1);
    }
    return ans;
}
