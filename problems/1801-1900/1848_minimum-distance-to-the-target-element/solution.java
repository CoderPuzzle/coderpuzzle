class Solution {

    // One scan: the closest occurrence of target is whichever index
    // minimizes abs(i - start).
    public int getMinDistance(int[] nums, int target, int start) {
        int best = nums.length;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                best = Math.min(best, Math.abs(i - start));
            }
        }
        return best;
    }
}
