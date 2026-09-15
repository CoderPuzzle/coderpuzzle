function rootCount(edges: number[][], guesses: number[][], k: number): number {
    const n = edges.length + 1;
    const graph: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        graph[a].push(b);
        graph[b].push(a);
    }
    // Guess set of packed (parent, child) keys gives O(1) direction checks.
    const guessSet = new Set<number>();
    for (const [a, b] of guesses) {
        guessSet.add(a * 4294967296 + b);
    }

    // Iterative DFS from root 0 records each node's parent and an order where
    // parents precede children — rerooting without recursion.
    const parent: number[] = new Array(n).fill(-1);
    const order: number[] = [];
    const visited: boolean[] = new Array(n).fill(false);
    const stack: number[] = [0];
    visited[0] = true;
    while (stack.length > 0) {
        const u = stack.pop()!;
        order.push(u);
        for (const v of graph[u]) {
            if (!visited[v]) {
                visited[v] = true;
                parent[v] = u;
                stack.push(v);
            }
        }
    }

    const cnt: number[] = new Array(n).fill(0);
    // Correct-guess count for root 0: one point per edge whose (parent,
    // child) direction was guessed.
    for (let v = 1; v < n; v++) {
        if (guessSet.has(parent[v] * 4294967296 + v)) {
            cnt[0]++;
        }
    }

    let ans = cnt[0] >= k ? 1 : 0;
    for (let oi = 1; oi < order.length; oi++) {
        // Moving the root across edge p -> u flips only that one edge:
        // guess (p, u) becomes wrong and reversed guess (u, p) becomes
        // right. Parents come first in `order`, so cnt[p] is final here.
        const u = order[oi];
        const p = parent[u];
        let c = cnt[p];
        if (guessSet.has(p * 4294967296 + u)) {
            c--;
        }
        if (guessSet.has(u * 4294967296 + p)) {
            c++;
        }
        cnt[u] = c;
        if (c >= k) {
            ans++;
        }
    }
    return ans;
}
