import java.util.HashMap;
import java.util.Map;

class Solution {

    public int minDays(int n) {
        // Two moves are ever worth trying from a pile of more than one
        // orange: pay off the remainder mod 2 in single-orange days and
        // then halve, or pay off the remainder mod 3 and take the 2n/3
        // bite. The reachable states from n are the O(log^2 n) numbers
        // produced by repeatedly floor-dividing by 2 or 3, so a hash-map
        // memo keeps the recursion small even for n up to 2 * 10^9.
        return dp(n, new HashMap<>());
    }

    private int dp(int remaining, Map<Integer, Integer> memo) {
        if (remaining <= 1) return remaining;
        Integer cached = memo.get(remaining);
        if (cached != null) return cached;
        int days = Math.min(
            (remaining % 2) + 1 + dp(remaining / 2, memo),
            (remaining % 3) + 1 + dp(remaining / 3, memo)
        );
        memo.put(remaining, days);
        return days;
    }
}
