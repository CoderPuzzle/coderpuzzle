import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public boolean leafSimilar(TreeNode root1, TreeNode root2) {
        // Two trees are leaf-similar exactly when their leaf value
        // sequences agree, so the whole question is writing each sequence
        // down and comparing them.
        return leafValues(root1).equals(leafValues(root2));
    }

    // The walk carries an explicit stack: pop a node, record its value
    // when both children are missing — that node is a leaf — otherwise
    // push the right child and then the left, so the left subtree is
    // always the next to pop and the values come out in left-to-right
    // order. Only leaves are recorded, so internal values and the shapes
    // above the leaves never enter the comparison; an exhausted stack
    // means the sequence is complete.
    private List<Integer> leafValues(TreeNode root) {
        List<Integer> values = new ArrayList<>();
        Deque<TreeNode> pending = new ArrayDeque<>();
        pending.push(root);
        while (!pending.isEmpty()) {
            TreeNode node = pending.pop();
            if (node.left == null && node.right == null) {
                values.add(node.val);
                continue;
            }
            if (node.right != null) pending.push(node.right);
            if (node.left != null) pending.push(node.left);
        }
        return values;
    }
}
