import java.util.ArrayList;
import java.util.List;

class Solution {

    public List<TreeNode> splitBST(TreeNode root, int target) {
        // The split boundary is one root-to-null path: step right whenever
        // a node's value is at most target, left whenever it is greater.
        // Only the nodes on that path ever change children — every subtree
        // hanging off it keeps its parent, which is exactly the structure
        // preservation the statement demands.
        TreeNode small = new TreeNode();
        TreeNode large = new TreeNode();
        // Two dangling tails mark where the next path node on each side
        // must attach. A node <= target joins the first tree, and the next
        // small-side node on the path is always its right descendant, so
        // the tail advances to its freshly emptied right child; a node
        // > target mirrors this on the left. One walk, no recursion, two
        // sentinel nodes — the whole working set.
        TreeNode smallTail = small;
        TreeNode largeTail = large;
        TreeNode node = root;
        while (node != null) {
            if (node.val <= target) {
                TreeNode following = node.right;
                node.right = null;
                smallTail.right = node;
                smallTail = node;
                node = following;
            } else {
                TreeNode following = node.left;
                node.left = null;
                largeTail.left = node;
                largeTail = node;
                node = following;
            }
        }
        // An ArrayList, not List.of: either root may be null when every
        // node lands on one side, and the factory methods reject nulls.
        List<TreeNode> result = new ArrayList<>(2);
        result.add(small.right);
        result.add(large.left);
        return result;
    }
}
