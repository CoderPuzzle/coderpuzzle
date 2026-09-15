function longestPath(parent: number[], s: string): number {
    const n = parent.length;
    const children: number[][] = Array.from({ length: n }, () => []);
    for (let i = 1; i < n; i++) {
        children[parent[i]].push(i);
    }

    // iterative DFS ordering (parents before children)
    const order: number[] = [];
    const stack: number[] = [0];
    while (stack.length > 0) {
        const u = stack.pop()!;
        order.push(u);
        for (const v of children[u]) {
            stack.push(v);
        }
    }

    let best = 1;
    const down: number[] = new Array(n).fill(0); // longest valid chain starting at u, going into its subtree
    for (let i = order.length - 1; i >= 0; i--) {
        const u = order[i];
        let first = 0,
            second = 0;
        for (const v of children[u]) {
            const d = s[v] !== s[u] ? down[v] : 0;
            if (d > first) {
                second = first;
                first = d;
            } else if (d > second) {
                second = d;
            }
        }
        down[u] = first + 1;
        if (first + second + 1 > best) {
            best = first + second + 1;
        }
    }
    return best;
}
