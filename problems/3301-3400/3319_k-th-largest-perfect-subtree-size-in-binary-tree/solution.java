import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int kthLargestPerfectSubtree(TreeNode root, int k) {
        // One BFS pass records the nodes; walking that list backwards
        // visits children before parents, so sizes propagate bottom-up
        // with no recursion — a chain can run 2000 nodes deep. info
        // holds the subtree size when the subtree is perfect, else 0: a
        // perfect internal node needs both children perfect with equal
        // sizes, and a leaf is perfect with size 1.
        List<TreeNode> order = new ArrayList<>();
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            order.add(node);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        Map<TreeNode, Integer> info = new HashMap<>();
        List<Integer> sizes = new ArrayList<>();
        for (int i = order.size() - 1; i >= 0; --i) {
            TreeNode node = order.get(i);
            if (node.left == null && node.right == null) {
                info.put(node, 1);
            } else if (node.left != null && node.right != null) {
                int left = info.get(node.left);
                int right = info.get(node.right);
                info.put(node, left > 0 && left == right ? 1 + left + right : 0);
            } else {
                info.put(node, 0);
            }
            if (info.get(node) > 0) sizes.add(info.get(node));
        }
        sizes.sort((a, b) -> b - a);
        return k <= sizes.size() ? sizes.get(k - 1) : -1;
    }
}
