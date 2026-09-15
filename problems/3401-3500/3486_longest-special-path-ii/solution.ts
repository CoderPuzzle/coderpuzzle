function longestSpecialPath(edges: number[][], nums: number[]): number[] {
    const n = nums.length;
    const adj: [number, number][][] = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }

    let bestLen = 0;
    let bestNodes = 1; // a single node is always a valid special path
    const distPath: number[] = []; // prefix distances per depth
    const last = new Map<number, number>(); // value -> depth of last occurrence
    // Window starts over the current root-to-node path: top keeps every
    // value distinct, second additionally tolerates one repeated value.
    let top = 0;
    let second = 0;
    const lastRestore: number[] = [];
    const topRestore: number[] = [];
    const secondRestore: number[] = [];

    // Events: [node, parent, depth, dist, isExit]
    const st: [number, number, number, number, number][] = [[0, -1, 0, 0, 0]];
    while (st.length) {
        const [u, par, depth, d, isExit] = st.pop()!;
        if (isExit) {
            distPath.pop();
            const val = nums[u];
            const prevLast = lastRestore.pop()!;
            if (prevLast >= 0) {
                last.set(val, prevLast);
            } else {
                last.delete(val);
            }
            top = topRestore.pop()!;
            second = secondRestore.pop()!;
            continue;
        }
        // Enter node u.
        distPath.push(d);
        const val = nums[u];
        const prevLast = last.has(val) ? last.get(val)! : -1;
        lastRestore.push(prevLast);
        topRestore.push(top);
        secondRestore.push(second);
        if (prevLast >= top) {
            // The repeat enters the all-distinct window: that window can
            // still serve as the one-repeat window.
            second = top;
            top = prevLast + 1;
        } else if (prevLast >= second) {
            second = prevLast + 1;
        }
        last.set(val, depth);
        const length = d - distPath[second];
        const nodes = depth - second + 1;
        if (length > bestLen) {
            bestLen = length;
            bestNodes = nodes;
        } else if (length === bestLen && nodes < bestNodes) {
            bestNodes = nodes;
        }
        st.push([u, par, depth, d, 1]);
        for (const [v, w] of adj[u]) {
            if (v !== par) {
                st.push([v, u, depth + 1, d + w, 0]);
            }
        }
    }
    return [bestLen, bestNodes];
}
