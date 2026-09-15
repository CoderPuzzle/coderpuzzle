import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Queue;

class Solution {

    public int minValidStrings(String[] words, String target) {
        // dp[p] is the minimum number of valid strings forming target[:p];
        // dp[0] is 0 and every other cell starts out unreachable. An
        // Aho-Corasick automaton over words turns one left-to-right scan of
        // target into, at each index j, the length of the longest suffix of
        // target[:j+1] that is a prefix of some word: every automaton state
        // lies on a trie path, so that length is simply the state's depth. A
        // piece ending at j + 1 therefore starts somewhere inside its last r
        // positions, and a min segment tree over finalized dp cells answers
        // each such window in O(log n): point-update dp[j + 1], then move on.
        // The scan stops dead the moment a character extends no word prefix
        // at all - nothing beyond that position is reachable, so the answer
        // is -1 unless the full length was formed. All values fit an int.
        List<Map<Character, Integer>> children = new ArrayList<>();
        children.add(new HashMap<>());
        List<Integer> fail = new ArrayList<>();
        fail.add(0);
        for (String word : words) {
            int cur = 0;
            for (int k = 0; k < word.length(); k++) {
                char ch = word.charAt(k);
                Integer nxt = children.get(cur).get(ch);
                if (nxt == null) {
                    children.add(new HashMap<>());
                    fail.add(0);
                    nxt = children.size() - 1;
                    children.get(cur).put(ch, nxt);
                }
                cur = nxt;
            }
        }
        Queue<Integer> bfs = new ArrayDeque<>();
        for (int v : children.get(0).values()) {
            bfs.add(v);
        }
        while (!bfs.isEmpty()) {
            int u = bfs.poll();
            for (Map.Entry<Character, Integer> edge : children.get(u).entrySet()) {
                char ch = edge.getKey();
                int v = edge.getValue();
                int f = fail.get(u);
                while (f > 0 && !children.get(f).containsKey(ch)) {
                    f = fail.get(f);
                }
                Integer nf = children.get(f).get(ch);
                int next = nf == null ? 0 : nf;
                fail.set(v, next == v ? 0 : next);
                bfs.add(v);
            }
        }
        int[] depth = new int[children.size()];
        for (int u = 0; u < children.size(); u++) {
            for (int v : children.get(u).values()) {
                depth[v] = depth[u] + 1;
            }
        }
        int n = target.length();
        final int inf = 1 << 30;
        int size = 1;
        while (size < n + 2) size <<= 1;
        int[] tree = new int[2 * size];
        java.util.Arrays.fill(tree, inf);
        update(0, 0, size, tree);
        int cur = 0;
        for (int j = 0; j < n; j++) {
            char ch = target.charAt(j);
            while (cur > 0 && !children.get(cur).containsKey(ch)) {
                cur = fail.get(cur);
            }
            Integer nxt = children.get(cur).get(ch);
            cur = nxt == null ? 0 : nxt;
            if (cur == 0) {
                return -1;
            }
            int lo = Math.max(0, j + 1 - depth[cur]);
            int best = query(lo, j + 1, size, tree, inf);
            if (best != inf) {
                update(j + 1, best + 1, size, tree);
            }
        }
        int ans = query(n, n + 1, size, tree, inf);
        return ans >= inf ? -1 : ans;
    }

    private static void update(int i, int value, int size, int[] tree) {
        i += size;
        tree[i] = value;
        for (i >>= 1; i > 0; i >>= 1) {
            tree[i] = Math.min(tree[2 * i], tree[2 * i + 1]);
        }
    }

    private static int query(int lo, int hi, int size, int[] tree, int inf) {
        int res = inf;
        for (lo += size, hi += size; lo < hi; lo >>= 1, hi >>= 1) {
            if ((lo & 1) != 0) res = Math.min(res, tree[lo++]);
            if ((hi & 1) != 0) res = Math.min(res, tree[--hi]);
        }
        return res;
    }
}
