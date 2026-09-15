function minimumTime(s: string): number {
    const n = s.length;
    // cost(l, r) = l + (n - r) + 2 * count1(s[l:r])
    //            = n + sum over kept chars of (1 if '1' else -1).
    // Minimize by taking the minimum subarray sum (empty subarray allowed).
    let minEnd = 0;
    let best = 0;
    for (let k = 0; k < n; k++) {
        const value = s[k] === "1" ? 1 : -1;
        minEnd = Math.min(value, minEnd + value);
        best = Math.min(best, minEnd);
    }
    return n + best;
}
