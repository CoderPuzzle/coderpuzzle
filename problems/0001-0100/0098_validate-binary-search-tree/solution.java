import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    // frame pairs a subtree with the open interval (lo, hi) it is confined to.
    // Bounds are long, not int: node values reach the int32 extremes, so the
    // initial interval must be strictly wider than any value can be.
    private record Frame(TreeNode node, long lo, long hi) {}

    public boolean isValidBST(TreeNode root) {
        // Preorder with an explicit stack — the same shape in every language,
        // chosen because recursion would overflow Python's call-stack limit
        // on a 10'000-node chain.
        Deque<Frame> stack = new ArrayDeque<>();
        stack.push(new Frame(root, Long.MIN_VALUE, Long.MAX_VALUE));
        while (!stack.isEmpty()) {
            Frame frame = stack.pop();
            if (frame.node() == null) {
                // An empty subtree satisfies every bound vacuously.
                continue;
            }
            // Strict on both sides: equal keys falsify a BST.
            if (frame.lo() >= frame.node().val || frame.node().val >= frame.hi()) {
                return false;
            }
            stack.push(new Frame(frame.node().left, frame.lo(), frame.node().val));
            stack.push(new Frame(frame.node().right, frame.node().val, frame.hi()));
        }
        return true;
    }
}
