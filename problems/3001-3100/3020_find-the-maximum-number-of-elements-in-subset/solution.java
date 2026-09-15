import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maximumLength(int[] nums) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int value : nums) {
            counts.merge(value, 1, Integer::sum);
        }
        int best = 0;
        Integer ones = counts.get(1);
        if (ones != null) {
            // 1 squared is 1, so a run of 1s forms its own pattern: an odd
            // number is selectable; drop one when the count is even.
            best = ones % 2 == 1 ? ones : ones - 1;
        }
        for (int value : counts.keySet()) {
            if (value == 1) continue;
            // Climb x, x^2, x^4, ... taking a pair at every level but the
            // top, which stays single. Cap 31622 is the largest base whose
            // square does not exceed the 10^9 constraint bound, so the long
            // multiply below never overflows.
            int length = 1;
            int current = value;
            while (current <= 31622 && counts.get(current) >= 2) {
                long square = (long) current * current;
                Integer next = counts.get((int) square);
                if (next == null) break;
                length += 2;
                current = (int) square;
            }
            best = Math.max(best, length);
        }
        return best;
    }
}
