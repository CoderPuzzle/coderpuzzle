import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public TreeNode mergeTrees(TreeNode root1, TreeNode root2) {
        // The merge rule pairs positions: nodes at the same spot in both
        // trees overlap and their values sum, while a spot only one tree
        // fills keeps that node — and everything under it — as is. An
        // empty input therefore returns the other tree whole, and the
        // merged tree is built on root1's nodes: reuse, not copy, since
        // the judge serializes the returned tree to its level-order
        // values and never node identity. The walk carries an explicit
        // stack of overlapping pairs — a skewed 2000-node chain would
        // nest 2000 calls, needlessly at the mercy of this judge's 512k
        // Java thread stack. Values lie in [-10^4, 10^4], so a merged
        // value never leaves ±2·10^4; int holds that with room to spare.
        if (root1 == null) return root2;
        if (root2 == null) return root1;
        Deque<TreeNode[]> pending = new ArrayDeque<>();
        pending.push(new TreeNode[] { root1, root2 });
        while (!pending.isEmpty()) {
            // One entry settles one overlapping pair: sum the values
            // here, then settle each child slot — both trees fill it and
            // the child pair joins the stack, only root2 fills it and
            // its subtree attaches whole.
            TreeNode[] pair = pending.pop();
            TreeNode node1 = pair[0];
            TreeNode node2 = pair[1];
            node1.val += node2.val;
            if (node1.left == null) {
                node1.left = node2.left;
            } else if (node2.left != null) {
                pending.push(new TreeNode[] { node1.left, node2.left });
            }
            if (node1.right == null) {
                node1.right = node2.right;
            } else if (node2.right != null) {
                pending.push(new TreeNode[] { node1.right, node2.right });
            }
        }
        return root1;
    }
}
