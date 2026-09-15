function countHighestScoreNodes(parents: number[]): number {
    const n = parents.length;
    const children: number[][] = Array.from({ length: n }, () => []);
    for (let node = 1; node < n; ++node) {
        children[parents[node]].push(node);
    }

    const order: number[] = [];
    const stack: number[] = [0];
    while (stack.length > 0) {
        const node = stack.pop()!;
        order.push(node);
        for (const child of children[node]) {
            stack.push(child);
        }
    }

    const subtree = new Int32Array(n);
    subtree.fill(1);
    let highest = 0;
    let count = 0;
    for (let index = order.length - 1; index >= 0; --index) {
        const node = order[index];
        let size = 1;
        let score = 1;
        for (const child of children[node]) {
            size += subtree[child];
            score *= subtree[child];
        }
        subtree[node] = size;
        const outside = n - size;
        if (outside !== 0) {
            score *= outside;
        }
        if (score > highest) {
            highest = score;
            count = 1;
        } else if (score === highest) {
            ++count;
        }
    }
    return count;
}
