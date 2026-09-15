import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public NodeWithNext inorderSuccessor(NodeWithNext tree, int node) {
        NodeWithNext target = null;
        Deque<NodeWithNext> stack = new ArrayDeque<>();
        if (tree != null) stack.push(tree);
        while (!stack.isEmpty() && target == null) {
            NodeWithNext current = stack.pop();
            if (current.val == node) target = current;
            if (current.left != null) stack.push(current.left);
            if (current.right != null) stack.push(current.right);
        }
        if (target == null) return null;
        if (target.right != null) {
            NodeWithNext successor = target.right;
            while (successor.left != null) successor = successor.left;
            return successor;
        }
        while (target.parent != null && target.parent.left != target) {
            target = target.parent;
        }
        return target.parent;
    }
}
