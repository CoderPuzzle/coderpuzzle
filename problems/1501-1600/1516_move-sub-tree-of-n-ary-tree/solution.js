/**
 * @param {Node} root
 * @param {Node} p
 * @param {Node} q
 * @return {Node}
 */
var moveSubTree = function (root, p, q) {
    // One sweep gathers the facts the rewiring needs: p's parent, q's
    // parent, and whether q sits inside p's subtree -- depth counts how
    // many levels below p the walk currently is (0 means outside).
    let pParent = null;
    let qParent = null;
    let qBelow = false;
    const stack = [[root, null, 0]];
    while (stack.length) {
        const [node, parent, depth] = stack.pop();
        if (node === p) pParent = parent;
        if (node === q) {
            qParent = parent;
            qBelow = depth > 0;
        }
        const next = depth > 0 || node === p ? depth + 1 : 0;
        for (const child of node.children) stack.push([child, node, next]);
    }
    // p already hangs exactly where the move wants it: nothing to do.
    if (q.children.some((child) => child === p)) return root;
    if (qBelow) {
        // Case 1: q travels inside p's subtree, so free q and re-hang it
        // where p stood -- in p's parent's children list, or at the root
        // when p is the root -- before p becomes q's last child.
        qParent.children.splice(qParent.children.indexOf(q), 1);
        if (pParent === null) {
            q.children.push(p);
            return q;
        }
        pParent.children[pParent.children.indexOf(p)] = q;
        q.children.push(p);
        return root;
    }
    // Cases 2 and 3: a plain re-attachment of p (with its subtree).
    pParent.children.splice(pParent.children.indexOf(p), 1);
    q.children.push(p);
    return root;
};
