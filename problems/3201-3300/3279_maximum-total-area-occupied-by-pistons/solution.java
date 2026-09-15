import java.util.Map;
import java.util.TreeMap;

class Solution {

    public long maxArea(int height, int[] positions, String directions) {
        // The total moves each second by (#up - #down); that balance only
        // changes at critical times when a piston lands on an end and turns
        // around. Between critical times the total runs along a straight
        // line, so its peak sits at t = 0 or at some critical time.
        Map<Integer, Integer> events = new TreeMap<>();
        int balance = 0;
        for (int i = 0; i < positions.length; i++) {
            boolean goingUp;
            if (positions[i] == 0) {
                goingUp = true;
            } else if (positions[i] == height) {
                goingUp = false;
            } else {
                goingUp = directions.charAt(i) == 'U';
            }
            // Totals pass 32 bits near n * height = 10^11; the sweep below
            // runs in long arithmetic throughout.
            int first = goingUp ? height - positions[i] : positions[i];
            if (goingUp) {
                // Landing on the top flips a piston downward.
                events.merge(first, -2, Integer::sum);
                balance++;
                if (first < height) {
                    // second landing stays inside period 2h
                    events.merge(first + height, 2, Integer::sum);
                }
            } else {
                // Landing on the floor flips a piston upward.
                events.merge(first, 2, Integer::sum);
                balance--;
                if (first < height) {
                    events.merge(first + height, -2, Integer::sum);
                }
            }
        }

        long total = 0;
        for (int p : positions) {
            total += p;
        }
        long best = total;
        int prev = 0;
        for (Map.Entry<Integer, Integer> event : events.entrySet()) {
            int t = event.getKey();
            total += (long) balance * (t - prev);
            best = Math.max(best, total);
            balance += event.getValue();
            prev = t;
        }
        return best;
    }
}
