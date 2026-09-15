function componentValue(nums: number[], edges: number[][]): number {
    const n = nums.length;
    const adjacency: number[][] = Array.from({ length: n }, () => []);
    for (const [a, b] of edges) {
        adjacency[a].push(b);
        adjacency[b].push(a);
    }

    // iterative DFS from node 0: parents + a visitation order whose
    // reverse is a valid post-order
    const parent: number[] = new Array(n).fill(-1);
    const order: number[] = [];
    const stack: number[] = [0];
    while (stack.length > 0) {
        const node = stack.pop()!;
        order.push(node);
        for (const nxt of adjacency[node]) {
            if (nxt !== parent[node]) {
                parent[nxt] = node;
                stack.push(nxt);
            }
        }
    }

    // subtree sums: everything a node keeps after its own greedy cuts
    const sums: number[] = nums.slice();
    const largest = Math.max(...nums);
    for (let i = order.length - 1; i >= 0; i--) {
        const node = order[i];
        if (parent[node] >= 0) {
            sums[parent[node]] += sums[node];
        }
    }

    const total = sums[0];
    const counts: number[] = [];
    for (let divisor = 1; divisor * divisor <= total; divisor++) {
        if (total % divisor === 0) {
            counts.push(divisor);
            if (divisor !== total / divisor) {
                counts.push(total / divisor);
            }
        }
    }
    counts.sort((a, b) => b - a);
    for (const k of counts) {
        const value = total / k;
        if (value < largest) {
            continue;
        }
        let components = 0;
        for (const s of sums) {
            if (s % value === 0) {
                components++;
            }
        }
        if (components === k) {
            return k - 1;
        }
    }
    return 0;
}
