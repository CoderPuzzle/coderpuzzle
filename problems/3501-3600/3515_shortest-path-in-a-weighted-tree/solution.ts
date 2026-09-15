function treeQueries(n: number, edges: number[][], queries: number[][]): number[] {
    const adj: [number, number][][] = Array.from({ length: n + 1 }, () => []);
    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }

    const parent = new Array(n + 1).fill(0);
    const upW = new Array(n + 1).fill(0);
    const base = new Array(n + 1).fill(0);
    const tin = new Array(n + 1).fill(0);
    const tout = new Array(n + 1).fill(0);
    let timer = 0;
    // stack entries: [node, parent, weight to parent, state 0=enter / 1=exit]
    const stack: [number, number, number, number][] = [[1, 0, 0, 0]];
    while (stack.length > 0) {
        const [u, p, w, state] = stack.pop()!;
        if (state === 0) {
            parent[u] = p;
            upW[u] = w;
            if (p !== 0) base[u] = base[p] + w;
            timer += 1;
            tin[u] = timer;
            stack.push([u, p, w, 1]);
            for (let i = adj[u].length - 1; i >= 0; i--) {
                const [v, ww] = adj[u][i];
                if (v !== p) stack.push([v, u, ww, 0]);
            }
        } else {
            tout[u] = timer;
        }
    }

    const size = n + 2;
    const bit = new Array(size + 1).fill(0);
    const add = (i: number, val: number): void => {
        while (i <= size) {
            bit[i] += val;
            i += i & -i;
        }
    };
    const point = (i: number): number => {
        let s = 0;
        while (i > 0) {
            s += bit[i];
            i -= i & -i;
        }
        return s;
    };

    const answer: number[] = [];
    for (const query of queries) {
        if (query[0] === 2) {
            const x = query[1];
            answer.push(base[x] + point(tin[x]));
        } else {
            const u = query[1],
                v = query[2],
                wp = query[3];
            const child = parent[u] === v ? u : v;
            const delta = wp - upW[child];
            upW[child] = wp;
            add(tin[child], delta);
            add(tout[child] + 1, -delta);
        }
    }
    return answer;
}
