import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int minimumOperations(TreeNode root) {
        if (root == null) return 0;
        int total = 0;
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> level = new ArrayList<>();
            for (int s = 0; s < size; s++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
            // Minimum swaps to sort this level = sum of (cycle length - 1).
            List<Integer> target = new ArrayList<>(level);
            java.util.Collections.sort(target);
            Map<Integer, Integer> pos = new HashMap<>();
            for (int i = 0; i < level.size(); i++) pos.put(level.get(i), i);
            boolean[] visited = new boolean[level.size()];
            for (int i = 0; i < level.size(); i++) {
                if (visited[i] || level.get(i).intValue() == target.get(i).intValue()) {
                    visited[i] = true;
                    continue;
                }
                int j = i;
                int cycle = 0;
                while (!visited[j]) {
                    visited[j] = true;
                    cycle++;
                    j = pos.get(target.get(j));
                }
                total += cycle - 1;
            }
        }
        return total;
    }
}
