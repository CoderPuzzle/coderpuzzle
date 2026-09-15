import java.util.Deque;
import java.util.LinkedList;

class Codec {

    // Preorder with null markers: the root's value, then its left subtree,
    // then its right, `x` for every absent child, joined by commas.
    public String serialize(TreeNode root) {
        StringBuilder out = new StringBuilder();
        // LinkedList, not ArrayDeque: absent children ride the stack as
        // nulls, which ArrayDeque rejects.
        Deque<TreeNode> stack = new LinkedList<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (out.length() > 0) out.append(',');
            if (node == null) {
                out.append('x');
            } else {
                out.append(node.val);
                stack.push(node.right);
                stack.push(node.left);
            }
        }
        return out.toString();
    }

    // The mirror build: each stack entry is a node with one open child slot
    // (left before right); a value fills the slot and opens two more, an
    // `x` just closes it.
    public TreeNode deserialize(String data) {
        String[] tokens = data.split(",", -1);
        if (tokens[0].equals("x")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));
        Deque<Open> stack = new LinkedList<>();
        stack.push(new Open(root, true));
        for (int index = 1; index < tokens.length; index++) {
            Open open = stack.pop();
            TreeNode child = tokens[index].equals("x") ? null : new TreeNode(Integer.parseInt(tokens[index]));
            if (open.wantsLeft) {
                open.node.left = child;
                stack.push(new Open(open.node, false));
            } else {
                open.node.right = child;
            }
            if (child != null) stack.push(new Open(child, true));
        }
        return root;
    }

    private static final class Open {

        final TreeNode node;
        final boolean wantsLeft;

        Open(TreeNode node, boolean wantsLeft) {
            this.node = node;
            this.wantsLeft = wantsLeft;
        }
    }
}
