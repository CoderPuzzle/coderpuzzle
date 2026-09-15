import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public List<TreeNode> allPossibleFBT(int n) {
        // A full tree's node count is odd: the root alone is 1, and every
        // internal node adds a pair. An even n therefore admits no tree.
        if (n % 2 == 0) {
            return new ArrayList<>();
        }
        return build(n, new HashMap<>());
    }

    private List<TreeNode> build(int count, Map<Integer, List<TreeNode>> memo) {
        if (count == 1) {
            List<TreeNode> leaf = new ArrayList<>();
            leaf.add(new TreeNode(0));
            return leaf;
        }
        List<TreeNode> done = memo.get(count);
        if (done != null) {
            return done;
        }
        // The root is fixed; a tree of `count` nodes is a choice of left
        // shape times right shape over every odd split of count - 1 —
        // left sizes ascending, left shapes outermost, exactly the order
        // the statement pins. Subtrees are shared, not copied: emitting
        // a tree links two memoized shapes.
        List<TreeNode> trees = new ArrayList<>();
        for (int leftCount = 1; leftCount < count - 1; leftCount += 2) {
            for (TreeNode left : build(leftCount, memo)) {
                for (TreeNode right : build(count - 1 - leftCount, memo)) {
                    trees.add(new TreeNode(0, left, right));
                }
            }
        }
        memo.put(count, trees);
        // The recursion steps count down by 2, so it nests at most
        // n / 2 + 1 frames deep — 11 at the constraint's n = 20.
        return trees;
    }
}
