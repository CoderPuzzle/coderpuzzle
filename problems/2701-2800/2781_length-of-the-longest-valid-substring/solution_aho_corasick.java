import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int longestValidSubstring(String word, String[] forbidden) {
        final int miss = 1 << 30;
        // Aho-Corasick automaton over the forbidden strings. Children live in
        // one map keyed node * 32 + char, so memory tracks the trie's edge
        // count instead of any alphabet-wide table.
        Map<Integer, Integer> children = new HashMap<>();
        int maxLen = 0;
        int total = 0;
        for (String s : forbidden) {
            maxLen = Math.max(maxLen, s.length());
            total += s.length();
        }
        int[] fail = new int[total + 1];
        int[] best = new int[total + 1];
        int[] parent = new int[total + 1];
        int[] pch = new int[total + 1];
        Arrays.fill(best, miss);
        List<List<Integer>> levels = new ArrayList<>();
        for (int depth = 0; depth <= maxLen; depth++) {
            levels.add(new ArrayList<>());
        }
        int nodes = 1;
        for (String s : forbidden) {
            int cur = 0;
            for (int i = 0; i < s.length(); i++) {
                int c = s.charAt(i) - 'a';
                int key = cur * 32 + c;
                Integer boxed = children.get(key);
                int nxt;
                if (boxed == null) {
                    nxt = nodes++;
                    children.put(key, nxt);
                    parent[nxt] = cur;
                    pch[nxt] = c;
                    levels.get(i + 1).add(nxt);
                } else {
                    nxt = boxed;
                }
                cur = nxt;
            }
            best[cur] = Math.min(best[cur], s.length());
        }
        // Failure links, breadth-first over depth buckets: fail[u] is the
        // longest proper suffix of u's path that is also a trie path. Folding
        // best along each link tells every node the shortest forbidden string
        // ending there, with no occurrence enumeration at scan time.
        for (int depth = 1; depth <= maxLen; depth++) {
            for (int u : levels.get(depth)) {
                int c = pch[u];
                int f = fail[parent[u]];
                while (f != 0 && !children.containsKey(f * 32 + c)) {
                    f = fail[f];
                }
                int v = children.getOrDefault(f * 32 + c, 0);
                fail[u] = v == u ? 0 : v;
                best[u] = Math.min(best[u], best[fail[u]]);
            }
        }
        int n = word.length();
        int left = 0;
        int ans = 0;
        int state = 0;
        // Longest-match scan: the state is always the longest suffix of the
        // text that prefixes some forbidden string, so each character costs
        // one amortized-constant hop instead of the window variant's L probes.
        for (int right = 0; right < n; right++) {
            int c = word.charAt(right) - 'a';
            while (state != 0 && !children.containsKey(state * 32 + c)) {
                state = fail[state];
            }
            state = children.getOrDefault(state * 32 + c, 0);
            // The shortest forbidden suffix ending at right starts latest --
            // exactly the match the window variant jumps at -- so hopping the
            // left end past its first character keeps the same sweep.
            int m = best[state];
            if (m != miss) {
                left = Math.max(left, right - m + 2);
            }
            ans = Math.max(ans, right - left + 1);
        }
        return ans;
    }
}
