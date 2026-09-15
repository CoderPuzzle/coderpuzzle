import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    // One explicit post-order frame: the node plus how far its descent is.
    private static class Frame {

        TreeNode node;
        int phase;

        Frame(TreeNode node, int phase) {
            this.node = node;
            this.phase = phase;
        }
    }

    public int maxPathSum(TreeNode root) {
        // Explicit post-order: frames of (node, phase) replace the call
        // stack. Phase 0 = first visit (descend left), 1 = left done
        // (descend right), 2 = both done (combine). Finished single-side
        // gains pile on their own stack, children's results waiting for
        // the parent.
        Deque<Frame> stack = new ArrayDeque<>();
        Deque<Long> gains = new ArrayDeque<>();
        // A path must contain at least one node, so start at -inf, not 0.
        long best = Long.MIN_VALUE;
        if (root != null) {
            stack.push(new Frame(root, 0));
        }
        while (!stack.isEmpty()) {
            Frame frame = stack.pop();
            TreeNode node = frame.node;
            if (frame.phase == 0) {
                // Reschedule as phase 1, then let the left subtree run
                // first by sitting on top of the stack.
                stack.push(new Frame(node, 1));
                if (node.left != null) {
                    stack.push(new Frame(node.left, 0));
                }
            } else if (frame.phase == 1) {
                stack.push(new Frame(node, 2));
                if (node.right != null) {
                    stack.push(new Frame(node.right, 0));
                }
            } else {
                // Both subtrees finished: right's gain sits above left's on
                // the gain stack (left ran first). Missing children left
                // nothing to pop.
                Long rightGain = node.right != null ? gains.pop() : null;
                Long leftGain = node.left != null ? gains.pop() : null;
                // Clamp each side at 0: a negative branch is better left unvisited.
                long downLeft = Math.max(leftGain != null ? leftGain : 0, 0);
                long downRight = Math.max(rightGain != null ? rightGain : 0, 0);
                long value = node.val;
                // The path bending through this node is a candidate for the
                // global answer.
                best = Math.max(best, value + downLeft + downRight);
                // The parent may only extend the path through one side.
                gains.push(value + Math.max(downLeft, downRight));
            }
        }
        return (int) best;
    }
}
