import java.util.HashSet;
import java.util.Set;

class Solution {

    public int countDistinct(int[] nums, int k, int p) {
        // dedup by content: the comma-joined string identifies a subarray
        Set<String> seen = new HashSet<>();
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            // for each left endpoint i, extend j, tracking the running count of
            // elements divisible by p
            int divisible = 0;
            StringBuilder cur = new StringBuilder();
            for (int j = i; j < n; j++) {
                if (nums[j] % p == 0) divisible += 1;
                // the separator keeps [1,2] and [12] distinct
                if (cur.length() > 0) cur.append(',');
                cur.append(nums[j]);
                // over the limit: any longer extension stays over, so stop extending
                if (divisible > k) break;
                seen.add(cur.toString());
            }
        }
        return seen.size();
    }
}
