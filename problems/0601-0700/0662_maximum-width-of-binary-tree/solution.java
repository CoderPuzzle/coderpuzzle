import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int widthOfBinaryTree(TreeNode root) {
        int best = 0;
        // Deques used as queues, in lockstep: each node rides with its
        // index. Add at the tail, poll from the head.
        Deque<TreeNode> nodes = new ArrayDeque<>();
        Deque<Long> indices = new ArrayDeque<>();
        if (root != null) {
            nodes.add(root);
            indices.add(0L);
        }
        while (!nodes.isEmpty()) {
            // The queues hold exactly one level, in index order, so the
            // end nodes' indices give the level's width directly — the
            // null slots between them are counted by the arithmetic,
            // never materialized.
            long width = indices.peekLast() - indices.peekFirst() + 1;
            if (width > best) {
                best = (int) width;
            }
            // Re-base before doubling: raw heap indices double per level
            // and blow past 64 bits on a deep chain. Shifted so the level
            // starts at 0, a stored index never exceeds twice the level's
            // width; a width is a difference within one level, and the
            // shift leaves every such difference unchanged.
            long base = indices.peekFirst();
            int remaining = nodes.size();
            for (int i = 0; i < remaining; ++i) {
                TreeNode node = nodes.poll();
                long index = indices.poll() - base;
                if (node.left != null) {
                    nodes.add(node.left);
                    indices.add(2 * index);
                }
                if (node.right != null) {
                    nodes.add(node.right);
                    indices.add(2 * index + 1);
                }
            }
        }
        return best;
    }
}
