function findKthPositive(arr: number[], k: number): number {
    const n = arr.length;
    // A gapless array would have arr[i] = i + 1, so missing(i) counts the
    // positive integers absent up through arr[i]; it is non-decreasing.
    const missing = (i: number): number => arr[i] - (i + 1);
    // Smallest index whose missing count reaches k; hi = n lets the search
    // converge past the end when the whole array falls short.
    let lo = 0,
        hi = n;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (missing(mid) < k) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    // Every index before lo accounts for fewer than k missing numbers, so
    // the kth missing positive is exactly k past that point.
    return lo + k;
}
