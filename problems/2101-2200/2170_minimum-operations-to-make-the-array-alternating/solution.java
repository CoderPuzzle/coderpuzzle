import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    private record Tally(int value, int count) {}

    public int minimumOperations(int[] nums) {
        // An alternating array is fixed by one value for even indices and one
        // different value for odd indices, so the kept elements are exactly
        // the most frequent value on each side. Count both parities in one
        // pass, then keep the best legal pairing of candidates per side,
        // including a fresh fill value worth nothing: the optimal partner
        // need not occur anywhere in nums.
        int n = nums.length;
        if (n == 1) {
            return 0;
        }
        Map<Integer, Integer> evenCounts = new HashMap<>();
        Map<Integer, Integer> oddCounts = new HashMap<>();
        int fresh = 0;
        for (int index = 0; index < n; ++index) {
            Map<Integer, Integer> counts = index % 2 == 0 ? evenCounts : oddCounts;
            counts.merge(nums[index], 1, Integer::sum);
            fresh = Math.max(fresh, nums[index]);
        }
        ++fresh;
        int best = n;
        List<Tally> evens = candidates(evenCounts, fresh);
        List<Tally> odds = candidates(oddCounts, fresh);
        for (Tally even : evens) {
            for (Tally odd : odds) {
                if (even.value() == odd.value()) {
                    continue;
                }
                best = Math.min(best, n - even.count() - odd.count());
            }
        }
        return best;
    }

    private static List<Tally> candidates(Map<Integer, Integer> counts, int fresh) {
        List<Tally> ranked = new ArrayList<>();
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            ranked.add(new Tally(entry.getKey(), entry.getValue()));
        }
        ranked.sort((a, b) -> b.count() - a.count());
        while (ranked.size() > 2) {
            ranked.remove(ranked.size() - 1);
        }
        ranked.add(new Tally(fresh, 0));
        return ranked;
    }
}
