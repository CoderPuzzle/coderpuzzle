function minimumOperations(root: TreeNode | null): number {
    if (root === null) return 0;
    let total = 0;
    const queue: TreeNode[] = [root];
    let head = 0;
    while (head < queue.length) {
        const size = queue.length - head;
        const level: number[] = [];
        for (let s = 0; s < size; s++) {
            const node = queue[head++];
            level.push(node.val);
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
        // Minimum swaps to sort this level = sum of (cycle length - 1).
        const target = level.slice().sort((a, b) => a - b);
        const pos = new Map<number, number>();
        for (let i = 0; i < level.length; i++) pos.set(level[i], i);
        const visited = new Array<boolean>(level.length).fill(false);
        for (let i = 0; i < level.length; i++) {
            if (visited[i] || level[i] === target[i]) {
                visited[i] = true;
                continue;
            }
            let j = i;
            let cycle = 0;
            while (!visited[j]) {
                visited[j] = true;
                cycle++;
                j = pos.get(target[j])!;
            }
            total += cycle - 1;
        }
    }
    return total;
}
