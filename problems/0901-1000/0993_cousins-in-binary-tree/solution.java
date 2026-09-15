import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    // frame pairs a subtree with the depth it sits at and the value of its
    // parent (0 for the root: no node value is 0, and the root is alone at
    // depth 0, so the sentinel can never collide).
    private record Frame(TreeNode node, int depth, int parent) {}

    public boolean isCousins(TreeNode root, int x, int y) {
        // Cousinhood is a fact about two coordinates, not about either node
        // alone: the depth a node sits at and the parent it hangs from. One
        // descent — an explicit stack of frames — records both coordinates
        // for the nodes valued x and y, and stops the moment the second of
        // them is met. The verdict then reads straight off the records:
        // same depth, different parents.
        int depthX = -1;
        int depthY = -1;
        int parentX = 0;
        int parentY = 0;
        Deque<Frame> pending = new ArrayDeque<>();
        pending.push(new Frame(root, 0, 0));
        while (!pending.isEmpty()) {
            Frame frame = pending.pop();
            if (frame.node() == null) {
                continue;
            }
            if (frame.node().val == x) {
                depthX = frame.depth();
                parentX = frame.parent();
            } else if (frame.node().val == y) {
                depthY = frame.depth();
                parentY = frame.parent();
            }
            if (depthX >= 0 && depthY >= 0) {
                break;
            }
            pending.push(new Frame(frame.node().right, frame.depth() + 1, frame.node().val));
            pending.push(new Frame(frame.node().left, frame.depth() + 1, frame.node().val));
        }
        return depthX == depthY && parentX != parentY;
    }
}
