import java.util.HashMap;
import java.util.Map;

class Solution {

    public long numberOfPairs(int[] nums1, int[] nums2, int k) {
        int highest = 0;
        for (int num : nums1) {
            highest = Math.max(highest, num);
        }
        int[] counts1 = new int[highest + 1];
        for (int num : nums1) {
            counts1[num]++;
        }
        Map<Integer, Long> counts2 = new HashMap<>();
        for (int num : nums2) {
            counts2.merge(num, 1L, Long::sum);
        }
        long total = 0;
        for (Map.Entry<Integer, Long> entry : counts2.entrySet()) {
            long step = (long) entry.getKey() * k;
            if (step > highest) {
                continue;
            }
            long divisible = 0;
            for (long value = step; value <= highest; value += step) {
                divisible += counts1[(int) value];
            }
            total += entry.getValue() * divisible;
        }
        return total;
    }
}
