import java.util.HashMap;
import java.util.Map;

class Solution {

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        // Value -> inorder index: makes each split lookup O(1) instead of a
        // linear scan. Values are unique, so a hit is exactly one split point.
        Map<Integer, Integer> index = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            index.put(inorder[i], i);
        }
        // Single shared cursor consuming preorder strictly left to right,
        // one value per recursive call (a 1-element array so `build` can
        // mutate it across recursion).
        int[] position = { 0 };
        return build(preorder, index, position, 0, inorder.length);
    }

    private TreeNode build(int[] preorder, Map<Integer, Integer> index, int[] position, int low, int high) {
        // Empty inorder range <=> missing child, so base cases need no
        // special casing.
        if (low >= high) {
            return null;
        }
        // The first unconsumed preorder value is the root of this subtree:
        // preorder lists root, then the whole left subtree, then the right
        // -- exactly the order the recursion asks for root values.
        int value = preorder[position[0]];
        position[0]++;
        TreeNode node = new TreeNode(value);
        int mid = index.get(value);
        // Inorder visits left, root, right: [low, mid) is the left
        // subtree and [mid + 1, high) the right.
        node.left = build(preorder, index, position, low, mid);
        node.right = build(preorder, index, position, mid + 1, high);
        return node;
    }
}
