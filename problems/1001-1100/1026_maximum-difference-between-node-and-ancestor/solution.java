import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    private static final class Frame {

        final TreeNode node;
        final int pathMin;
        final int pathMax;

        Frame(TreeNode node, int pathMin, int pathMax) {
            this.node = node;
            this.pathMin = pathMin;
            this.pathMax = pathMax;
        }
    }

    public int maxAncestorDiff(TreeNode root) {
        // Loop invariant: each frame holds a node plus the minimum and
        // maximum values seen among its strict ancestors — the node's own
        // value is not folded in yet.
        Deque<Frame> stack = new ArrayDeque<>();
        stack.push(new Frame(root, root.val, root.val));
        int ans = 0;
        while (!stack.isEmpty()) {
            Frame top = stack.pop();
            // The best pairing for this node always uses one of the two
            // running extremes above it: any other ancestor value lies
            // between pathMin and pathMax, so it can never beat both.
            ans = Math.max(ans, Math.max(Math.abs(top.node.val - top.pathMin), Math.abs(top.node.val - top.pathMax)));
            int newMin = Math.min(top.pathMin, top.node.val);
            int newMax = Math.max(top.pathMax, top.node.val);
            if (top.node.left != null) stack.push(new Frame(top.node.left, newMin, newMax));
            if (top.node.right != null) stack.push(new Frame(top.node.right, newMin, newMax));
        }
        return ans;
    }
}
