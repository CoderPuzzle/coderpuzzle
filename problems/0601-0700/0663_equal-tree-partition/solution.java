import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean checkEqualTree(TreeNode root) {
        // Removing one edge detaches exactly one subtree; the two parts are
        // that subtree and everything else, so the split is equal exactly
        // when some subtree sums to half of the whole tree's total. One
        // post-order pass computes every subtree sum, and the root's own
        // sum, the last to finish, is that total. The traversal carries its
        // own stack of frames: the tree may be a single 10^4-node chain,
        // whose walk would nest 10000 calls — over this judge's 512k Java
        // thread stack — so every runtime iterates instead.
        Set<Long> sums = new HashSet<>();
        long total = 0;
        // Sums reach 10^4 nodes of 10^5 each — |sum| up to 10^9, at the
        // very rim of a 32-bit int — so accumulation is 64-bit throughout.
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
                total = frame.node.val + frame.left + frame.right;
                if (!stack.isEmpty()) {
                    // A parent still waits above, so this was a proper
                    // subtree — the only cut candidates. The whole tree
                    // never counts as a part: with total 0 the root's own
                    // sum would match its half spuriously.
                    sums.add(total);
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
        // An odd total never halves into integers — parity still bites
        // with negatives (-9 is as odd as 9).
        return total % 2 == 0 && sums.contains(total / 2);
    }

    // A node under traversal, holding the sums of the two subtrees
    // already finished beneath it.
    private static class Frame {

        final TreeNode node;
        int state;
        long left;
        long right;

        Frame(TreeNode node) {
            this.node = node;
        }
    }
}
