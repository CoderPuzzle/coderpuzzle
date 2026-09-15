#include <vector>

class Solution {
  public:
    vector<TreeNode *> allPossibleFBT(int n) {
        // A full tree's node count is odd: the root alone is 1, and every
        // internal node adds a pair. An even n therefore admits no tree.
        if (n % 2 == 0) {
            return {};
        }
        // One memo slot per node count, shared across the recursion: every
        // subtree size recurs many times (each split of 19 asks for the
        // same shapes of 1, 3, 5, ...), so each list is built once.
        vector<vector<TreeNode *>> memo(n + 1);
        return build(n, memo);
    }

  private:
    vector<TreeNode *> build(int count, vector<vector<TreeNode *>> &memo) {
        if (count == 1) {
            return {new TreeNode(0)};
        }
        if (!memo[count].empty()) {
            return memo[count];
        }
        // The root is fixed; a tree of `count` nodes is a choice of left
        // shape times right shape over every odd split of count - 1 —
        // left sizes ascending, left shapes outermost, exactly the order
        // the statement pins. Subtrees are shared, not copied: emitting a
        // tree links two memoized shapes. The recursion steps count down
        // by 2, so it nests at most n / 2 + 1 frames — 11 at n = 20.
        vector<TreeNode *> trees;
        for (int leftCount = 1; leftCount < count - 1; leftCount += 2) {
            for (TreeNode *left : build(leftCount, memo)) {
                for (TreeNode *right : build(count - 1 - leftCount, memo)) {
                    TreeNode *root = new TreeNode(0);
                    root->left = left;
                    root->right = right;
                    trees.push_back(root);
                }
            }
        }
        memo[count] = trees;
        return trees;
    }
};
