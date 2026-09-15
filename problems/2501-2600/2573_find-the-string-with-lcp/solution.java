import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public String findTheString(int[][] lcp) {
        int n = lcp.length;
        // A real matrix is symmetric; reject fakes up front so only the
        // lower triangle needs checking later.
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                if (lcp[i][j] != lcp[j][i]) return "";
            }
        }
        // Positive entries weld indices into letter-equality classes:
        // word[i] == word[j] iff lcp[i][j] > 0. Flood-fill those classes.
        int[] group = new int[n];
        java.util.Arrays.fill(group, -1);
        int groups = 0;
        Deque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; ++i) {
            if (group[i] >= 0) continue;
            group[i] = groups;
            stack.push(i);
            while (!stack.isEmpty()) {
                int u = stack.pop();
                for (int v = 0; v < n; ++v) {
                    if (lcp[u][v] > 0 && group[v] < 0) {
                        group[v] = groups;
                        stack.push(v);
                    }
                }
            }
            ++groups;
        }
        if (groups > 26) return "";
        // Cross-class order is unconstrained, so the alphabetically
        // smallest candidate numbers the classes by first appearance.
        char[] letters = new char[groups];
        java.util.Arrays.fill(letters, '-');
        char nxt = 'a';
        char[] word = new char[n];
        for (int i = 0; i < n; ++i) {
            if (letters[group[i]] == '-') {
                letters[group[i]] = nxt++;
            }
            word[i] = letters[group[i]];
        }
        // Rebuild dp[i][j] = lcp(word[i:], word[j:]) bottom-up and require
        // an exact match on every stored entry; a fabricated matrix fails
        // here even when its positivity structure looked consistent.
        int[] below = new int[n + 1]; // row i+1; trailing slot stays 0
        int[] code = new int[n];
        for (int i = 0; i < n; ++i) code[i] = word[i];
        for (int i = n - 1; i >= 0; --i) {
            int ci = code[i];
            int[] cur = new int[n + 1];
            for (int j = i; j >= 0; --j) {
                if (code[j] == ci) cur[j] = below[j + 1] + 1;
                if (cur[j] != lcp[i][j]) return "";
            }
            below = cur;
        }
        return new String(word);
    }
}
