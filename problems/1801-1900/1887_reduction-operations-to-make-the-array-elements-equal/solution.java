import java.util.*;

class Solution {

    // Sorted ascending: crossing into a new (larger) distinct value
    // raises the level; element i costs its level = number of distinct
    // smaller values below it.
    public long reductionOperations(int[] nums) {
        Arrays.sort(nums);
        long ans = 0;
        int level = 0;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i - 1]) {
                level++;
            }
            ans += level;
        }
        return ans;
    }
}
