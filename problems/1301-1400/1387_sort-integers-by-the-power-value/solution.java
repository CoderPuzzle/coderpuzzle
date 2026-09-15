import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int getKth(int lo, int hi, int k) {
        // Memoized path replay: walk each value's Collatz chain, recording
        // the route until it lands on a value whose power is already known,
        // then back-fill the recorded path. Fully iterative, and shared
        // steps between values are computed once.
        Map<Long, Integer> memo = new HashMap<>();
        memo.put(1L, 0);
        Integer[] values = new Integer[hi - lo + 1];
        for (int i = 0; i < values.length; ++i) {
            values[i] = lo + i;
        }
        Arrays.sort(values, (a, b) -> {
            int pa = power(a, memo);
            int pb = power(b, memo);
            if (pa != pb) {
                return pa - pb;
            }
            return a - b;
        });
        return values[k - 1];
    }

    private int power(int start, Map<Long, Integer> memo) {
        long x = start;
        List<Long> path = new ArrayList<>();
        while (!memo.containsKey(x)) {
            path.add(x);
            x = x % 2 == 0 ? x / 2 : 3 * x + 1;
        }
        int steps = memo.get(x);
        for (int i = path.size() - 1; i >= 0; --i) {
            ++steps;
            memo.put(path.get(i), steps);
        }
        return steps;
    }
}
