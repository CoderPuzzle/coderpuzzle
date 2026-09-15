function countGoodNodes(edges: number[][]): number {
    const n = edges.length + 1;
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    // Breadth-first order from the root: parents are always recorded
    // before their children, so reading this array backwards visits
    // every child before its parent -- an iterative post-order that
    // never touches the call stack.
    const order = new Array<number>(n).fill(0);
    const parent = new Array<number>(n).fill(-1);
    const visited = new Array<boolean>(n).fill(false);
    visited[0] = true;
    let head = 0;
    let tail = 1;
    while (head < tail) {
        const u = order[head++];
        for (const v of adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                parent[v] = u;
                order[tail++] = v;
            }
        }
    }

    // Reverse breadth-first order folds subtree sizes bottom-up: once the
    // fold reaches a node, every one of its descendants has already been
    // folded in, so size[i] ends as the number of nodes in i's subtree.
    const size = new Array<number>(n).fill(1);
    for (let idx = n - 1; idx > 0; idx--) {
        size[parent[order[idx]]] += size[order[idx]];
    }

    // A node is good when its children's subtree sizes all agree.
    const isGood = new Array<boolean>(n).fill(true);
    const seenChild = new Array<boolean>(n).fill(false);
    const firstSize = new Array<number>(n).fill(0);
    for (let idx = 1; idx < n; idx++) {
        const v = order[idx];
        const p = parent[v];
        if (!seenChild[p]) {
            seenChild[p] = true;
            firstSize[p] = size[v];
        } else if (size[v] !== firstSize[p]) {
            isGood[p] = false;
        }
    }

    let ans = 0;
    for (let i = 0; i < n; i++) {
        if (isGood[i]) ans++;
    }
    return ans;
}
