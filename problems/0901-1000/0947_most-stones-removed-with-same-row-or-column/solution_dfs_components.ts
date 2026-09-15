// Row-or-column adjacency splits the stones into connected components, and a
// component of k stones gives up k - 1 of them, so the answer is n minus the
// number of components. Rather than encode the merging, walk it: bucket the
// stone indices by row and by column, then depth-first search from every
// stone not yet reached, expanding through both of its buckets. Each bucket
// is deleted the first time it is expanded, so the whole shared line is
// absorbed at once and no bucket is ever scanned twice.
function removeStones(stones: number[][]): number {
    const n = stones.length;
    const rows = new Map<number, number[]>();
    const cols = new Map<number, number[]>();
    for (let i = 0; i < n; i++) {
        const row = rows.get(stones[i][0]);
        if (row === undefined) rows.set(stones[i][0], [i]);
        else row.push(i);
        const col = cols.get(stones[i][1]);
        if (col === undefined) cols.set(stones[i][1], [i]);
        else col.push(i);
    }

    const visited: boolean[] = new Array(n).fill(false);
    const stack: number[] = [];
    let components = 0;
    for (let start = 0; start < n; start++) {
        if (visited[start]) continue;
        components++;
        visited[start] = true;
        stack.push(start);
        while (stack.length > 0) {
            const u = stack.pop()!;
            const row = rows.get(stones[u][0]);
            if (row !== undefined) {
                rows.delete(stones[u][0]);
                for (const v of row) {
                    if (!visited[v]) {
                        visited[v] = true;
                        stack.push(v);
                    }
                }
            }
            const col = cols.get(stones[u][1]);
            if (col !== undefined) {
                cols.delete(stones[u][1]);
                for (const v of col) {
                    if (!visited[v]) {
                        visited[v] = true;
                        stack.push(v);
                    }
                }
            }
        }
    }

    return n - components;
}
