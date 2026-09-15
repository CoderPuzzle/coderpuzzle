/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
    // Builds the subtree for the closed segment [lo, hi]: root at the
    // segment's middle, the two halves below it.
    function build(lo, hi) {
        // An empty segment is a missing child.
        if (lo > hi) {
            return null;
        }
        // Root at the segment's middle; of two middles (even length) the
        // second wins — (lo + hi + 1) / 2 — fixing the exact tree the
        // judge expects. Both halves then hold within one element of
        // each other, which keeps every node balanced.
        const mid = Math.floor((lo + hi + 1) / 2);
        const root = new TreeNode(nums[mid]);
        root.left = build(lo, mid - 1);
        root.right = build(mid + 1, hi);
        return root;
    }
    return build(0, nums.length - 1);
};
