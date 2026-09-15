import java.util.HashMap;
import java.util.Map;

class Solution {

    public int rob(TreeNode root) {
        // Two independent questions per subtree, each with its own memo
        // table: the best with the root chosen, and the best with the root
        // barred. Asking them separately can re-descend a subtree, but the
        // tables make sure each question is settled once per node.
        Map<TreeNode, Integer> takeMap = new HashMap<>();
        Map<TreeNode, Integer> skipMap = new HashMap<>();
        return Math.max(take(root, takeMap, skipMap), skip(root, takeMap, skipMap));
    }

    private int take(TreeNode node, Map<TreeNode, Integer> takeMap, Map<TreeNode, Integer> skipMap) {
        if (node == null) {
            return 0;
        }
        Integer cached = takeMap.get(node);
        if (cached != null) {
            return cached;
        }
        // Taking this node bars both children outright.
        int best = node.val + skip(node.left, takeMap, skipMap) + skip(node.right, takeMap, skipMap);
        takeMap.put(node, best);
        return best;
    }

    private int skip(TreeNode node, Map<TreeNode, Integer> takeMap, Map<TreeNode, Integer> skipMap) {
        if (node == null) {
            return 0;
        }
        Integer cached = skipMap.get(node);
        if (cached != null) {
            return cached;
        }
        // Each child keeps its better option.
        int best =
            Math.max(take(node.left, takeMap, skipMap), skip(node.left, takeMap, skipMap)) +
            Math.max(take(node.right, takeMap, skipMap), skip(node.right, takeMap, skipMap));
        skipMap.put(node, best);
        return best;
    }
}
