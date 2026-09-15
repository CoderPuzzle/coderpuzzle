function sumOddLengthSubarrays(arr: number[]): number {
    // Every window sum is a difference of two prefix sums: with P[0] = 0, the
    // window [l, r] contributes P[r + 1] - P[l] to the total. Instead of
    // summing window by window, collect each prefix entry's coefficient: P[k]
    // is added once per odd window ending at k - 1, floor((k + 1) / 2) of
    // them, and subtracted once per odd window starting at k, of which there
    // are floor((n - k + 1) / 2), zero when k = n. One linear pass over the
    // prefix array therefore collapses the whole series.
    const n = arr.length;
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + arr[i];
    }
    let total = 0;
    for (let k = 1; k <= n; k++) {
        const coef = Math.floor((k + 1) / 2) - Math.floor((n - k + 1) / 2);
        total += coef * prefix[k];
    }
    return total;
}
