import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        // A subtree hangs from some node of root and takes every descendant
        // below it, so the question splits in two: an equality test that
        // settles whether two trees agree in value and shape, and an anchor
        // walk that tries that test rooted at every node of root. Both walks
        // carry their own stacks: a skewed 2000-node root would nest 2000
        // calls — past CPython's default recursion limit of 1000 — and a
        // 1000-node subRoot chain would sit exactly at that edge, so every
        // runtime iterates instead. The anchor walk pops a node, tries the
        // test rooted there, and stacks its children; the first accepting
        // anchor answers the whole question.
        Deque<TreeNode> anchors = new ArrayDeque<>();
        anchors.push(root);
        while (!anchors.isEmpty()) {
            TreeNode node = anchors.pop();
            if (sameTree(node, subRoot)) return true;
            if (node.left != null) anchors.push(node.left);
            if (node.right != null) anchors.push(node.right);
        }
        return false;
    }

    // One stack entry settles one aligned node pair: two missing subtrees
    // match, exactly one missing is a shape difference no value can repair —
    // `left == right` holds only when both are null — and when both exist
    // their values must agree here while both child pairs join the queue for
    // the same treatment. An exhausted stack means every pair agreed.
    private boolean sameTree(TreeNode a, TreeNode b) {
        Deque<TreeNode[]> pending = new ArrayDeque<>();
        pending.push(new TreeNode[] { a, b });
        while (!pending.isEmpty()) {
            TreeNode[] pair = pending.pop();
            TreeNode left = pair[0],
                right = pair[1];
            if (left == null || right == null) {
                if (left != right) return false;
                continue;
            }
            if (left.val != right.val) return false;
            pending.push(new TreeNode[] { left.left, right.left });
            pending.push(new TreeNode[] { left.right, right.right });
        }
        return true;
    }
}
