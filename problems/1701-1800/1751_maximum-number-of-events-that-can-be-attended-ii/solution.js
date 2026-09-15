/**
 * @param {number[][]} events
 * @param {number} k
 * @return {number}
 */
var maxValue = function (events, k) {
    // Sorted by end day, any compatible set read by finish time is a
    // subsequence of this order, so earlier choices sit to the left.
    const sorted = events.slice().sort((a, b) => a[1] - b[1]);
    const n = sorted.length;
    const ends = sorted.map((e) => e[1]);
    // prev[i]: best value using the first i sorted events with one fewer
    // allowed attendance.
    let prev = new Array(n + 1).fill(0);
    const rounds = Math.min(k, n);
    for (let j = 0; j < rounds; j++) {
        const cur = new Array(n + 1).fill(0);
        let best = 0;
        for (let i = 1; i <= n; i++) {
            const start = sorted[i - 1][0];
            // Lower bound: first index whose end day is >= start.
            let lo = 0;
            let hi = n;
            while (lo < hi) {
                const mid = (lo + hi) >> 1;
                if (ends[mid] < start) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            const take = prev[lo] + sorted[i - 1][2];
            // The running max carries the skip option forward.
            if (take > best) {
                best = take;
            }
            cur[i] = best;
        }
        prev = cur;
    }
    return prev[n];
};
