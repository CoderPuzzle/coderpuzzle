import java.util.LinkedList;
import java.util.Queue;

class Solution {

    public boolean isCompleteTree(TreeNode root) {
        // Number the positions the way a heap numbers them — root at 1,
        // children of slot i at 2i and 2i+1. Polling the queue front-first
        // surfaces nodes in exactly slot order (absent children ride along
        // as null placeholders), so the first null polled is the first
        // unoccupied slot, and any real node after it sits beyond a hole
        // that completeness cannot afford. LinkedList, not ArrayDeque,
        // because the placeholders are null elements.
        Queue<TreeNode> pending = new LinkedList<>();
        pending.add(root);
        boolean gapSeen = false;
        while (!pending.isEmpty()) {
            TreeNode node = pending.poll();
            if (node == null) {
                gapSeen = true;
            } else if (gapSeen) {
                return false;
            } else {
                pending.add(node.left);
                pending.add(node.right);
            }
        }
        return true;
    }
}
