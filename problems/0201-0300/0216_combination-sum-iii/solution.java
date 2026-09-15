import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[][] combinationSum3(int k, int n) {
        List<int[]> combinations = new ArrayList<>();
        // start moves past each picked digit, so each number 1 through 9 is
        // used at most once.
        backtrack(1, k, n, new ArrayList<>(), combinations);
        return combinations.toArray(new int[0][]);
    }

    private void backtrack(int start, int slots, int remaining, List<Integer> current, List<int[]> combinations) {
        if (slots == 0) {
            // k digits chosen: valid only when they sum to n exactly.
            if (remaining != 0) return;
            int[] combination = new int[current.size()];
            for (int i = 0; i < current.size(); i++) combination[i] = current.get(i);
            combinations.add(combination);
            return;
        }
        // A digit must leave slots - 1 larger digits behind, which caps it
        // at 10 - slots.
        for (int digit = start; digit <= 10 - slots; digit++) {
            // Digits grow across the loop, so the first one that overshoots
            // the remaining budget ends the loop.
            if (digit > remaining) break;
            current.add(digit);
            backtrack(digit + 1, slots - 1, remaining - digit, current, combinations);
            current.remove(current.size() - 1);
        }
    }
}
