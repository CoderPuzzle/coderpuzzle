import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

// Definition for a binary tree node is provided by the judge.

class Solution {

    private record Frame(TreeNode node, boolean visited) {}

    public int averageOfSubtree(TreeNode root) {
        Deque<Frame> stack = new ArrayDeque<>();
        stack.push(new Frame(root, false));
        Map<TreeNode, Long> sums = new HashMap<>();
        Map<TreeNode, Integer> sizes = new HashMap<>();
        int count = 0;
        while (!stack.isEmpty()) {
            Frame frame = stack.pop();
            TreeNode node = frame.node();
            if (node == null) {
                continue;
            }
            if (frame.visited()) {
                long s = node.val;
                int n = 1;
                if (node.left != null) {
                    s += sums.get(node.left);
                    n += sizes.get(node.left);
                }
                if (node.right != null) {
                    s += sums.get(node.right);
                    n += sizes.get(node.right);
                }
                sums.put(node, s);
                sizes.put(node, n);
                if (s / n == node.val) {
                    count++;
                }
            } else {
                stack.push(new Frame(node, true));
                if (node.left != null) {
                    stack.push(new Frame(node.left, false));
                }
                if (node.right != null) {
                    stack.push(new Frame(node.right, false));
                }
            }
        }
        return count;
    }
}
