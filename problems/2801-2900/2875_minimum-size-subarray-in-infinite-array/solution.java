import java.util.HashMap;
import java.util.Map;

class Solution {

    // Splits target into k full copies plus a remainder: any n consecutive
    // elements of the infinite array sum to total, so a remainder hit is a
    // window of length < n with sum rem, and one doubled copy contains
    // every such window for every start phase. Prefix sums reach
    // 2 * sum(nums) = 2 * 10^10, past int range, so they accumulate in a
    // long; the answer itself stays below k * n + 2n <= target + 2 * 10^5
    // < 2^31.
    public int minSizeSubarray(int[] nums, int target) {
        long total = 0;
        for (final int v : nums) {
            total += v;
        }
        final int n = nums.length;
        final long k = target / total;
        final long rem = target % total;
        if (rem == 0) {
            return (int) (k * n);
        }
        Map<Long, Integer> first = new HashMap<>();
        first.put(0L, -1);
        long pre = 0;
        int best = -1;
        for (int i = 0; i < 2 * n; i++) {
            pre += nums[i % n];
            final Integer j = first.get(pre - rem);
            if (j != null && (best < 0 || i - j < best)) {
                best = i - j;
            }
            first.putIfAbsent(pre, i);
        }
        return best < 0 ? -1 : (int) (k * n + best);
    }
}
