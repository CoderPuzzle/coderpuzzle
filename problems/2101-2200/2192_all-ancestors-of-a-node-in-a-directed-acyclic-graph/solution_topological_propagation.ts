function getAncestors(n: number, edges: number[][]): number[][] {
    // Kahn's order over the graph's natural direction: a node is dequeued
    // only once every incoming edge is consumed, so all of its direct parents
    // are final and its ancestor set is the union of each parent plus that
    // parent's already-computed set.
    const children: number[][] = Array.from({ length: n }, () => []);
    const parents: number[][] = Array.from({ length: n }, () => []);
    for (const [from, to] of edges) {
        children[from].push(to);
        parents[to].push(from);
    }
    const bits = 30;
    const words = Math.ceil(n / bits);
    // ancestors[v] is a bitset (30-bit chunks) of the nodes that reach v
    const ancestors: number[][] = Array.from({ length: n }, () => new Array<number>(words).fill(0));
    const indegree: number[] = parents.map((list) => list.length);
    let queue: number[] = [];
    for (let v = 0; v < n; ++v) {
        if (indegree[v] === 0) {
            queue.push(v);
        }
    }
    while (queue.length > 0) {
        const next: number[] = [];
        for (const node of queue) {
            const set = ancestors[node];
            for (const parent of parents[node]) {
                set[(parent / bits) | 0] |= 1 << (parent % bits);
                for (let w = 0; w < words; ++w) {
                    set[w] |= ancestors[parent][w];
                }
            }
            for (const child of children[node]) {
                if (--indegree[child] === 0) {
                    next.push(child);
                }
            }
        }
        queue = next;
    }
    const answer: number[][] = [];
    for (let v = 0; v < n; ++v) {
        const row: number[] = [];
        for (let u = 0; u < n; ++u) {
            if ((ancestors[v][(u / bits) | 0] & (1 << (u % bits))) !== 0) {
                row.push(u);
            }
        }
        answer.push(row);
    }
    return answer;
}
