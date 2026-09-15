function earliestAcq(logs: number[][], n: number): number {
    // Replay order first: the bisection asks prefix questions of the
    // chronologically sorted logs.
    const sorted = logs.slice().sort((a, b) => a[0] - b[0]);
    // Predicate for the bisection: does the prefix of the k soonest logs
    // already hold all n elements in one group?
    const connected = (k: number): boolean => {
        const parent = new Array(n).fill(0).map((_, i) => i);
        // Path-halving find keeps the trees shallow within one probe.
        const find = (a: number): number => {
            while (parent[a] !== a) {
                parent[a] = parent[parent[a]];
                a = parent[a];
            }
            return a;
        };
        // The component counter tracks the group count so no global scan is
        // ever needed.
        let components = n;
        for (let i = 0; i < k; ++i) {
            const [, x, y] = sorted[i];
            const rx = find(x),
                ry = find(y);
            // Redundant (already-connected) logs merge nothing.
            if (rx !== ry) {
                parent[rx] = ry;
                components--;
            }
        }
        return components === 1;
    };
    // Links never disappear, so once connected always connected: the
    // predicate is monotone in k and the smallest true k can be bisected.
    const m = sorted.length;
    if (!connected(m)) {
        return -1;
    }
    let lo = 1;
    let hi = m;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (connected(mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    // The last event of the surviving prefix carries the answer's moment.
    return sorted[lo - 1][0];
}
