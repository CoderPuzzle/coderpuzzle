import java.util.HashMap;
import java.util.Map;

class Solution {

    public long maxSubarraySum(int[] nums) {
        int n = nums.length;
        // Deleting the only element is forbidden, so its value stands.
        if (n == 1) return nums[0];
        // Per-candidate account: smallest adjusted prefix P(j) minus the |x|'s
        // deleted after j. Key 0 is the plain no-deletion prefix minimum.
        // prefixMap keyed by the deleted value; key 0L tracks min prefix sum.
        Map<Long, Long> prefixMap = new HashMap<>();
        prefixMap.put(0L, 0L);
        long prefixSum = 0;
        long minPrefix = 0;
        // Seeded with nums[0] so all-negative arrays need no zero sentinel.
        long result = nums[0];
        for (int num : nums) {
            prefixSum += num;
            // Best subarray ending at r: P(r) minus the smallest adjusted prefix
            // seen so far. Runs before num joins any account, so every anchor
            // strictly precedes r and the subarray is never empty.
            if (prefixSum - minPrefix > result) result = prefixSum - minPrefix;
            // Only a negative x can help: deleting a positive would only
            // shrink every subarray sum.
            if (num < 0) {
                // Anchor at min(old account, plain prefix min) and subtract |x|
                // again: the deletion window may restart at this occurrence.
                long p0 = prefixMap.get(0L);
                long val;
                Long prev = prefixMap.get((long) num);
                if (prev != null) {
                    val = Math.min(p0, prev) + num;
                } else {
                    val = p0 + num;
                }
                prefixMap.put((long) num, val);
                if (val < minPrefix) minPrefix = val;
            }
            if (prefixSum < prefixMap.get(0L)) prefixMap.put(0L, prefixSum);
            if (prefixMap.get(0L) < minPrefix) minPrefix = prefixMap.get(0L);
        }
        return result;
    }
}
