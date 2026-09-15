function isEvenOddTree(root: TreeNode | null): boolean {
    if (root === null) return true;
    let level = 0;
    const queue: TreeNode[] = [root];
    let head = 0;
    while (head < queue.length) {
        const size = queue.length - head;
        let prev: number | null = null;
        for (let s = 0; s < size; s++) {
            const node = queue[head++];
            if (level % 2 === 0) {
                if (node.val % 2 === 0 || (prev !== null && node.val <= prev)) return false;
            } else {
                if (node.val % 2 !== 0 || (prev !== null && node.val >= prev)) return false;
            }
            prev = node.val;
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }
        level++;
    }
    return true;
}
