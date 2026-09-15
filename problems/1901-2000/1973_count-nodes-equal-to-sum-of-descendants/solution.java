import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int equalToDescendants(TreeNode root) {
        // A reverse preorder walk visits children before parents, so
        // processing the collected nodes back-to-front lets each node's
        // subtree sum be built from its children's already-computed sums.
        // A node counts when its value equals the sum of its descendants,
        // i.e. its subtree sum minus its own value. The traversal is fully
        // iterative, so a 10^5-deep skewed tree cannot overflow any stack.
        // Subtree sums reach 10^5 * 10^5 = 10^10, so they need 64 bits.
        List<TreeNode> order = new ArrayList<>();
        Deque<TreeNode> pending = new ArrayDeque<>();
        pending.push(root);
        while (!pending.isEmpty()) {
            TreeNode node = pending.pop();
            order.add(node);
            if (node.right != null) pending.push(node.right);
            if (node.left != null) pending.push(node.left);
        }
        Map<TreeNode, Long> subtree = new HashMap<>();
        int count = 0;
        for (int i = order.size() - 1; i >= 0; i--) {
            TreeNode node = order.get(i);
            long total = node.val + subtree.getOrDefault(node.left, 0L) + subtree.getOrDefault(node.right, 0L);
            subtree.put(node, total);
            if ((long) node.val == total - node.val) count++;
        }
        return count;
    }
}
