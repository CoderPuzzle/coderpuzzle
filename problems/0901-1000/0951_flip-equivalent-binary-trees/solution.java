import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public boolean flipEquiv(TreeNode root1, TreeNode root2) {
        // Flip equivalence is a question of pairing: some way of walking
        // the trees together, committing at each paired node to the
        // straight or the swapped alignment of children, must run out of
        // nodes without a disagreement. The stack carries the pairs.
        Deque<TreeNode[]> pending = new ArrayDeque<>();
        pending.push(new TreeNode[] { root1, root2 });
        while (!pending.isEmpty()) {
            TreeNode[] pair = pending.pop();
            TreeNode a = pair[0],
                b = pair[1];
            if (a == null && b == null) continue;
            if (a == null || b == null || a.val != b.val) return false;
            if (aligned(a.left, b.left) && aligned(a.right, b.right)) {
                pending.push(new TreeNode[] { a.left, b.left });
                pending.push(new TreeNode[] { a.right, b.right });
            } else if (aligned(a.left, b.right) && aligned(a.right, b.left)) {
                pending.push(new TreeNode[] { a.left, b.right });
                pending.push(new TreeNode[] { a.right, b.left });
            } else {
                return false;
            }
        }
        return true;
    }

    // Values are unique within each tree, which is what makes the
    // commitment above exhaustive: both alignments can line up at a node
    // only when they coincide, so testing the straight one first and
    // falling back to the swapped one covers every flip choice.
    private boolean aligned(TreeNode a, TreeNode b) {
        if (a == null || b == null) return a == b;
        return a.val == b.val;
    }
}
