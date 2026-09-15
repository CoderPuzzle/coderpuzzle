import java.util.HashMap;
import java.util.Map;

class Solution {

    public long numGoodSubarrays(int[] nums, int k) {
        // Positional sweep: window [l, r] is good exactly when the prefixes
        // before l and through r leave the same remainder mod k. Residue
        // plus element can pass 2^31, so the running sum stays in 64 bits.
        Map<Integer, Long> residueCounts = new HashMap<>();
        residueCounts.put(0, 1L);
        long residue = 0;
        long total = 0;
        for (int value : nums) {
            residue = (residue + value) % k;
            int key = (int) residue;
            long seen = residueCounts.getOrDefault(key, 0L);
            total += seen;
            residueCounts.put(key, seen + 1);
        }
        // Identical value sequences repeat only inside one run of equal
        // values: a span crossing a strict increase is pinned by where it
        // crosses and how much it takes from each edge. A qualifying length
        // L inside a run of length a occupies a - L + 1 positions but counts
        // once, so subtract the a - L excess of every qualifying length. The
        // qualifying lengths are multiples of k / gcd(v, k).
        int i = 0;
        while (i < nums.length) {
            int j = i;
            while (j < nums.length && nums[j] == nums[i]) {
                j++;
            }
            long runLength = j - i;
            long step = k / gcd(nums[i], k);
            long repeated = runLength / step;
            total -= repeated * runLength - (step * repeated * (repeated + 1)) / 2;
            i = j;
        }
        return total;
    }

    private long gcd(long a, long b) {
        while (b != 0) {
            long t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
