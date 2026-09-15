import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int minimumChanges(String s, int k) {
        int n = s.length();
        // Proper divisors of every length L: 1 <= d < L. A part of length 1
        // has none, so every part of a valid partition has length >= 2.
        List<List<Integer>> divisors = new ArrayList<>();
        for (int length = 0; length <= n; ++length) divisors.add(new ArrayList<>());
        for (int d = 1; d <= n / 2; ++d) {
            for (int length = 2 * d; length <= n; length += d) divisors.get(length).add(d);
        }
        final int INF = Integer.MAX_VALUE / 2;
        // cost[i][j]: min letter changes turning s[i..j] into a
        // semi-palindrome, minimized over its proper divisors d. For each d
        // the d repeating-pattern groups must each become a palindrome, and
        // a group costs one change per mismatched mirror pair.
        int[][] cost = new int[n][n];
        for (int i = 0; i + 1 < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                int length = j - i + 1;
                int best = INF;
                for (int d : divisors.get(length)) {
                    int changes = 0;
                    for (int g = 0; g < d; ++g) {
                        int members = (length - 1 - g) / d + 1;
                        for (int a = g, b = g + (members - 1) * d; a < b; a += d, b -= d) {
                            if (s.charAt(i + a) != s.charAt(i + b)) ++changes;
                        }
                    }
                    best = Math.min(best, changes);
                }
                cost[i][j] = best;
            }
        }
        // ways[i] for the current part count p: min changes splitting the
        // suffix s[i:] into p semi-palindrome parts. Transition: pick the
        // first part s[i..x] and add the (p - 1)-part cost of s[x + 1:].
        int[] cur = new int[n];
        int[] prev = new int[n];
        for (int i = 0; i < n; ++i) cur[i] = cost[i][n - 1];
        for (int parts = 2; parts <= k; ++parts) {
            int[] tmp = cur;
            cur = prev;
            prev = tmp;
            Arrays.fill(cur, INF);
            // First part s[i..x] needs x - i + 1 >= 2 and the remaining
            // suffix needs length >= 2 * (parts - 1): x <= n - 2*parts + 1.
            int lastStart = n - 2 * parts + 1;
            for (int i = 0; i < lastStart; ++i) {
                int best = INF;
                for (int x = i + 1; x <= lastStart; ++x) {
                    best = Math.min(best, cost[i][x] + prev[x + 1]);
                }
                cur[i] = best;
            }
        }
        return cur[0];
    }
}
