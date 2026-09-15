function maxSubarrays(n: number, conflictingPairs: number[][]): number {
    // bucket each pair at its smaller element; g[a] collects the larger endpoints
    const g: number[][] = Array.from({ length: n + 1 }, () => []);
    for (const pair of conflictingPairs) {
        let a = pair[0],
            b = pair[1];
        if (a > b) {
            const t = a;
            a = b;
            b = t;
        }
        g[a].push(b);
    }
    const cnt: number[] = new Array(n + 2).fill(0);
    let ans = 0,
        add = 0;
    let b1 = n + 1,
        b2 = n + 1;
    // sweep left endpoints right to left; b1, b2 are the smallest and
    // second-smallest right endpoint among pairs whose smaller side is >= a
    for (let a = n; a >= 1; a--) {
        for (const b of g[a]) {
            if (b < b1) {
                b2 = b1;
                b1 = b;
            } else if (b < b2) {
                b2 = b;
            }
        }
        // a subarray starting at a stays valid up to just before b1
        ans += b1 - a;
        // removing the pair that uniquely supplies b1 relaxes its bound to
        // b2; bank b2 - b1 keyed by b1 (duplicate b's land in b2, gain 0)
        cnt[b1] += b2 - b1;
        if (cnt[b1] > add) {
            add = cnt[b1];
        }
    }
    ans += add;
    return ans;
}
