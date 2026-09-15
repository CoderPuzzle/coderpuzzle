function maxStability(n: number, edges: number[][], k: number): number {
    const parent = new Int32Array(n);
    const size = new Int32Array(n);

    const find = (a: number): number => {
        while (parent[a] !== a) {
            parent[a] = parent[parent[a]];
            a = parent[a];
        }
        return a;
    };
    const union = (a: number, b: number): boolean => {
        a = find(a);
        b = find(b);
        if (a === b) return false;
        if (size[a] < size[b]) {
            const t = a;
            a = b;
            b = t;
        }
        parent[b] = a;
        size[a] += size[b];
        return true;
    };

    const feasible = (x: number): boolean => {
        for (let i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
        for (const e of edges) {
            if (e[3] === 1) {
                if (e[2] < x) return false;
                if (!union(e[0], e[1])) return false;
            }
        }
        for (const e of edges) {
            if (e[3] === 0 && e[2] >= x) union(e[0], e[1]);
        }
        let upgrades = 0;
        for (const e of edges) {
            if (e[3] === 0 && e[2] < x && 2 * e[2] >= x) {
                if (union(e[0], e[1])) {
                    upgrades++;
                    if (upgrades > k) return false;
                }
            }
        }
        const root = find(0);
        for (let i = 1; i < n; i++) {
            if (find(i) !== root) return false;
        }
        return true;
    };

    if (!feasible(1)) return -1;
    let lo = 1,
        hi = 200001; // si <= 1e5 so 2*si <= 2e5
    while (lo + 1 < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (feasible(mid)) lo = mid;
        else hi = mid;
    }
    return lo;
}
