import java.util.*;

class Solution {

    public String bestHand(int[] ranks, String[] suits) {
        // The hand types rank strictly best to worst, so the first condition
        // that holds decides: uniform suit is a flush; otherwise the largest
        // rank multiplicity picks Three of a Kind (>= 3), Pair (2), or High
        // Card. A count of 4 still qualifies as three of a kind.
        for (int i = 1; i < 5; i++) {
            if (!suits[i].equals(suits[0])) {
                Map<Integer, Integer> counts = new HashMap<>();
                for (int rank : ranks) {
                    counts.merge(rank, 1, Integer::sum);
                }
                int best = 0;
                for (int count : counts.values()) {
                    best = Math.max(best, count);
                }
                if (best >= 3) {
                    return "Three of a Kind";
                }
                if (best == 2) {
                    return "Pair";
                }
                return "High Card";
            }
        }
        return "Flush";
    }
}
