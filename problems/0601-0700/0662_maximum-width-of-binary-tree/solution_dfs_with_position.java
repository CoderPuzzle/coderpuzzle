import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public int widthOfBinaryTree(TreeNode root) {
        int best = 0;
        // Depth -> {leftmost, rightmost} frame positions seen at that
        // depth — the two running extremes; the null slots between the
        // end nodes are counted by the arithmetic, never materialized.
        Map<Integer, long[]> extremes = new HashMap<>();
        // Deques used as stacks, in lockstep: each node rides with its
        // depth and index. Push the right child before the left, so the
        // pop order is root-first, left subtree before right — preorder,
        // which visits every depth in index order.
        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<Integer> depths = new ArrayDeque<>();
        Deque<Long> indices = new ArrayDeque<>();
        if (root != null) {
            nodes.push(root);
            depths.push(0);
            indices.push(0L);
        }
        while (!nodes.isEmpty()) {
            TreeNode node = nodes.pop();
            int depth = depths.pop();
            long pos = indices.pop();
            long[] span = extremes.get(depth);
            if (span == null) {
                span = new long[] { pos, pos };
                extremes.put(depth, span);
            }
            if (pos < span[0]) {
                span[0] = pos;
            }
            if (pos > span[1]) {
                span[1] = pos;
            }
            long width = span[1] - span[0] + 1;
            if (width > best) {
                best = (int) width;
            }
            // Re-base before doubling: raw heap indices double per level
            // and blow past 64 bits on a deep chain. Shifted so the level
            // starts at its leftmost node, a stored index never exceeds
            // twice the level's width; a width is a difference within one
            // level, and the shift leaves every such difference unchanged.
            long rebased = pos - span[0];
            if (node.right != null) {
                nodes.push(node.right);
                depths.push(depth + 1);
                indices.push(2 * rebased + 1);
            }
            if (node.left != null) {
                nodes.push(node.left);
                depths.push(depth + 1);
                indices.push(2 * rebased);
            }
        }
        return best;
    }
}
