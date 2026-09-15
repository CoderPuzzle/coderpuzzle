import java.util.Arrays;

class Solution {

    public int largestInteger(int[] nums, int k) {
        // One counter per possible value (0..50): how many distinct windows
        // of size k contain it.
        int[] count = new int[51];
        int[] stamp = new int[51];
        Arrays.fill(stamp, -1);
        for (int start = 0; start + k <= nums.length; ++start) {
            // Dedup inside the window with a stamp: a value repeated within
            // one window still counts once there.
            for (int i = start; i < start + k; ++i) {
                if (stamp[nums[i]] != start) {
                    stamp[nums[i]] = start;
                    ++count[nums[i]];
                }
            }
        }
        // Scan down from the largest possible value: first hit wins.
        for (int value = 50; value >= 0; --value) {
            if (count[value] == 1) {
                return value;
            }
        }
        return -1;
    }
}
