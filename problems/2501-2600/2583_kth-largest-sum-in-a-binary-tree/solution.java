import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public long kthLargestLevelSum(TreeNode root, int k) {
        // One breadth-first sweep, consuming exactly the current batch
        // before its children join the queue — never recursion, since a
        // degenerate tree runs 10^5 nodes deep. A level holds at most
        // 10^5 nodes worth up to 10^6 each, so sums reach 10^11 and
        // outgrow int: they accumulate in long.
        List<Long> sums = new ArrayList<>();
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            long total = 0;
            int size = queue.size();
            for (int i = 0; i < size; ++i) {
                TreeNode node = queue.poll();
                total += node.val;
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
            sums.add(total);
        }
        if (sums.size() < k) return -1L;
        sums.sort((a, b) -> Long.compare(b, a));
        return sums.get(k - 1);
    }
}
