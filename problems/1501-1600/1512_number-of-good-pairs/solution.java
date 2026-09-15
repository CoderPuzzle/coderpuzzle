import java.util.*;

class Solution {

    public long numIdenticalPairs(int[] nums) {
        // For each value, the k-th time it is seen forms a good pair with
        // each of the k - 1 occurrences already counted, so adding the
        // running count before bumping it reproduces C(count, 2) per value.
        HashMap<Integer, Long> seen = new HashMap<>();
        long total = 0;
        for (int num : nums) {
            total += seen.getOrDefault(num, 0L);
            seen.merge(num, 1L, Long::sum);
        }
        return total;
    }
}
