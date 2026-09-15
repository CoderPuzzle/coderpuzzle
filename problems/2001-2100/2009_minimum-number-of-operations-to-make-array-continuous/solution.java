import java.util.Arrays;

class Solution {

    public int minOperations(int[] nums) {
        int length = nums.length;
        Arrays.sort(nums);

        int[] values = new int[length];
        int uniqueCount = 0;
        for (int value : nums) {
            if (uniqueCount == 0 || values[uniqueCount - 1] != value) {
                values[uniqueCount++] = value;
            }
        }

        int left = 0;
        int kept = 0;
        for (int right = 0; right < uniqueCount; ++right) {
            while ((long) values[right] - values[left] >= length) {
                ++left;
            }
            kept = Math.max(kept, right - left + 1);
        }

        return length - kept;
    }
}
