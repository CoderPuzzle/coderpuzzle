class Solution {
  public:
    long long maxSumBST(TreeNode *root) {
        best = 0;
        long long lo, hi, sum;
        dfs(root, lo, hi, sum);
        return best;
    }

  private:
    long long best;

    // returns false if the subtree is not a BST; otherwise fills
    // (lo, hi, sum) with the subtree minimum, maximum and total.
    // An empty subtree yields lo = LLONG_MAX, hi = LLONG_MIN, sum = 0.
    bool dfs(TreeNode *node, long long &lo, long long &hi, long long &sum) {
        if (node == nullptr) {
            lo = LLONG_MAX;
            hi = LLONG_MIN;
            sum = 0;
            return true;
        }
        long long llo, lhi, lsum;
        bool lok = dfs(node->left, llo, lhi, lsum);
        long long rlo, rhi, rsum;
        bool rok = dfs(node->right, rlo, rhi, rsum);
        if (!lok || !rok) {
            return false;
        }
        long long v = node->val;
        if (lhi >= v || rlo <= v) {
            return false;
        }
        sum = lsum + rsum + v;
        lo = min(llo, v);
        hi = max(rhi, v);
        if (sum > best) {
            best = sum;
        }
        return true;
    }
};
