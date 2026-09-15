import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int minGroupsForValidAssignment(int[] balls) {
        // Some box size s must make every box hold s or s + 1 balls, and the
        // value with the fewest copies bounds s by its frequency. For each
        // candidate s, pack each frequency f into f / (s + 1) boxes when it
        // divides evenly, one more box when the remainder can be absorbed by
        // shrinking that many full boxes, or fail; the cheapest feasible s
        // wins.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int ball : balls) {
            counts.merge(ball, 1, Integer::sum);
        }
        List<Integer> freqs = new ArrayList<>(counts.values());
        int smallest = balls.length;
        for (int f : freqs) {
            smallest = Math.min(smallest, f);
        }
        int best = balls.length;
        for (int size = 1; size <= smallest; ++size) {
            int total = 0;
            boolean ok = true;
            for (int f : freqs) {
                int big = f / (size + 1);
                int rest = f % (size + 1);
                if (rest != 0) {
                    if (size - rest > big) {
                        ok = false;
                        break;
                    }
                    ++total;
                }
                total += big;
            }
            if (ok && total < best) {
                best = total;
            }
        }
        return best;
    }
}
