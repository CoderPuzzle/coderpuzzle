function countSubtreesForEachDiameter(n: number, edges: number[][]): number[] {
    const adj: number[][] = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const farthestWithin = (start: number, mask: number): [number, number, number] => {
        const dist = new Map<number, number>();
        dist.set(start, 0);
        const queue = [start];
        let farNode = start;
        let farDist = 0;
        for (let head = 0; head < queue.length; head++) {
            const node = queue[head];
            for (const nxt of adj[node]) {
                if ((mask >> (nxt - 1)) & 1 && !dist.has(nxt)) {
                    const d = (dist.get(node) as number) + 1;
                    dist.set(nxt, d);
                    if (d > farDist) {
                        farDist = d;
                        farNode = nxt;
                    }
                    queue.push(nxt);
                }
            }
        }
        return [farNode, farDist, dist.size];
    };

    const ans = new Array(n - 1).fill(0);
    for (let mask = 1; mask < 1 << n; mask++) {
        const size = popcount(mask);
        if (size < 2) {
            continue;
        }
        const start = trailingZeros(mask) + 1;
        const [far1, , reached] = farthestWithin(start, mask);
        if (reached !== size) {
            continue;
        }
        const [, diameter] = farthestWithin(far1, mask);
        ans[diameter - 1]++;
    }
    return ans;
}

function popcount(x: number): number {
    let count = 0;
    while (x) {
        x &= x - 1;
        count++;
    }
    return count;
}

function trailingZeros(x: number): number {
    let count = 0;
    while ((x & 1) === 0) {
        x >>= 1;
        count++;
    }
    return count;
}
