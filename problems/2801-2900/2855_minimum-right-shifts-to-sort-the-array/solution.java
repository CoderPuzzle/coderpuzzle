class Solution {

    public int minimumRightShifts(int[] nums) {
        int n = nums.length;
        int descents = 0;
        int pivot = -1;
        for (int i = 0; i < n; ++i) {
            int next = (i + 1) % n;
            if (nums[i] > nums[next]) {
                ++descents;
                pivot = i;
            }
        }
        if (descents == 0) return 0;
        if (descents > 1) return -1;
        return n - 1 - pivot;
    }
}
