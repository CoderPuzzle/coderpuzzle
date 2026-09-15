function validateBinaryTreeNodes(n: number, leftChild: number[], rightChild: number[]): boolean {
    // At most one parent each, exactly one root, and full reachability from
    // that root: together necessary and sufficient.
    const indegree = new Array<number>(n).fill(0);
    for (const children of [leftChild, rightChild]) {
        for (const child of children) {
            if (child !== -1) ++indegree[child];
        }
    }
    if (indegree.some((count) => count > 1)) return false;
    const roots: number[] = [];
    indegree.forEach((count, i) => {
        if (count === 0) roots.push(i);
    });
    if (roots.length !== 1) return false;
    const seen = new Set<number>([roots[0]]);
    const queue: number[] = [roots[0]];
    for (let head = 0; head < queue.length; ++head) {
        const node = queue[head];
        for (const child of [leftChild[node], rightChild[node]]) {
            if (child !== -1 && !seen.has(child)) {
                seen.add(child);
                queue.push(child);
            }
        }
    }
    return seen.size === n;
}
