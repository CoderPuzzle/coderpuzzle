function reverseOddLevels(root: TreeNode | null): TreeNode | null {
    // Only values move — children stay attached — so reversing an odd
    // level means writing its value list back mirrored: first position
    // takes the last value, and so on inward. A frontier of nodes starts
    // at the root and steps down one level per round, mirroring each odd
    // level's values on arrival. The tree is perfect, so one null check
    // per node pair keeps the frontier free of nulls past the last level.
    let row: TreeNode[] = [root];
    let depth = 0;
    while (row.length > 0) {
        if (depth % 2 === 1) {
            const values = row.map((node) => node.val);
            for (let index = 0; index < row.length; ++index) {
                row[index].val = values[row.length - 1 - index];
            }
        }
        const next: TreeNode[] = [];
        for (const node of row) {
            if (node.left !== null) {
                next.push(node.left, node.right);
            }
        }
        row = next;
        depth += 1;
    }
    return root;
}
