function findCriticalAndPseudoCriticalEdges(n: number, edges: number[][]): number[][] {
    const m = edges.length;
    const INF = Infinity;

    function makeDsu() {
        const par: number[] = [];
        const size: number[] = new Array(n).fill(1);
        for (let i = 0; i < n; i++) par.push(i);
        return {
            find(x: number): number {
                while (par[x] !== x) {
                    par[x] = par[par[x]];
                    x = par[x];
                }
                return x;
            },
            union(a: number, b: number): boolean {
                a = this.find(a);
                b = this.find(b);
                if (a === b) return false;
                if (size[a] < size[b]) {
                    const t = a;
                    a = b;
                    b = t;
                }
                par[b] = a;
                size[a] += size[b];
                return true;
            },
        };
    }

    // Sort edge indices by weight once; every per-edge test reuses this order.
    const order: number[] = [];
    for (let i = 0; i < m; i++) order.push(i);
    order.sort((a, b) => edges[a][2] - edges[b][2]);

    function mstWithout(skip: number): number {
        const dsu = makeDsu();
        let weight = 0;
        let used = 0;
        for (const i of order) {
            if (i === skip) continue;
            const e = edges[i];
            if (dsu.union(e[0], e[1])) {
                weight += e[2];
                used++;
            }
        }
        // Fewer than n - 1 edges used means the graph got disconnected,
        // which counts as infinite weight.
        return used === n - 1 ? weight : INF;
    }

    function mstWith(force: number): number {
        // Force the edge in first, then complete Kruskal over the rest.
        const dsu = makeDsu();
        let weight = 0;
        let used = 0;
        let e = edges[force];
        dsu.union(e[0], e[1]);
        weight += e[2];
        used++;
        for (const i of order) {
            if (i === force) continue;
            e = edges[i];
            if (dsu.union(e[0], e[1])) {
                weight += e[2];
                used++;
            }
        }
        return used === n - 1 ? weight : INF;
    }

    let baseWeight = 0;
    {
        const dsu = makeDsu();
        for (const i of order) {
            const e = edges[i];
            if (dsu.union(e[0], e[1])) baseWeight += e[2];
        }
    }

    const critical: number[] = [];
    const pseudo: number[] = [];
    // Deletion raising the weight (or disconnecting) marks an edge critical;
    // the forcing test runs only on survivors, because a critical edge
    // would also pass it.
    for (let i = 0; i < m; i++) {
        if (mstWithout(i) > baseWeight) {
            critical.push(i);
        } else if (mstWith(i) === baseWeight) {
            pseudo.push(i);
        }
    }
    critical.sort((a, b) => a - b);
    pseudo.sort((a, b) => a - b);
    return [critical, pseudo];
}
