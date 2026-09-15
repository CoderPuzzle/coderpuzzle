class Solution {

    public int minOperations(int[] nums) {
        // Adding k to a prefix touches exactly one adjacent difference: the
        // one straddling the prefix's end. A whole-array prefix shifts
        // every element equally and a difference can be zeroed by picking
        // k as that difference, so each operation removes at most one
        // nonzero adjacent difference - and every nonzero one is removable.
        int count = 0;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i - 1]) {
                count++;
            }
        }
        return count;
    }
}
