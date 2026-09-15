import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int findSecondMinimumValue(TreeNode root) {
        // The min property makes root.val the minimum of the whole tree:
        // a parent is the smaller of its children, so every value below
        // the root is >= the root's own. The second minimum is therefore
        // the smallest value strictly greater than root.val. The walk
        // descends only through nodes that still carry the root's value —
        // a node with a larger value is itself the best its whole subtree
        // can offer (everything beneath it is at least as large), so it
        // is taken as a candidate and its subtree is pruned. best starts
        // at -1, which no node value can equal (values are >= 1), so it
        // doubles as the fallback answer.
        int rootValue = root.val;
        int best = -1;
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node.val == rootValue) {
                // 0 or 2 children: one null check settles both pushes.
                if (node.left != null) {
                    stack.push(node.left);
                    stack.push(node.right);
                }
            } else if (best == -1 || node.val < best) {
                best = node.val;
            }
        }
        return best;
    }
}
