import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public long findTilt(TreeNode root) {
        // Post-order, one pass: by the time a node is settled, both of its
        // subtrees have reported their sums, so its tilt |left - right|
        // falls out of those two numbers — a missing child reports 0 — and
        // the same visit yields the node's own sum for its parent. The
        // traversal carries its own stack of frames: the tree may be a
        // single 10^4-node chain, whose walk would nest 10000 calls —
        // over this judge's 512k Java thread stack — so every runtime
        // iterates instead.
        long totalTilt = 0;
        // Every subtree sum stays within 10^4 nodes of 1000 each, so
        // |sum| <= 10^7 fits an int; only the running total of tilts is
        // 64-bit — a 10^4-node one-child chain of 1000s stacks up tilts
        // 0 + 1000 + 2000 + ... to almost 5 * 10^10.
        Deque<Frame> stack = new ArrayDeque<>();
        if (root != null) {
            stack.push(new Frame(root));
        }
        while (!stack.isEmpty()) {
            Frame frame = stack.peek();
            if (frame.state == 0) {
                frame.state = 1;
                if (frame.node.left != null) {
                    stack.push(new Frame(frame.node.left));
                }
            } else if (frame.state == 1) {
                frame.state = 2;
                if (frame.node.right != null) {
                    stack.push(new Frame(frame.node.right));
                }
            } else {
                stack.pop();
                totalTilt += Math.abs(frame.left - frame.right);
                int total = frame.node.val + frame.left + frame.right;
                if (!stack.isEmpty()) {
                    Frame parent = stack.peek();
                    // The parent's state tells which subtree just finished:
                    // 1 = its left child, 2 = its right child.
                    if (parent.state == 1) {
                        parent.left = total;
                    } else {
                        parent.right = total;
                    }
                }
            }
        }
        return totalTilt;
    }

    // A node under traversal, holding the sums of the two subtrees
    // already finished beneath it.
    private static class Frame {

        final TreeNode node;
        int state;
        int left;
        int right;

        Frame(TreeNode node) {
            this.node = node;
        }
    }
}
