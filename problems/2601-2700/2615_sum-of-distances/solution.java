import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public long[] distance(int[] nums) {
        // Only equal values interact, so bucket indices by value; each bucket
        // is an independent 1-D problem over its sorted occurrence list.
        Map<Integer, List<Integer>> pos = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            pos.computeIfAbsent(nums[i], x -> new ArrayList<>()).add(i);
        }
        long[] arr = new long[nums.length];
        for (List<Integer> idxs : pos.values()) {
            int m = idxs.size();
            // Prefix sums of the occurrence indices turn every distance total
            // into O(1) arithmetic — vital since one value may dominate.
            long[] prefix = new long[m + 1];
            for (int j = 0; j < m; j++) {
                prefix[j + 1] = prefix[j] + idxs.get(j);
            }
            for (int j = 0; j < m; j++) {
                long i = idxs.get(j);
                // j earlier occurrences each at distance i - idx, then
                // m - 1 - j later ones each at distance idx - i:
                long left = i * j - prefix[j];
                long right = prefix[m] - prefix[j + 1] - i * (m - 1 - j);
                arr[idxs.get(j)] = left + right;
            }
        }
        return arr;
    }
}
