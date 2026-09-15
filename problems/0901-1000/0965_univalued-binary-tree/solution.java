import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Queue;

class Solution {

    public boolean isUnivalTree(TreeNode root) {
        // The root's value is the one every node must carry, so a single
        // reference value is all the scan needs. It reads the tree level
        // by level — a queue seeded with the root, drained front-first,
        // children appended left before right — and answers false at the
        // first node that disagrees; a queue that drains clean leaves
        // every node vouched for, which is true. The queue, not the call
        // stack, carries the walk — a hundred-node chain of one value is
        // within the constraints, and no frame ever nests.
        if (root == null) {
            return true;
        }
        Queue<TreeNode> pending = new ArrayDeque<>();
        pending.add(root);
        while (!pending.isEmpty()) {
            TreeNode node = pending.poll();
            if (node.val != root.val) {
                return false;
            }
            if (node.left != null) pending.add(node.left);
            if (node.right != null) pending.add(node.right);
        }
        return true;
    }
}
