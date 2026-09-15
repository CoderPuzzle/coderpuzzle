// intersect() counts DISTINCT shared integers, so each row first collapses
// to a set: [1, 1] and [1, 1] share only the value 1. Pairwise set
// intersections then spell out the edges, and an iterative stack DFS counts
// the components.
function numberOfComponents(properties: number[][], k: number): number {
    const n = properties.length;
    const sets = properties.map((row) => new Set(row));
    const adjacency: number[][] = Array.from({ length: n }, () => []);
    for (let i = 0; i < n; ++i) {
        for (let j = i + 1; j < n; ++j) {
            let shared = 0;
            for (const value of sets[i]) {
                if (sets[j].has(value)) ++shared;
            }
            if (shared >= k) {
                adjacency[i].push(j);
                adjacency[j].push(i);
            }
        }
    }
    const seen = new Array(n).fill(false);
    let components = 0;
    const stack: number[] = [];
    for (let start = 0; start < n; ++start) {
        if (seen[start]) continue;
        ++components;
        // Mark on push so a node never enters the stack twice.
        seen[start] = true;
        stack.push(start);
        while (stack.length > 0) {
            const node = stack.pop()!;
            for (const neighbor of adjacency[node]) {
                if (!seen[neighbor]) {
                    seen[neighbor] = true;
                    stack.push(neighbor);
                }
            }
        }
    }
    return components;
}
