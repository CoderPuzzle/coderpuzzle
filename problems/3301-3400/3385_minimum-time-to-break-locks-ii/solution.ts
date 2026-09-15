function findMinimumTime(strength: number[]): number {
    // The k-th lock broken (1-indexed) is charged at factor k: its energy
    // grows by k each minute from 0, so it breaks after exactly
    // ceil(strength / k) minutes. Waiting longer never helps, and X
    // depends only on how many locks are already broken, so the total
    // time is sum over k of ceil(strength[order[k]] / k), minimized over
    // all break orders — a minimum-cost perfect matching between locks
    // and positions, solved by the O(n^3) Hungarian algorithm with
    // potentials.
    const n = strength.length;
    const cost: number[][] = strength.map((s) => {
        const row = new Array<number>(n);
        for (let k = 0; k < n; k++) {
            row[k] = Math.floor((s + k) / (k + 1));
        }
        return row;
    });
    const INF = 2 ** 60;
    const u = new Array<number>(n + 1).fill(0);
    const v = new Array<number>(n + 1).fill(0);
    const p = new Array<number>(n + 1).fill(0); // p[j] = row matched to column j
    const way = new Array<number>(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        p[0] = i;
        let j0 = 0;
        const minv = new Array<number>(n + 1).fill(INF);
        const used = new Array<boolean>(n + 1).fill(false);
        for (;;) {
            used[j0] = true;
            const i0 = p[j0];
            let delta = INF;
            let j1 = 0;
            for (let j = 1; j <= n; j++) {
                if (!used[j]) {
                    const cur = cost[i0 - 1][j - 1] - u[i0] - v[j];
                    if (cur < minv[j]) {
                        minv[j] = cur;
                        way[j] = j0;
                    }
                    if (minv[j] < delta) {
                        delta = minv[j];
                        j1 = j;
                    }
                }
            }
            for (let j = 0; j <= n; j++) {
                if (used[j]) {
                    u[p[j]] += delta;
                    v[j] -= delta;
                } else {
                    minv[j] -= delta;
                }
            }
            j0 = j1;
            if (p[j0] === 0) {
                break;
            }
        }
        while (j0 > 0) {
            const j1 = way[j0];
            p[j0] = p[j1];
            j0 = j1;
        }
    }
    let total = 0;
    for (let j = 1; j <= n; j++) {
        total += cost[p[j] - 1][j - 1];
    }
    return total;
}
