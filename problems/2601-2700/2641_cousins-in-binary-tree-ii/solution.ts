function replaceValueInTree(root: TreeNode | null): TreeNode | null {
    // A node's new value is (sum of its level) - (its own original value
    // plus its sibling's). Two-phase breadth-first passes read a whole level
    // of children with their original values first — recording where each
    // parent's sibling group ends — then write the cousin sums back group by
    // group. Iterative on purpose: chains can run 10^5 nodes deep, far past
    // comfortable recursion.
    let row: TreeNode[] = [root];
    root.val = 0;
    while (row.length > 0) {
        const children: TreeNode[] = [];
        const ends: number[] = [];
        let childSum = 0;
        for (const node of row) {
            for (const child of [node.left, node.right]) {
                if (child !== null) {
                    children.push(child);
                    childSum += child.val;
                }
            }
            ends.push(children.length);
        }
        let index = 0;
        for (const end of ends) {
            if (end > index) {
                let pairSum = 0;
                for (let k = index; k < end; ++k) pairSum += children[k].val;
                const newValue = childSum - pairSum;
                for (let k = index; k < end; ++k) children[k].val = newValue;
            }
            index = end;
        }
        row = children;
    }
    return root;
}
