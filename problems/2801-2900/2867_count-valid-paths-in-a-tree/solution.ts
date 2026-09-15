function countPaths(n: number, edges: number[][]): number {
    // sieve of primes up to n
    const prime: boolean[] = new Array(n + 1).fill(true);
    prime[0] = false;
    if (n >= 1) prime[1] = false;
    for (let p = 2; p * p <= n; p++) {
        if (prime[p]) {
            for (let m = p * p; m <= n; m += p) prime[m] = false;
        }
    }

    const graph: number[][] = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const parent: number[] = new Array(n + 1).fill(0);
    const order: number[] = [1];
    for (let i = 0; i < order.length; i++) {
        const x = order[i];
        for (const y of graph[x]) {
            if (y !== parent[x]) {
                parent[y] = x;
                order.push(y);
            }
        }
    }

    // dp0[x] / dp1[x] = number of nodes y in subtree(x) whose path x..y
    // contains 0 / exactly 1 prime node.
    const dp0: number[] = new Array(n + 1).fill(0);
    const dp1: number[] = new Array(n + 1).fill(0);
    let ans = 0;
    for (let i = order.length - 1; i >= 0; i--) {
        const x = order[i];
        if (prime[x]) {
            dp0[x] = 0;
            dp1[x] = 1;
        } else {
            dp0[x] = 1;
            dp1[x] = 0;
        }
        let total0 = prime[x] ? 0 : 1;
        let total1 = prime[x] ? 1 : 0;
        for (const y of graph[x]) {
            if (parent[y] !== x) continue;
            let c0: number, c1: number;
            if (prime[x]) {
                c0 = 0;
                c1 = dp0[y];
            } else {
                c0 = dp0[y];
                c1 = dp1[y];
            }
            if (prime[x]) {
                // need f(a) + f(b) == 2 (both endpoints one prime)
                ans += total1 * c1;
            } else {
                ans += total0 * c1 + total1 * c0;
            }
            total0 += c0;
            total1 += c1;
            if (prime[x]) {
                dp1[x] += dp0[y];
            } else {
                dp0[x] += dp0[y];
                dp1[x] += dp1[y];
            }
        }
    }
    return ans;
}
