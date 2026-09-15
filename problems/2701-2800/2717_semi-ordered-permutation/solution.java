import java.util.*;

class Solution {

    public int semiOrderedPermutation(int[] nums) {
        int n = nums.length;
        int i = 0;
        int j = 0;
        for (int k = 0; k < n; k++) {
            if (nums[k] == 1) {
                i = k;
            }
            if (nums[k] == n) {
                j = k;
            }
        }
        return i + (n - 1 - j) - (i > j ? 1 : 0);
    }
}
