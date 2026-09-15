function subtreeInversionSum(edges: number[][], nums: number[], k: number): number {
    const n = nums.length;
    const adj: number[][] = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    // BFS from the root records each parent and an order whose reversal
    // lists children before parents, so the DP below needs no recursion.
    const parent: number[] = new Array(n).fill(-1);
    parent[0] = -2;
    const order: number[] = [0];
    for (let i = 0; i < order.length; i++) {
        const u = order[i];
        for (const v of adj[u]) {
            if (v !== parent[u]) {
                parent[v] = u;
                order.push(v);
            }
        }
    }

    // dp[u][flip][d]: best subtree sum of u given the parity of sign flips
    // applied from ancestors and the edge distance d to the nearest inverted
    // ancestor, capped at k since any larger distance behaves identically.
    const width = k + 1;
    const dp: Float64Array[][] = new Array(n);
    for (let idx = n - 1; idx >= 0; idx--) {
        const u = order[idx];
        // Children are already computed; pool their tables per (flip, distance).
        const childSum: Float64Array[] = [new Float64Array(width), new Float64Array(width)];
        for (const v of adj[u]) {
            if (v === parent[u]) continue;
            const cv = dp[v];
            for (let flip = 0; flip < 2; flip++) {
                const row = childSum[flip];
                const crow = cv[flip];
                for (let d = 0; d < width; d++) row[d] += crow[d];
            }
        }

        // Not inverting: children observe distance+1 (capped at k). Once the
        // distance is >= k, inverting u is legal too: it flips the parity and
        // resets the child distance to 1; keep the better of the two options.
        const table: Float64Array[] = [new Float64Array(width), new Float64Array(width)];
        for (let flip = 0; flip < 2; flip++) {
            const s = flip === 0 ? 1 : -1;
            const baseDont = nums[u] * s;
            const baseInv = -nums[u] * s;
            const dontRow = childSum[flip];
            const invRow = childSum[flip ^ 1];
            for (let dist = 0; dist < width; dist++) {
                const dd = dist < k ? dist + 1 : k;
                const valDont = baseDont + dontRow[dd];
                if (dist >= k) {
                    const valInv = baseInv + invRow[1];
                    table[flip][dist] = valDont > valInv ? valDont : valInv;
                } else {
                    table[flip][dist] = valDont;
                }
            }
        }
        dp[u] = table;
    }
    // The root has no recent inversion above it, so it is free to invert.
    return dp[0][0][k];
}
