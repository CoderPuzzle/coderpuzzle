function minMaxWeight(n: number, edges: number[][], threshold: number): number {
    // Invert: "0 reachable from all" becomes "0 reaches all" in rev.
    const adj: [number, number][][] = Array.from({ length: n }, () => []);
    let maxw = 0;
    for (const [u, v, w] of edges) {
        adj[v].push([u, w]);
        if (w > maxw) maxw = w;
    }

    function reachable(limit: number): boolean {
        const seen = new Array<boolean>(n).fill(false);
        seen[0] = true;
        const stack: number[] = [0];
        let count = 1;
        while (stack.length) {
            const x = stack.pop()!;
            for (const [nxt, w] of adj[x]) {
                if (!seen[nxt] && w <= limit) {
                    seen[nxt] = true;
                    count++;
                    stack.push(nxt);
                }
            }
        }
        return count === n;
    }

    if (!reachable(maxw)) return -1;
    let lo = 0,
        hi = maxw;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (reachable(mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
