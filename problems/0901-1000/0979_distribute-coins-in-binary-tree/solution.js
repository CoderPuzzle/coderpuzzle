/**
 * @param {TreeNode} root
 * @return {number}
 */
var distributeCoins = function (root) {
    let moves = 0;

    // dfs returns the subtree's excess: coins minus nodes. That excess
    // must cross the edge to the parent, one move per coin.
    function dfs(node) {
        if (node === null) {
            return 0;
        }
        const left = dfs(node.left);
        const right = dfs(node.right);
        // Each |excess| is the flow on that child edge; flows on separate
        // edges never interfere, so summing them is the total moves.
        moves += Math.abs(left) + Math.abs(right);
        // Keep one coin for this node; the rest is the parent-bound flow.
        return node.val + left + right - 1;
    }

    dfs(root);
    return moves;
};
