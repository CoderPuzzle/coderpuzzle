function averageOfSubtree(root: TreeNode | null): number {
    let count = 0;
    // Iterative post-order with (node, visited) frames.
    const sums = new Map<TreeNode, number>();
    const sizes = new Map<TreeNode, number>();
    const stack: [TreeNode | null, boolean][] = [[root, false]];
    while (stack.length > 0) {
        const [node, visited] = stack.pop()!;
        if (node === null) {
            continue;
        }
        if (visited) {
            let s: number = node.val;
            let n: number = 1;
            for (const child of [node.left, node.right]) {
                if (child !== null) {
                    s += sums.get(child)!;
                    n += sizes.get(child)!;
                }
            }
            sums.set(node, s);
            sizes.set(node, n);
            if (Math.floor(s / n) === node.val) {
                count++;
            }
        } else {
            stack.push([node, true]);
            stack.push([node.left, false]);
            stack.push([node.right, false]);
        }
    }
    return count;
}
