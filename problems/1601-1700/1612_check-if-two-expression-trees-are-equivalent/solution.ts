function checkEquivalence(root1: TreeNode | null, root2: TreeNode | null): boolean {
    // The only operator is '+', commutative and associative, so two
    // expression trees agree on every variable assignment exactly when
    // they carry the same multiset of leaf variables, whatever their
    // shape. -1 marks an operator node (always 2 children); 0-25 marks a
    // leaf's encoded letter (always 0 children).
    function leafCounts(root: TreeNode | null): number[] {
        const counts = new Array<number>(26).fill(0);
        const stack: TreeNode[] = root === null ? [] : [root];
        while (stack.length > 0) {
            const node = stack.pop()!;
            if (node.left === null && node.right === null) {
                counts[node.val]++;
            } else {
                if (node.left !== null) stack.push(node.left);
                if (node.right !== null) stack.push(node.right);
            }
        }
        return counts;
    }

    const c1 = leafCounts(root1);
    const c2 = leafCounts(root2);
    return c1.every((count, i) => count === c2[i]);
}
