import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int longestUnivaluePath(TreeNode root) {
        // A same-value path reaches some highest node and falls into at most
        // two arms, so every node can summarize its subtree in one number:
        // the length, in edges, of the longest downward path of its own
        // value leaving it. Arms are settled children-first and a running
        // maximum over all bend points — the sum of a node's two arms — is
        // the answer. The walk carries its own stack: the constraints allow
        // a 1000-deep same-value chain, and recursion would nest a thousand
        // frames — past CPython's default limit and over the 512k stacks
        // the judge hands Java and Node.
        List<TreeNode> order = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        if (root != null) {
            stack.push(root);
        }
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            order.add(node);
            if (node.left != null) stack.push(node.left);
            if (node.right != null) stack.push(node.right);
        }

        // Pre-order collection puts every parent before its descendants, so
        // the reversed walk is post-order: a node's children's arms are
        // always already in the map when it looks them up.
        Map<TreeNode, Integer> arms = new HashMap<>();
        int best = 0;
        for (int index = order.size() - 1; index >= 0; --index) {
            TreeNode node = order.get(index);
            int left = node.left != null && node.left.val == node.val ? arms.get(node.left) + 1 : 0;
            int right = node.right != null && node.right.val == node.val ? arms.get(node.right) + 1 : 0;
            arms.put(node, Math.max(left, right));
            best = Math.max(best, left + right);
        }
        return best;
    }
}
