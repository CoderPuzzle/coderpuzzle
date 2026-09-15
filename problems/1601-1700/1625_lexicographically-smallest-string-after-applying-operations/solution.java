import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

class Solution {

    public String findLexSmallestString(String s, int a, int b) {
        int n = s.length();
        Set<String> seen = new HashSet<>();
        seen.add(s);
        Deque<String> queue = new ArrayDeque<>();
        queue.add(s);
        String best = s;

        while (!queue.isEmpty()) {
            String cur = queue.poll();
            if (cur.compareTo(best) < 0) {
                best = cur;
            }

            char[] digits = cur.toCharArray();
            for (int i = 1; i < n; i += 2) {
                int value = (digits[i] - '0' + a) % 10;
                digits[i] = (char) ('0' + value);
            }
            String added = new String(digits);
            if (seen.add(added)) {
                queue.add(added);
            }

            String rotated = cur.substring(n - b) + cur.substring(0, n - b);
            if (seen.add(rotated)) {
                queue.add(rotated);
            }
        }

        return best;
    }
}
