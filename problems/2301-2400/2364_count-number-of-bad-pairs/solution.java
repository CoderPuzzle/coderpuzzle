import java.util.HashMap;
import java.util.Map;

class Solution {

    public long countBadPairs(int[] nums) {
        // j - i != nums[j] - nums[i] rearranges to nums[j] - j !=
        // nums[i] - i: a pair is good exactly when the shifted values match.
        // Count good pairs per shifted value, subtract from all pairs; pair
        // counts reach ~5e9, so run the arithmetic in 64 bits.
        Map<Integer, Long> counts = new HashMap<>();
        long good = 0;
        for (int i = 0; i < nums.length; ++i) {
            int shifted = nums[i] - i;
            good += counts.getOrDefault(shifted, 0L);
            counts.merge(shifted, 1L, Long::sum);
        }
        long n = nums.length;
        return (n * (n - 1)) / 2 - good;
    }
}
