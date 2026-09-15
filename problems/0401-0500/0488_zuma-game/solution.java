import java.util.HashMap;
import java.util.Map;

class Solution {

    private static final String COLORS = "RYBGW";
    private static final int IMPOSSIBLE = 100; // above any answer: the hand holds at most 5 balls

    public int findMinStep(String board, String hand) {
        // Memoized search over (row, remaining hand). Only balls inserted
        // directly alongside a same-colored run are tried: a ball dropped
        // between foreign colors cannot join a removal before its neighbors
        // merge, so deferring its insertion to that merge never costs more.
        int[] counts = new int[5];
        for (int i = 0; i < hand.length(); ++i) {
            ++counts[COLORS.indexOf(hand.charAt(i))];
        }
        Map<String, Integer> memo = new HashMap<>();
        int best = solve(board, counts, memo);
        return best < IMPOSSIBLE ? best : -1;
    }

    // The cascade as a pure function: one pass drops every maximal run of
    // three or more, the loop settles the joins that their removal opens up.
    private String clean(String row) {
        boolean removed = true;
        while (removed) {
            removed = false;
            StringBuilder kept = new StringBuilder();
            int i = 0;
            while (i < row.length()) {
                int j = i;
                while (j < row.length() && row.charAt(j) == row.charAt(i)) {
                    ++j;
                }
                if (j - i < 3) {
                    kept.append(row, i, j);
                } else {
                    removed = true;
                }
                i = j;
            }
            row = kept.toString();
        }
        return row;
    }

    // Row + "|" + the five hand counts keys the memo; the counts stay
    // single-digit (the hand holds at most 5 balls), so the concatenation
    // is unambiguous.
    private int solve(String row, int[] remaining, Map<String, Integer> memo) {
        if (row.isEmpty()) {
            return 0;
        }
        String key = row + "|";
        for (int count : remaining) {
            key += count;
        }
        Integer seen = memo.get(key);
        if (seen != null) {
            return seen;
        }
        int best = IMPOSSIBLE;
        int i = 0;
        while (i < row.length()) {
            int j = i;
            while (j < row.length() && row.charAt(j) == row.charAt(i)) {
                ++j;
            }
            int color = COLORS.indexOf(row.charAt(i));
            if (remaining[color] > 0) {
                // One canonical gap per run: sliding the ball along the run
                // it joins produces the identical next row.
                --remaining[color];
                int sub = solve(clean(row.substring(0, i) + row.charAt(i) + row.substring(i)), remaining, memo);
                best = Math.min(best, sub + 1);
                ++remaining[color];
            }
            i = j;
        }
        memo.put(key, best);
        return best;
    }
}
