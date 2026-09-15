import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int maxRequests(int[][] requests, int k, int window) {
        // The limit is per user, so users never interact: group each user's
        // times, sort them, and greedily keep every time whose k-back kept
        // predecessor sits more than window away. The kept count is at most
        // the request count <= 10^5, so int arithmetic is exact throughout.
        Map<Integer, List<Integer>> byUser = new HashMap<>();
        for (int[] r : requests) {
            byUser.computeIfAbsent(r[0], x -> new ArrayList<>()).add(r[1]);
        }
        int total = 0;
        for (List<Integer> times : byUser.values()) {
            Collections.sort(times);
            List<Integer> kept = new ArrayList<>();
            for (int t : times) {
                // Appending t is legal iff the k+1 last kept times span
                // strictly more than window: t - kept[size-k] > window.
                if (kept.size() < k || t - kept.get(kept.size() - k) > window) {
                    kept.add(t);
                }
            }
            total += kept.size();
        }
        return total;
    }
}
