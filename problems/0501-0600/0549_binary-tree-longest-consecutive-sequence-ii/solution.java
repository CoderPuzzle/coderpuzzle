import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int longestConsecutive(TreeNode root) {
        // Post-order, one pass: every node reports the pair of runs that
        // top out at it — the longest whose values step +1 downward away
        // from the node (inc) and the longest stepping -1 (dec). A child
        // valued exactly node.val + 1 extends inc with its own inc, one
        // valued node.val - 1 extends dec, and any other child extends
        // nothing. A valid path is monotone, so it turns at exactly one
        // node — the topmost node of the path, one arm descending into
        // each child subtree — and its length there is inc + dec - 1;
        // the answer is the maximum of that over all nodes. The
        // traversal carries its own stack of frames: the tree may be a
        // single 3*10^4-node chain, whose pass nests 30000 calls — far
        // past what this judge's 512k Java thread stack could hold.
        int best = 0;
        // Frame = a node, which child remains to visit (0 = left pending,
        // 1 = right pending, 2 = ready to judge), and the two child runs
        // already collected.
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
                Run run = judge(frame);
                if (run.inc + run.dec - 1 > best) {
                    best = run.inc + run.dec - 1;
                }
                if (!stack.isEmpty()) {
                    Frame parent = stack.peek();
                    if (parent.state == 1) {
                        parent.left = run;
                    } else {
                        parent.right = run;
                    }
                }
            }
        }
        return best;
    }

    // An absent child is a run of length 0; a real run always has
    // inc >= 1, so the 0 flags it.
    private static final Run EMPTY = new Run(0, 0, 0);

    // Judge one node from the two runs its children produced: each child
    // whose value is exactly one step out extends the matching run by
    // that child's own.
    private static Run judge(Frame frame) {
        TreeNode node = frame.node;
        int inc = 1;
        int dec = 1;
        if (frame.left.inc > 0) {
            if (frame.left.val == node.val + 1 && frame.left.inc + 1 > inc) {
                inc = frame.left.inc + 1;
            }
            if (frame.left.val == node.val - 1 && frame.left.dec + 1 > dec) {
                dec = frame.left.dec + 1;
            }
        }
        if (frame.right.inc > 0) {
            if (frame.right.val == node.val + 1 && frame.right.inc + 1 > inc) {
                inc = frame.right.inc + 1;
            }
            if (frame.right.val == node.val - 1 && frame.right.dec + 1 > dec) {
                dec = frame.right.dec + 1;
            }
        }
        return new Run(inc, dec, node.val);
    }

    // The runs topping out at a node — the longest +1-downward and the
    // longest -1-downward — together with that node's value.
    private static class Run {

        final int inc;
        final int dec;
        final int val;

        Run(int inc, int dec, int val) {
            this.inc = inc;
            this.dec = dec;
            this.val = val;
        }
    }

    // A node under judgement, accumulating its children's runs.
    private static class Frame {

        final TreeNode node;
        int state;
        Run left = EMPTY;
        Run right = EMPTY;

        Frame(TreeNode node) {
            this.node = node;
        }
    }
}
