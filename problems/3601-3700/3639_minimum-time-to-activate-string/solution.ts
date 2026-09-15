function minTime(s: string, order: number[], k: number): number {
    const n = s.length;
    // Once every character is a '*', all n * (n + 1) / 2 substrings are
    // valid; if even that total falls short of k, no time ever works. The
    // total stays exact: it peaks near 5 * 10^9, far below 2^53.
    const total = (n * (n + 1)) / 2;
    if (total < k) {
        return -1;
    }
    // Number of substrings holding at least one star after the first
    // t + 1 positions are starred: the total minus what the star-free
    // runs hide, each maximal run of length L hiding 1 + 2 + ... + L.
    const validCount = (t: number): number => {
        const starred = new Array(n).fill(false);
        for (let i = 0; i <= t; i++) {
            starred[order[i]] = true;
        }
        let invalid = 0,
            run = 0;
        for (const flag of starred) {
            if (flag) {
                run = 0;
            } else {
                run++;
                invalid += run;
            }
        }
        return total - invalid;
    };
    // Each replacement only turns more substrings valid, so activity is
    // monotone in t and the earliest active time admits a binary search.
    // Feasibility at t = n - 1 is guaranteed by the early return above.
    let lo = 0,
        hi = n - 1;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (validCount(mid) >= k) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
