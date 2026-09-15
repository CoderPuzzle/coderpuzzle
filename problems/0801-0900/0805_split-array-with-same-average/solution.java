import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    // Enumerate one half (at most 2^(n/2) subsets), grouping
    // achievable sums by subset size.
    // Map from subset size -> set of achievable sums with that size.
    private Map<Integer, Set<Long>> subsetSums(int[] arr) {
        Map<Integer, Set<Long>> d = new HashMap<>();
        int m = arr.length;
        for (int mask = 0; mask < 1 << m; mask++) {
            long s = 0;
            int sz = 0;
            for (int i = 0; i < m; i++) {
                if (((mask >> i) & 1) != 0) {
                    s += arr[i];
                    sz += 1;
                }
            }
            d.computeIfAbsent(sz, k -> new HashSet<>()).add(s);
        }
        return d;
    }

    public boolean splitArraySameAverage(int[] nums) {
        int n = nums.length;
        long total = 0;
        for (int v : nums) total += v;

        int mid = n / 2;
        int[] leftArr = new int[mid];
        for (int i = 0; i < mid; i++) leftArr[i] = nums[i];
        int[] rightArr = new int[n - mid];
        for (int i = mid; i < n; i++) rightArr[i - mid] = nums[i];

        Map<Integer, Set<Long>> left = subsetSums(leftArr);
        Map<Integer, Set<Long>> right = subsetSums(rightArr);
        int nr = n - mid;

        // Equal averages force both parts to the whole-array average
        // total/n, so seek a proper subset of size s summing to
        // total*s/n; only sizes with an integer target can work, and
        // s in 1..n-1 keeps both parts non-empty.
        for (int s = 1; s < n; s++) {
            if ((total * s) % n != 0) continue;
            long target = (total * s) / n;
            // Clamp s1 so both pieces actually fit in their halves.
            int lo = Math.max(0, s - nr);
            int hi = Math.min(mid, s);
            for (int s1 = lo; s1 <= hi; s1++) {
                int s2 = s - s1;
                if (!left.containsKey(s1) || !right.containsKey(s2)) continue;
                // Assemble: a left sum v plus a right sum target - v
                // builds a valid subset (only sums, not identities).
                for (long v : left.get(s1)) {
                    if (right.get(s2).contains(target - v)) return true;
                }
            }
        }
        return false;
    }
}
