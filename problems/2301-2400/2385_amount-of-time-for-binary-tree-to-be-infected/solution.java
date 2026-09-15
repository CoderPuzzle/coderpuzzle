import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    // Infection crosses one edge per minute in both directions, so the
    // answer is the maximum distance from `start` once parent edges are
    // added. BFS layers off an adjacency map measure it.
    public int amountOfTime(TreeNode root, int start) {
        Map<Integer, List<Integer>> adj = new HashMap<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node == null) {
                continue;
            }
            if (node.left != null) {
                adj.computeIfAbsent(node.val, k -> new ArrayList<>()).add(node.left.val);
                adj.computeIfAbsent(node.left.val, k -> new ArrayList<>()).add(node.val);
                stack.push(node.left);
            }
            if (node.right != null) {
                adj.computeIfAbsent(node.val, k -> new ArrayList<>()).add(node.right.val);
                adj.computeIfAbsent(node.right.val, k -> new ArrayList<>()).add(node.val);
                stack.push(node.right);
            }
        }
        Set<Integer> seen = new HashSet<>();
        seen.add(start);
        List<Integer> frontier = new ArrayList<>(List.of(start));
        int minutes = 0;
        while (!frontier.isEmpty()) {
            List<Integer> next = new ArrayList<>();
            for (int u : frontier) {
                for (int v : adj.getOrDefault(u, List.of())) {
                    if (seen.add(v)) {
                        next.add(v);
                    }
                }
            }
            if (next.isEmpty()) {
                break;
            }
            ++minutes;
            frontier = next;
        }
        return minutes;
    }
}
