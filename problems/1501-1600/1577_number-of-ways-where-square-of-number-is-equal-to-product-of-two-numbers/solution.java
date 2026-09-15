import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int numTriplets(int[] nums1, int[] nums2) {
        long total = countType(nums1, nums2) + countType(nums2, nums1);
        return (int) total;
    }

    // Counts index pairs (j, k), j < k, in b whose product equals some
    // a[i]^2, summed over every i in a.
    private long countType(int[] a, int[] b) {
        Map<Long, Long> freq = new HashMap<>();
        for (int v : b) {
            freq.merge((long) v, 1L, Long::sum);
        }
        List<Long> distinct = new ArrayList<>(freq.keySet());
        distinct.sort(null);

        long total = 0;
        for (int x : a) {
            // Squares reach up to (1e5)^2 = 1e10, outside int range.
            long target = (long) x * x;
            for (long v : distinct) {
                if (v * v > target) {
                    break;
                }
                if (target % v != 0) {
                    continue;
                }
                long other = target / v;
                if (other == v) {
                    long c = freq.get(v);
                    total += (c * (c - 1)) / 2;
                } else if (freq.containsKey(other)) {
                    total += freq.get(v) * freq.get(other);
                }
            }
        }
        return total;
    }
}
