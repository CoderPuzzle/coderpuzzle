import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[][] substringXorQueries(String s, int[][] queries) {
        // first ^ second <= 2^30 - 1 (both fit under 10^9), so only
        // substrings of at most 30 characters can ever match a query.
        // Sweeping lengths ascending records each decoded value the first
        // time it is seen, which is exactly the statement's pick: shortest
        // length, ties broken by the leftmost start. A 30-bit window
        // stays < 2^30, safely inside int.
        Map<Integer, int[]> best = new HashMap<>();
        int n = s.length();
        for (int length = 1; length <= Math.min(30, n); length++) {
            for (int left = 0; left + length <= n; left++) {
                if (s.charAt(left) == '0' && length > 1) {
                    // "0xxx" decodes to xxx's value, which the previous,
                    // shorter pass already handled.
                    continue;
                }
                int val = 0;
                for (int k = left; k < left + length; k++) {
                    val = val * 2 + (s.charAt(k) - '0');
                }
                best.putIfAbsent(val, new int[] { left, left + length - 1 });
            }
        }
        int[][] answer = new int[queries.length][];
        for (int i = 0; i < queries.length; i++) {
            int target = queries[i][0] ^ queries[i][1];
            int[] pair = best.get(target);
            answer[i] = pair != null ? pair : new int[] { -1, -1 };
        }
        return answer;
    }
}
