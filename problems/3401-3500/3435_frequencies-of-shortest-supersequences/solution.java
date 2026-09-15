import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    private List<List<Integer>> adj;
    private int[] state; // 0 unvisited, 1 visiting, 2 done

    private boolean dfs(int c) {
        state[c] = 1;
        for (int nxt : adj.get(c)) {
            if (state[nxt] == 1) return true;
            if (state[nxt] == 0 && dfs(nxt)) return true;
        }
        state[c] = 2;
        return false;
    }

    // Induced subgraph on chars not in t must be acyclic.
    private boolean isDag(int t, List<int[]> nonSelf, int m) {
        for (int i = 0; i < m; i++) {
            adj.get(i).clear();
            state[i] = 0;
        }
        for (int[] e : nonSelf) {
            if (((t >> e[0]) & 1) == 0 && ((t >> e[1]) & 1) == 0) {
                adj.get(e[0]).add(e[1]);
            }
        }
        for (int c = 0; c < m; c++) {
            if (((t >> c) & 1) != 0) continue;
            if (state[c] == 0 && dfs(c)) return false;
        }
        return true;
    }

    public int[][] supersequences(String[] words) {
        Map<Character, Integer> idx = new HashMap<>();
        for (String w : words) {
            for (char c : w.toCharArray()) {
                if (!idx.containsKey(c)) idx.put(c, 0);
            }
        }
        List<Character> chars = new ArrayList<>(idx.keySet());
        Collections.sort(chars);
        for (int i = 0; i < chars.size(); i++) idx.put(chars.get(i), i);
        int m = chars.size();

        int forced = 0;
        List<int[]> nonSelf = new ArrayList<>();
        for (String w : words) {
            int a = idx.get(w.charAt(0));
            int b = idx.get(w.charAt(1));
            if (a == b) {
                forced |= 1 << a;
            } else {
                nonSelf.add(new int[] { a, b });
            }
        }

        adj = new ArrayList<>();
        for (int i = 0; i < m; i++) adj.add(new ArrayList<>());
        state = new int[m];

        Integer bestLen = null;
        List<int[]> results = new ArrayList<>();
        for (int mask = 0; mask < 1 << m; mask++) {
            if ((forced & mask) != forced) continue;
            if (!isDag(mask, nonSelf, m)) continue;
            int length = m + Integer.bitCount(mask);
            int[] freq = new int[26];
            for (int i = 0; i < m; i++) {
                freq[chars.get(i) - 'a'] = ((mask >> i) & 1) != 0 ? 2 : 1;
            }
            if (bestLen == null || length < bestLen) {
                bestLen = length;
                results = new ArrayList<>();
                results.add(freq);
            } else if (length == bestLen) {
                results.add(freq);
            }
        }

        results.sort((x, y) -> {
            for (int i = 0; i < 26; i++) {
                if (x[i] != y[i]) return Integer.compare(x[i], y[i]);
            }
            return 0;
        });
        List<int[]> out = new ArrayList<>();
        for (int[] f : results) {
            if (out.isEmpty() || !Arrays.equals(out.get(out.size() - 1), f)) {
                out.add(f);
            }
        }
        return out.toArray(new int[0][]);
    }
}
