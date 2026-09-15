class Solution {

    // Every bit set in any element appears in exactly half of the 2^n
    // subsets, so the answer is (OR of all elements) * 2^(n-1).
    public int subsetXORSum(int[] nums) {
        int orAll = 0;
        for (int v : nums) {
            orAll |= v;
        }
        return orAll << (nums.length - 1);
    }
}
