function findRedundantConnection(edges: number[][]): number[] {
    const adj = new Map<number, number[]>();

    const connected = function (a: number, b: number): boolean {
        const stack: number[] = [a];
        const seen = new Set<number>([a]);
        // The stack explores depth-first and marks nodes on push, so each
        // node enters it at most once per probe.
        while (stack.length > 0) {
            const u = stack.pop()!;
            if (u === b) {
                return true;
            }
            for (const v of adj.get(u) || []) {
                if (!seen.has(v)) {
                    seen.add(v);
                    stack.push(v);
                }
            }
        }
        return false;
    };

    // A tree plus one extra edge has exactly one cycle; the first edge
    // that closes it is the one to remove.
    for (const [a, b] of edges) {
        // Probe before inserting: if b is already reachable from a
        // through the edges added so far, this edge closes the cycle.
        if (connected(a, b)) {
            return [a, b];
        }
        // A safe edge joins two previously separate parts: register it
        // in both directions and keep scanning.
        if (!adj.has(a)) {
            adj.set(a, []);
        }
        if (!adj.has(b)) {
            adj.set(b, []);
        }
        adj.get(a)!.push(b);
        adj.get(b)!.push(a);
    }
    return [];
}
