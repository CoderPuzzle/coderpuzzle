import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Codec {

    // Preorder codec with explicit null markers. The format is this
    // solution's own choice — the judge only requires that
    // deserialize(serialize(root)) rebuilds the same tree. Both directions
    // are iterative, so deep trees are safe.

    public String serialize(TreeNode root) {
        List<String> tokens = new ArrayList<>();
        // An ArrayList as the stack: ArrayDeque rejects nulls, and the
        // absent children are exactly what must be emitted as markers.
        List<TreeNode> stack = new ArrayList<>();
        stack.add(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.remove(stack.size() - 1);
            if (node == null) {
                tokens.add("#");
                continue;
            }
            tokens.add(Integer.toString(node.val));
            // Right goes on before left, so the left subtree is written
            // first.
            stack.add(node.right);
            stack.add(node.left);
        }
        // Closing markers tell the replay when a subtree ends, so unlike
        // the breadth-first form nothing here can be trimmed.
        return String.join(",", tokens);
    }

    public TreeNode deserialize(String data) {
        String[] tokens = data.split(",");
        if ("#".equals(tokens[0])) {
            return null;
        }
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Deque<Slot> pending = new ArrayDeque<>();
        // Open child slots replay preorder: the top slot takes the next
        // token, a marker fills it with nothing, a value makes a node that
        // fills it and opens two slots of its own (right before left).
        pending.push(new Slot(root, true));
        pending.push(new Slot(root, false));
        int index = 1;
        while (!pending.isEmpty()) {
            Slot slot = pending.pop();
            String token = tokens[index];
            index++;
            if ("#".equals(token)) {
                continue;
            }
            TreeNode child = new TreeNode(Integer.parseInt(token));
            if (slot.right) {
                slot.node.right = child;
            } else {
                slot.node.left = child;
            }
            pending.push(new Slot(child, true));
            pending.push(new Slot(child, false));
        }
        return root;
    }

    // A child position still waiting for its token.
    private static class Slot {

        final TreeNode node;
        final boolean right;

        Slot(TreeNode node, boolean right) {
            this.node = node;
            this.right = right;
        }
    }
}
