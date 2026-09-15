import java.util.HashMap;
import java.util.Map;

class Solution {

    public int minOperations(int[] nums) {
        // Pointer + counts: counts tracks the remaining suffix,
        // duplicated how many distinct values it still holds twice or
        // more. While the suffix has a duplicate, one operation advances
        // the pointer by three and refreshes only those three values (the
        // last, possibly shorter, operation removes whatever is left).
        Map<Integer, Integer> counts = new HashMap<>();
        for (int v : nums) {
            counts.merge(v, 1, Integer::sum);
        }
        int duplicated = 0;
        for (int c : counts.values()) {
            if (c >= 2) {
                duplicated++;
            }
        }
        int i = 0;
        int ops = 0;
        int n = nums.length;
        while (i < n && duplicated > 0) {
            for (int j = i; j < Math.min(i + 3, n); j++) {
                int c = counts.merge(nums[j], -1, Integer::sum);
                if (c == 1) {
                    duplicated--;
                }
            }
            i += 3;
            ops++;
        }
        return ops;
    }
}
