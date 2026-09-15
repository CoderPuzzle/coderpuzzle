import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] preorder(Node root) {
        List<Integer> out = new ArrayList<>();
        if (root != null) {
            Deque<Node> stack = new ArrayDeque<>();
            stack.push(root);
            while (!stack.isEmpty()) {
                Node node = stack.pop();
                out.add(node.val);
                for (int index = node.children.size() - 1; index >= 0; index--) {
                    stack.push(node.children.get(index));
                }
            }
        }
        int[] result = new int[out.size()];
        for (int index = 0; index < out.size(); index++) {
            result[index] = out.get(index);
        }
        return result;
    }
}
