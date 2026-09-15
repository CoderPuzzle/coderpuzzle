import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[][] combinationSum(int[] candidates, int target) {
        // Candidate value -> position, so the ways can be reported in the
        // order the backtracking search would meet them.
        Map<Integer, Integer> position = new HashMap<>();
        for (int index = 0; index < candidates.length; index++) {
            position.put(candidates[index], index);
        }
        // table[amount] holds every way of reaching that amount with the
        // candidates processed so far. Owing nothing has exactly one way --
        // the empty one -- which seeds the sweep.
        List<List<List<Integer>>> table = new ArrayList<>(target + 1);
        for (int amount = 0; amount <= target; amount++) {
            table.add(new ArrayList<>());
        }
        table.get(0).add(new ArrayList<>());
        for (int value : candidates) {
            for (int amount = value; amount <= target; amount++) {
                // Extend every way that is exactly `value` short. A way may
                // already contain this candidate: that is the unlimited
                // reuse, falling out of ascending amounts within one pass.
                for (List<Integer> way : table.get(amount - value)) {
                    List<Integer> extended = new ArrayList<>(way);
                    extended.add(value);
                    table.get(amount).add(extended);
                }
            }
        }
        // Candidate-outer passes pin each way to one order (its values grouped
        // by candidate position), but the table fills in amount order, so a
        // final lexicographic sort by position restores the discovery order.
        List<List<Integer>> ways = table.get(target);
        ways.sort((a, b) -> {
            int shared = Math.min(a.size(), b.size());
            for (int i = 0; i < shared; i++) {
                int pa = position.get(a.get(i));
                int pb = position.get(b.get(i));
                if (pa != pb) return Integer.compare(pa, pb);
            }
            return Integer.compare(a.size(), b.size());
        });
        int[][] out = new int[ways.size()][];
        for (int i = 0; i < ways.size(); i++) {
            List<Integer> way = ways.get(i);
            int[] row = new int[way.size()];
            for (int j = 0; j < way.size(); j++) {
                row[j] = way.get(j);
            }
            out[i] = row;
        }
        return out;
    }
}
