import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int longestArithSeqLength(int[] nums) {
        int n = nums.length;
        List<Map<Integer, Integer>> dp = new ArrayList<>(n);
        int best = 1;
        for (int i = 0; i < n; i++) {
            Map<Integer, Integer> cur = new HashMap<>();
            for (int j = 0; j < i; j++) {
                int d = nums[i] - nums[j];
                Integer prev = dp.get(j).get(d);
                int length = (prev == null ? 1 : prev) + 1;
                Integer existing = cur.get(d);
                if (existing == null || length > existing) {
                    cur.put(d, length);
                    if (length > best) {
                        best = length;
                    }
                }
            }
            dp.add(cur);
        }
        return best;
    }
}
