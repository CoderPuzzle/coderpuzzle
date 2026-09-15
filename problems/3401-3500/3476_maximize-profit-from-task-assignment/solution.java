import java.util.*;

class Solution {

    // Skills partition the problem: inside one skill class every worker
    // is interchangeable and can take any task of that class, so the k
    // workers of a skill simply claim its k most profitable tasks. The
    // extra worker then claims the best leftover overall.
    public long maxProfit(int[] workers, int[][] tasks) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int w : workers) counts.merge(w, 1, Integer::sum);
        Map<Integer, List<Integer>> groups = new HashMap<>();
        for (int[] t : tasks) groups.computeIfAbsent(t[0], x -> new ArrayList<>()).add(t[1]);
        long total = 0;
        long bestExtra = 0;
        for (Map.Entry<Integer, List<Integer>> e : groups.entrySet()) {
            List<Integer> profits = e.getValue();
            profits.sort(Comparator.reverseOrder());
            int take = Math.min(counts.getOrDefault(e.getKey(), 0), profits.size());
            // Profits reach 10^9 and there can be 10^5 of them, so the
            // running total lives in a long (up to ~10^14).
            for (int i = 0; i < take; ++i) total += profits.get(i);
            if (take < profits.size() && profits.get(take) > bestExtra) {
                bestExtra = profits.get(take);
            }
        }
        return total + bestExtra;
    }
}
