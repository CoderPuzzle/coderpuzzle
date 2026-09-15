function leadsToDestination(n: number, edges: number[][], source: number, destination: number): boolean {
    const graph: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        graph[u].push(v);
    }

    // 0 = unvisited (white), 1 = on the current DFS path (gray), 2 = fully
    // verified safe (black). A node is a leaf when it has no outgoing edges;
    // a leaf is safe only if it is the destination. The destination itself
    // must also be a true leaf -- if it has outgoing edges, any path
    // through it keeps going and can only end somewhere else (or loop
    // forever), so it is unsafe the moment it is reached.
    const WHITE = 0;
    const GRAY = 1;
    const BLACK = 2;
    const state = new Array<number>(n).fill(WHITE);

    // Returns a decided verdict for a leaf or for the destination itself;
    // undefined means the node needs a full DFS expansion first.
    const leafVerdict = (node: number): boolean | undefined => {
        if (graph[node].length === 0) return node === destination;
        if (node === destination) return false;
        return undefined;
    };

    const initial = leafVerdict(source);
    if (initial !== undefined) return initial;

    // Explicit stack of [node, next child index] frames -- an iterative
    // post-order DFS so the recursion depth never depends on graph depth.
    state[source] = GRAY;
    const stack: Array<[number, number]> = [[source, 0]];
    while (stack.length > 0) {
        const top = stack[stack.length - 1];
        const [node, idx] = top;
        if (idx === graph[node].length) {
            state[node] = BLACK;
            stack.pop();
            continue;
        }
        top[1] += 1;
        const neighbor = graph[node][idx];
        if (state[neighbor] === GRAY) {
            return false; // back edge to a node on the current path: a cycle
        }
        if (state[neighbor] === BLACK) {
            continue; // already proven safe on an earlier branch
        }
        const verdict = leafVerdict(neighbor);
        if (verdict === false) {
            return false;
        }
        if (verdict === true) {
            state[neighbor] = BLACK;
            continue;
        }
        state[neighbor] = GRAY;
        stack.push([neighbor, 0]);
    }
    return true;
}
