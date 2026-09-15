/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxAncestorDiff = function (root) {
    // Loop invariant: the stack holds [node, pathMin, pathMax] triples,
    // where pathMin/pathMax are the minimum and maximum values seen among
    // node's strict ancestors — node's own value is not folded in yet.
    const stack = [[root, root.val, root.val]];
    let ans = 0;
    while (stack.length > 0) {
        const [node, pathMin, pathMax] = stack.pop();
        // The best pairing for this node always uses one of the two
        // running extremes above it: any other ancestor value lies
        // between pathMin and pathMax, so it can never beat both.
        ans = Math.max(ans, Math.abs(node.val - pathMin), Math.abs(node.val - pathMax));
        const newMin = Math.min(pathMin, node.val);
        const newMax = Math.max(pathMax, node.val);
        if (node.left !== null) stack.push([node.left, newMin, newMax]);
        if (node.right !== null) stack.push([node.right, newMin, newMax]);
    }
    return ans;
};
