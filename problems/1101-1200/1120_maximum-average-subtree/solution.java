import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public double maximumAverageSubtree(TreeNode root) {
        // Pre-order listing: each descendant appears after its ancestor, so
        // the reversed list settles both subtrees before the node above them.
        List<TreeNode> order = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        if (root != null) stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            order.add(node);
            // Push right first so left is visited first in the listing.
            if (node.right != null) stack.push(node.right);
            if (node.left != null) stack.push(node.left);
        }
        Map<TreeNode, long[]> aggregate = new HashMap<>(); // node -> {sum, size}
        double best = 0.0;
        for (int i = order.size() - 1; i >= 0; --i) {
            TreeNode node = order.get(i);
            long total = node.val;
            long size = 1;
            if (node.left != null) {
                long[] pair = aggregate.get(node.left);
                total += pair[0];
                size += pair[1];
            }
            if (node.right != null) {
                long[] pair = aggregate.get(node.right);
                total += pair[0];
                size += pair[1];
            }
            aggregate.put(node, new long[] { total, size });
            best = Math.max(best, (double) total / size);
        }
        return best;
    }
}
