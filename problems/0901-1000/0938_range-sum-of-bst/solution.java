import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int rangeSumBST(TreeNode root, int low, int high) {
        // A node below low drags its whole left subtree below low with it,
        // so only its right subtree can hold hits; a node above high is
        // the mirror image; an in-window node counts and either subtree
        // may still hit. That three-way rule visits exactly the nodes that
        // can matter. The walk carries its own stack: the constraints
        // allow a 2*10^4-node chain, and recursion would nest twenty
        // thousand frames — past CPython's default limit and over the
        // 512k stacks the judge hands Java and Node.
        int total = 0;
        Deque<TreeNode> stack = new ArrayDeque<>();
        if (root != null) {
            stack.push(root);
        }
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            if (node.val < low) {
                if (node.right != null) stack.push(node.right);
            } else if (node.val > high) {
                if (node.left != null) stack.push(node.left);
            } else {
                total += node.val;
                if (node.left != null) stack.push(node.left);
                if (node.right != null) stack.push(node.right);
            }
        }
        return total;
    }
}
