import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] postorder(Node root) {
        List<Integer> out = new ArrayList<>();
        if (root != null) {
            Deque<Object[]> stack = new ArrayDeque<>();
            stack.push(new Object[] { root, 0 });
            while (!stack.isEmpty()) {
                Object[] frame = stack.peek();
                Node node = (Node) frame[0];
                int index = (Integer) frame[1];
                if (index < node.children.size()) {
                    frame[1] = index + 1;
                    stack.push(new Object[] { node.children.get(index), 0 });
                } else {
                    out.add(node.val);
                    stack.pop();
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
