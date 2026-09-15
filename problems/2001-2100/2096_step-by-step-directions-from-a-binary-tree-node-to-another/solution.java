import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public String getDirections(TreeNode root, int startValue, int destValue) {
        Map<Integer, Integer> parent = new HashMap<>();
        Map<Integer, Character> incoming = new HashMap<>();
        parent.put(root.val, 0);
        ArrayDeque<TreeNode> stack = new ArrayDeque<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node.left != null) {
                parent.put(node.left.val, node.val);
                incoming.put(node.left.val, 'L');
                stack.push(node.left);
            }
            if (node.right != null) {
                parent.put(node.right.val, node.val);
                incoming.put(node.right.val, 'R');
                stack.push(node.right);
            }
        }

        Map<Integer, Integer> distance = new HashMap<>();
        int node = startValue;
        int steps = 0;
        while (node != 0) {
            distance.put(node, steps++);
            node = parent.get(node);
        }

        StringBuilder downward = new StringBuilder();
        node = destValue;
        while (!distance.containsKey(node)) {
            downward.append(incoming.get(node));
            node = parent.get(node);
        }
        return "U".repeat(distance.get(node)) + downward.reverse();
    }
}
