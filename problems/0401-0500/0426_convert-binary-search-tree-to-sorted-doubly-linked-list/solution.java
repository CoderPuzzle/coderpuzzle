import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public NodeWithNext treeToDoublyList(TreeNode root) {
        List<Integer> values = new ArrayList<>();
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode node = root;
        while (!stack.isEmpty() || node != null) {
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
            node = stack.pop();
            values.add(node.val);
            node = node.right;
        }
        List<NodeWithNext> nodes = new ArrayList<>();
        for (int value : values) nodes.add(new NodeWithNext(value));
        for (int index = 0; index + 1 < nodes.size(); ++index) {
            nodes.get(index).right = nodes.get(index + 1);
            nodes.get(index + 1).left = nodes.get(index);
        }
        if (nodes.isEmpty()) return null;
        NodeWithNext head = nodes.get(0);
        NodeWithNext tail = nodes.get(nodes.size() - 1);
        tail.right = head;
        head.left = tail;
        return head;
    }
}
