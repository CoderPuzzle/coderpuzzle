import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int largestBSTSubtree(TreeNode root) {
        // Post-order, one pass: every subtree reports whether it is a BST,
        // its size, and its min/max value; a node is a BST exactly when
        // both children are BSTs and left.max < node.val < right.min, so
        // each node is judged from its two child reports alone. The
        // traversal carries its own stack of frames: the tree may be a
        // single 10^4-node chain, whose judgement nests 10000 calls —
        // over this judge's 512k Java thread stack — so every runtime
        // iterates instead.
        int best = 0;
        // Frame = a node, which child remains to visit (0 = left pending,
        // 1 = right pending, 2 = ready to judge), and the two child
        // reports already collected.
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
                Report report = judge(frame);
                if (report.bst && report.size > best) {
                    best = report.size;
                }
                if (!stack.isEmpty()) {
                    Frame parent = stack.peek();
                    if (parent.state == 1) {
                        parent.left = report;
                    } else {
                        parent.right = report;
                    }
                }
            }
        }
        return best;
    }

    // An absent child is an empty BST: size 0, and never a violation at
    // its parent — the ±sentinel range makes both bounds checks pass.
    private static final Report EMPTY = new Report(true, 0, Integer.MAX_VALUE, Integer.MIN_VALUE);

    // Judge one node from the two reports its children produced.
    private static Report judge(Frame frame) {
        TreeNode node = frame.node;
        Report left = frame.left;
        Report right = frame.right;
        if (!left.bst || !right.bst || left.max >= node.val || node.val >= right.min) {
            // Size and range are junk here: the parent sees the false
            // flag first and never reads them.
            return new Report(false, 0, 0, 0);
        }
        int size = 1 + left.size + right.size;
        return new Report(true, size, Math.min(node.val, left.min), Math.max(node.val, right.max));
    }

    // A subtree's verdict: whether it is a BST, its size, and its range.
    private static class Report {

        final boolean bst;
        final int size;
        final int min;
        final int max;

        Report(boolean bst, int size, int min, int max) {
            this.bst = bst;
            this.size = size;
            this.min = min;
            this.max = max;
        }
    }

    // A node under judgement, accumulating its children's reports.
    private static class Frame {

        final TreeNode node;
        int state;
        Report left = EMPTY;
        Report right = EMPTY;

        Frame(TreeNode node) {
            this.node = node;
        }
    }
}
