// The limit is per user, so users never interact: group each user's
// times, sort them, and greedily keep every time whose k-back kept
// predecessor sits more than window away. Times, k, window <= 10^5 and
// the answer <= 10^5 — all far below 2^53, exact in TS numbers.
function maxRequests(requests: number[][], k: number, window: number): number {
    const byUser = new Map<number, number[]>();
    for (const [user, time] of requests) {
        let times = byUser.get(user);
        if (times === undefined) {
            times = [];
            byUser.set(user, times);
        }
        times.push(time);
    }
    let total = 0;
    for (const times of byUser.values()) {
        times.sort((a, b) => a - b);
        const kept: number[] = [];
        for (const t of times) {
            // Appending t is legal iff the k+1 last kept times span
            // strictly more than window: t - kept[len-k] > window.
            if (kept.length < k || t - kept[kept.length - k] > window) {
                kept.push(t);
            }
        }
        total += kept.length;
    }
    return total;
}
