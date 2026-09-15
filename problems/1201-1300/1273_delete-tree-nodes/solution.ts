function deleteTreeNodes(nodes: number, parent: number[], value: number[]): number {
    // Fold bottom-up: each node hands its parent its subtree sum and the
    // number of kept nodes below it — but only if its own subtree sum
    // survived as nonzero. A zero-sum subtree contributes nothing to
    // either, which is exactly the cascade: its values stop counting
    // toward every ancestor's sum too.
    const children: number[][] = Array.from({ length: nodes }, () => []);
    for (let i = 0; i < nodes; i++) {
        if (parent[i] >= 0) {
            children[parent[i]].push(i);
        }
    }
    const order: number[] = [0];
    for (let head = 0; head < order.length; head++) {
        for (const child of children[order[head]]) {
            order.push(child);
        }
    }
    const subSum = [...value];
    const kept = new Array(nodes).fill(1);
    for (let i = nodes - 1; i >= 0; i--) {
        const node = order[i];
        const p = parent[node];
        if (p >= 0 && subSum[node] !== 0) {
            subSum[p] += subSum[node];
            kept[p] += kept[node];
        }
    }
    return subSum[0] !== 0 ? kept[0] : 0;
}
