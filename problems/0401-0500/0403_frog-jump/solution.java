import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public boolean canCross(long[] stones) {
        int n = stones.length;
        Map<Long, Integer> index = new HashMap<>();
        for (int i = 0; i < n; i++) {
            index.put(stones[i], i);
        }
        // jumps[i] = set of last-jump sizes that can land on stone i
        Set<Long>[] jumps = new HashSet[n];
        for (int i = 0; i < n; i++) jumps[i] = new HashSet<>();
        jumps[0].add(0L);
        for (int i = 0; i < n; i++) {
            for (long last : jumps[i]) {
                for (long step : new long[] { last - 1, last, last + 1 }) {
                    if (step <= 0) continue;
                    long target = stones[i] + step;
                    Integer j = index.get(target);
                    if (j != null && j > i) {
                        jumps[j].add(step);
                    }
                }
            }
        }
        return !jumps[n - 1].isEmpty();
    }
}
