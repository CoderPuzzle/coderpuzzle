import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.Map;

class Solution {

    private int longestWithDelta(String s, int target, int cap) {
        int[] prefix = new int[s.length() + 1];
        Map<Integer, ArrayDeque<Integer>> positions = new HashMap<>();
        positions.computeIfAbsent(0, key -> new ArrayDeque<>()).add(0);
        int best = 0;
        for (int right = 1; right <= s.length(); ++right) {
            prefix[right] = prefix[right - 1] + (s.charAt(right - 1) == '1' ? 1 : -1);
            int expired = right - cap - 1;
            if (expired >= 0) {
                ArrayDeque<Integer> queue = positions.get(prefix[expired]);
                if (queue != null && !queue.isEmpty() && queue.peekFirst() == expired) queue.removeFirst();
            }
            ArrayDeque<Integer> queue = positions.get(prefix[right] - target);
            if (queue != null && !queue.isEmpty()) best = Math.max(best, right - queue.peekFirst());
            positions.computeIfAbsent(prefix[right], key -> new ArrayDeque<>()).addLast(right);
        }
        return best;
    }

    public int longestBalanced(String s) {
        int zeros = 0;
        for (int i = 0; i < s.length(); ++i) if (s.charAt(i) == '0') ++zeros;
        int ones = s.length() - zeros;
        return Math.max(
            longestWithDelta(s, 0, s.length()),
            Math.max(longestWithDelta(s, 2, 2 * zeros), longestWithDelta(s, -2, 2 * ones))
        );
    }
}
