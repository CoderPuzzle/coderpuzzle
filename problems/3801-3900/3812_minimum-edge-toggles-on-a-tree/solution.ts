function minimumFlips(n: number, edges: number[][], start: string, target: string): number[] {
    const adjacency: [number, number][][] = Array.from({ length: n }, () => []);
    edges.forEach(([u, v], index) => {
        adjacency[u].push([v, index]);
        adjacency[v].push([u, index]);
    });

    // Breadth-first discovery from node 0 records each node's parent
    // and the edge leading to it; an explicit queue keeps deep trees
    // off the call stack.
    const parent = new Array<number>(n).fill(-1);
    const parentEdge = new Array<number>(n).fill(-1);
    const order = [0];
    for (let i = 0; i < order.length; i++) {
        const node = order[i];
        for (const [neighbor, edge] of adjacency[node]) {
            if (neighbor !== parent[node]) {
                parent[neighbor] = node;
                parentEdge[neighbor] = edge;
                order.push(neighbor);
            }
        }
    }

    // need[node] stays 1 while the node's flip parity is unmatched.
    const need = new Uint8Array(n);
    for (let x = 0; x < n; x++) {
        need[x] = start[x] === target[x] ? 0 : 1;
    }
    const take = new Uint8Array(n - 1);
    for (let i = order.length - 1; i >= 1; i--) {
        const node = order[i];
        if (need[node]) {
            // Children are done, so the parent edge is the only
            // remaining toggle touching this node: the choice is
            // forced, and the unmatched parity moves to the parent.
            take[parentEdge[node]] = 1;
            need[parent[node]] ^= 1;
        }
    }
    // Whatever parity survives at the root cannot be fixed anywhere.
    if (need[0]) {
        return [-1];
    }
    // A final ascending scan emits the chosen indices in order.
    const chosen: number[] = [];
    for (let index = 0; index < n - 1; index++) {
        if (take[index]) {
            chosen.push(index);
        }
    }
    return chosen;
}
