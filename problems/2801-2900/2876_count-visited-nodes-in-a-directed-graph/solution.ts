function countVisitedNodes(edges: number[]): number[] {
    const n = edges.length;
    const state: number[] = new Array(n).fill(0); // 0 unvisited, 1 on the current path, 2 resolved
    const ans: number[] = new Array(n).fill(0);

    for (let start = 0; start < n; start++) {
        if (state[start] === 2) continue;
        const path: number[] = [];
        let cur = start;
        while (state[cur] === 0) {
            state[cur] = 1;
            path.push(cur);
            cur = edges[cur];
        }
        if (state[cur] === 1) {
            // A cycle was discovered; find its start inside path.
            const cycleStart = path.indexOf(cur);
            const length = path.length - cycleStart;
            for (let i = cycleStart; i < path.length; i++) {
                ans[path[i]] = length;
                state[path[i]] = 2;
            }
            for (let depth = 0; depth < cycleStart; depth++) {
                ans[path[depth]] = length + (cycleStart - depth);
                state[path[depth]] = 2;
            }
        } else {
            // path leads into an already-resolved component.
            const base = ans[cur];
            for (let depth = 0; depth < path.length; depth++) {
                ans[path[depth]] = base + (path.length - depth);
                state[path[depth]] = 2;
            }
        }
    }
    return ans;
}
