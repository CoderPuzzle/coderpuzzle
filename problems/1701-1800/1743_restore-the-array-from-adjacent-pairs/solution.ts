// Build the adjacency map: the array is a path, so every value has one or
// two neighbours. The judge compares the returned array exactly, so the
// walk must start at the same endpoint every time: the first pair's
// element that is an endpoint, or the smaller endpoint when the first
// pair is an internal edge.
function restoreArray(adjacentPairs: number[][]): number[] {
    const adj = new Map<number, number[]>();
    for (const [u, v] of adjacentPairs) {
        if (!adj.has(u)) adj.set(u, []);
        if (!adj.has(v)) adj.set(v, []);
        adj.get(u)!.push(v);
        adj.get(v)!.push(u);
    }
    const [a, b] = adjacentPairs[0];
    let start: number;
    if (adj.get(a)!.length === 1) start = a;
    else if (adj.get(b)!.length === 1) start = b;
    else {
        start = Infinity;
        for (const [value, neighbors] of adj) {
            if (neighbors.length === 1 && value < start) start = value;
        }
    }
    // Values live in [-1e5, 1e5], so Infinity stands in for "no previous
    // element" at the start of the walk.
    const result: number[] = [];
    let prev = Infinity;
    let cur = start;
    for (;;) {
        result.push(cur);
        let nxt = Infinity;
        for (const nb of adj.get(cur)!) {
            if (nb !== prev) {
                nxt = nb;
                break;
            }
        }
        if (nxt === Infinity) break;
        prev = cur;
        cur = nxt;
    }
    return result;
}
