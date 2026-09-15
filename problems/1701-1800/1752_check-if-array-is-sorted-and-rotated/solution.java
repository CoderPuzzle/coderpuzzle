class Solution {

    public boolean check(int[] nums) {
        // Read the array as a ring: a sorted-then-rotated array
        // descends at most once, at the rotation seam.
        int n = nums.length;
        int descents = 0;
        for (int i = 0; i < n; i++) {
            if (nums[i] > nums[(i + 1) % n]) {
                descents++;
                if (descents > 1) {
                    return false;
                }
            }
        }
        return true;
    }
}
