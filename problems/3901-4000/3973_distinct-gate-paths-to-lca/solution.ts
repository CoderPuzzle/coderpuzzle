function distinctPaths(n: number, parent: number[], gates: number[][], queries: number[][]): number {
    const mod = 1000000007;
    let levels = 1;
    while (2 ** levels <= n) levels++;
    const children: number[][] = Array.from({ length: n }, () => []);
    for (let node = 1; node < n; node++) children[parent[node]].push(node);
    const depth = Array(n).fill(0);
    const order = [0];
    for (let i = 0; i < order.length; i++) {
        for (const child of children[order[i]]) {
            depth[child] = depth[order[i]] + 1;
            order.push(child);
        }
    }
    const up = Array.from({ length: levels }, () => new Int32Array(n));
    const matrices: number[][][] = Array.from({ length: levels }, () => Array.from({ length: n }, () => [1, 0, 0, 1]));
    const multiplyModulo = (a: number, b: number): number => {
        const low = b % 32768;
        const high = Math.floor(b / 32768);
        return (a * low + ((a * high) % mod) * 32768) % mod;
    };
    const multiply = (a: number[], b: number[]): number[] => [
        (multiplyModulo(a[0], b[0]) + multiplyModulo(a[1], b[2])) % mod,
        (multiplyModulo(a[0], b[1]) + multiplyModulo(a[1], b[3])) % mod,
        (multiplyModulo(a[2], b[0]) + multiplyModulo(a[3], b[2])) % mod,
        (multiplyModulo(a[2], b[1]) + multiplyModulo(a[3], b[3])) % mod,
    ];
    for (let node = 1; node < n; node++) {
        up[0][node] = parent[node];
        matrices[0][node] = [gates[node][1], gates[node][2], gates[node][2], gates[node][0]];
    }
    for (let level = 1; level < levels; level++) {
        for (let node = 0; node < n; node++) {
            const middle = up[level - 1][node];
            up[level][node] = up[level - 1][middle];
            matrices[level][node] = multiply(matrices[level - 1][node], matrices[level - 1][middle]);
        }
    }
    const lca = (startA: number, startB: number): number => {
        let a = startA;
        let b = startB;
        if (depth[a] < depth[b]) [a, b] = [b, a];
        const difference = depth[a] - depth[b];
        for (let level = 0; level < levels; level++) {
            if ((difference >> level) & 1) a = up[level][a];
        }
        if (a === b) return a;
        for (let level = levels - 1; level >= 0; level--) {
            if (up[level][a] !== up[level][b]) {
                a = up[level][a];
                b = up[level][b];
            }
        }
        return up[0][a];
    };
    const ways = (start: number, card: number, stop: number): number => {
        let node = start;
        let value = [1, 0, 0, 1];
        const difference = depth[node] - depth[stop];
        for (let level = levels - 1; level >= 0; level--) {
            if ((difference >> level) & 1) {
                value = multiply(value, matrices[level][node]);
                node = up[level][node];
            }
        }
        return (card === 0 ? value[0] + value[1] : value[2] + value[3]) % mod;
    };
    let answer = 0;
    for (const [a, aCard, b, bCard] of queries) {
        const stop = lca(a, b);
        // the two factors are each < 1e9+7, so their raw product exceeds
        // 2^53 and must go through the exact split multiply
        answer ^= multiplyModulo(ways(a, aCard, stop), ways(b, bCard, stop));
    }
    return answer;
}
