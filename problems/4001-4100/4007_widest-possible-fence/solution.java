import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int maximumWidth(int[] planks) {
        // For a fixed fence height h: every height-h plank joins the fence
        // as is, and planks of any other height can only contribute as
        // halves of disjoint pairs summing to h. A height-h plank itself can
        // never be in such a pair (its partner would need height 0), so
        // singles and pairs never compete for a plank: their counts add.
        Map<Integer, Integer> freq = new HashMap<>();
        for (int plank : planks) {
            freq.merge(plank, 1, Integer::sum);
        }
        List<Integer> heights = new ArrayList<>(freq.keySet());
        Collections.sort(heights);
        // bucketSum(s) = number of disjoint pairs of planks whose heights
        // sum to s, accumulated once over every unordered pair of heights.
        Map<Integer, Integer> bucket = new HashMap<>();
        for (int i = 0; i < heights.size(); ++i) {
            int x = heights.get(i);
            int countX = freq.get(x);
            if (countX >= 2) {
                bucket.merge(2 * x, countX / 2, Integer::sum);
            }
            for (int j = i + 1; j < heights.size(); ++j) {
                int y = heights.get(j);
                int pairs = Math.min(countX, freq.get(y));
                bucket.merge(x + y, pairs, Integer::sum);
            }
        }
        // Achievable fence heights are exactly the original heights plus
        // the pairwise sums; a lone plank already builds a width-1 fence.
        int best = Collections.max(freq.values());
        for (Map.Entry<Integer, Integer> entry : bucket.entrySet()) {
            int total = entry.getValue() + freq.getOrDefault(entry.getKey(), 0);
            best = Math.max(best, total);
        }
        return best;
    }
}
