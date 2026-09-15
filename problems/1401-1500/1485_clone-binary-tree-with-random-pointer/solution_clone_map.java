import java.util.HashMap;
import java.util.Map;

class Solution {

    private Map<RandomTreeNode, RandomTreeNode> copies = new HashMap<>();

    public RandomTreeNode copyRandomBinaryTree(RandomTreeNode root) {
        if (root == null) {
            return null;
        }
        RandomTreeNode existing = copies.get(root);
        if (existing != null) {
            return existing;
        }
        RandomTreeNode copy = new RandomTreeNode(root.val);
        copies.put(root, copy);
        copy.left = copyRandomBinaryTree(root.left);
        copy.right = copyRandomBinaryTree(root.right);
        copy.random = copyRandomBinaryTree(root.random);
        return copy;
    }
}
