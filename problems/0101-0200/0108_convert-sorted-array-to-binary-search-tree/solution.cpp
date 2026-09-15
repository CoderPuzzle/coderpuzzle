class Solution {
  public:
    TreeNode *sortedArrayToBST(vector<int> &nums) { return build(nums, 0, (int)nums.size() - 1); }

  private:
    // Builds the subtree for the closed segment [lo, hi]: root at the
    // segment's middle, the two halves below it.
    TreeNode *build(vector<int> &nums, int lo, int hi) {
        // An empty segment is a missing child.
        if (lo > hi) {
            return nullptr;
        }
        // Root at the segment's middle; of two middles (even length) the
        // second wins — (lo + hi + 1) / 2 — fixing the exact tree the
        // judge expects. Both halves then hold within one element of
        // each other, which keeps every node balanced.
        int mid = (lo + hi + 1) / 2;
        TreeNode *root = new TreeNode(nums[mid]);
        root->left = build(nums, lo, mid - 1);
        root->right = build(nums, mid + 1, hi);
        return root;
    }
};
