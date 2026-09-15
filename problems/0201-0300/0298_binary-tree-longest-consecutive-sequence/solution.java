import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int longestConsecutive(TreeNode root) {
        // For every node, the consecutive run ending there is one longer
        // than its parent's run when the step is exactly +1, and 1 when it
        // is not; the answer is the maximum over all nodes. The traversal
        // carries its own stack: the tree may be a single 3*10^4-node chain,
        // whose run nests 30000 calls — far past what this judge's 512k
        // Java thread stack could hold.
        int best = 0;
        // Right children parked while the descent walks the left spine,
        // each with the run length already computed for it.
        Deque<Frame> pending = new ArrayDeque<>();
        TreeNode node = root;
        int length = 1;
        while (node != null) {
            if (length > best) {
                best = length;
            }
            if (node.right != null) {
                // Extend into the right child, or restart the run there.
                boolean step = node.right.val == node.val + 1;
                pending.push(new Frame(node.right, step ? length + 1 : 1));
            }
            if (node.left != null) {
                // Descend left, extending or restarting the same way.
                boolean step = node.left.val == node.val + 1;
                length = step ? length + 1 : 1;
                node = node.left;
            } else if (!pending.isEmpty()) {
                Frame frame = pending.pop();
                node = frame.node;
                length = frame.length;
            } else {
                node = null;
            }
        }
        return best;
    }

    // A parked right child together with the length of the run ending at it.
    private static class Frame {

        final TreeNode node;
        final int length;

        Frame(TreeNode node, int length) {
            this.node = node;
            this.length = length;
        }
    }
}
