/**
 * @param {Node} root
 * @return {TreeNode}
 */
var encode = function (root) {
    if (root === null) return null;
    const broot = new TreeNode(root.val);
    const nodes = [root];
    const binaries = [broot];
    for (let qi = 0; qi < nodes.length; qi++) {
        const node = nodes[qi];
        const bnode = binaries[qi];
        let prev = null;
        for (const child of node.children) {
            const bchild = new TreeNode(child.val);
            if (prev === null) {
                bnode.left = bchild;
            } else {
                prev.right = bchild;
            }
            prev = bchild;
            nodes.push(child);
            binaries.push(bchild);
        }
    }
    return broot;
};
