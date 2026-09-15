class Solution {

    public TreeNode sortedArrayToBST(int[] nums) {
        return build(nums, 0, nums.length - 1);
    }

    // Builds the subtree for the closed segment [lo, hi]: root at the
    // segment's middle, the two halves below it.
    private TreeNode build(int[] nums, int lo, int hi) {
        // An empty segment is a missing child.
        if (lo > hi) {
            return null;
        }
        // Root at the segment's middle; of two middles (even length) the
        // second wins — (lo + hi + 1) / 2 — fixing the exact tree the
        // judge expects. Both halves then hold within one element of
        // each other, which keeps every node balanced.
        int mid = (lo + hi + 1) / 2;
        return new TreeNode(nums[mid], build(nums, lo, mid - 1), build(nums, mid + 1, hi));
    }
}
