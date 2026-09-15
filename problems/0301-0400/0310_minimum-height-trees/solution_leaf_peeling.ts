function findMinHeightTrees(n: number, edges: number[][]): number[] {
    // A one- or two-node tree is its own center; the general loop would
    // also mishandle two nodes that are each other's leaves.
    if (n <= 2) {
        const r: number[] = [];
        for (let i = 0; i < n; i++) r.push(i);
        return r;
    }
    const adjacency: number[][] = Array.from({ length: n }, () => []);
    const degree: number[] = new Array(n).fill(0);
    for (const [a, b] of edges) {
        adjacency[a].push(b);
        adjacency[b].push(a);
        degree[a]++;
        degree[b]++;
    }
    let leaves: number[] = [];
    for (let i = 0; i < n; i++) if (degree[i] === 1) leaves.push(i);
    let remaining = n;
    // Peel the tree from the outside in, topological-sort style: delete all
    // current leaves at once, each layer shortening every longest
    // root-to-leaf distance of the remaining core. The MHT root is the
    // middle of the diameter path: one node when the diameter has an even
    // edge count, two adjacent middles when odd.
    while (remaining > 2) {
        // Peel exactly this round's layer, collecting the leaves it
        // exposes for the next round.
        const nextLeaves: number[] = [];
        for (const leaf of leaves) {
            remaining--;
            // The popped leaf's own degree is never zeroed; a popped
            // node is not examined again, so it is harmless.
            for (const neighbor of adjacency[leaf]) {
                degree[neighbor]--;
                if (degree[neighbor] === 1) nextLeaves.push(neighbor);
            }
        }
        leaves = nextLeaves;
    }
    // The one or two survivors are the centroids (MHT roots).
    return leaves.slice().sort((a, b) => a - b);
}
