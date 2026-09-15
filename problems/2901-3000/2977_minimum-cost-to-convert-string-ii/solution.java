import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public long minimumCost(String source, String target, String[] original, String[] changed, int[] cost) {
        // Give every distinct conversion string an id and run Floyd-Warshall
        // on the minimum operation cost between any two of them; repeated
        // operations on one window then collapse to a shortest path.
        Map<String, Integer> ids = new HashMap<>();
        for (String s : original) {
            ids.putIfAbsent(s, ids.size());
        }
        for (String s : changed) {
            ids.putIfAbsent(s, ids.size());
        }
        int m = ids.size();
        long inf = 1L << 50;
        long[][] dist = new long[m][m];
        for (long[] row : dist) {
            Arrays.fill(row, inf);
        }
        for (int i = 0; i < m; i++) {
            dist[i][i] = 0;
        }
        for (int i = 0; i < cost.length; i++) {
            int x = ids.get(original[i]);
            int y = ids.get(changed[i]);
            dist[x][y] = Math.min(dist[x][y], cost[i]);
        }
        for (int k = 0; k < m; k++) {
            for (int i = 0; i < m; i++) {
                if (dist[i][k] >= inf) {
                    continue;
                }
                for (int j = 0; j < m; j++) {
                    dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                }
            }
        }

        // A trie over the distinct strings lets one lockstep walk over
        // source/target from each position find every usable segment length.
        List<int[]> trie = new ArrayList<>();
        trie.add(new int[26]);
        Arrays.fill(trie.get(0), -1);
        List<Integer> idAt = new ArrayList<>();
        idAt.add(-1);
        for (Map.Entry<String, Integer> e : ids.entrySet()) {
            String s = e.getKey();
            int cur = 0;
            for (int t = 0; t < s.length(); t++) {
                int b = s.charAt(t) - 'a';
                if (trie.get(cur)[b] < 0) {
                    int[] node = new int[26];
                    Arrays.fill(node, -1);
                    trie.add(node);
                    idAt.add(-1);
                    trie.get(cur)[b] = trie.size() - 1;
                }
                cur = trie.get(cur)[b];
            }
            idAt.set(cur, e.getValue());
        }

        int n = source.length();
        long[] dp = new long[n + 1];
        Arrays.fill(dp, inf);
        dp[0] = 0;
        for (int j = 0; j < n; j++) {
            if (dp[j] >= inf) {
                continue;
            }
            if (source.charAt(j) == target.charAt(j) && dp[j] < dp[j + 1]) {
                dp[j + 1] = dp[j];
            }
            int sn = 0;
            int tn = 0;
            for (int k = j; k < n; k++) {
                sn = trie.get(sn)[source.charAt(k) - 'a'];
                tn = trie.get(tn)[target.charAt(k) - 'a'];
                if (sn < 0 || tn < 0) {
                    break;
                }
                int x = idAt.get(sn);
                int y = idAt.get(tn);
                if (x >= 0 && y >= 0 && dist[x][y] < inf && dp[j] + dist[x][y] < dp[k + 1]) {
                    dp[k + 1] = dp[j] + dist[x][y];
                }
            }
        }
        return dp[n] >= inf ? -1 : dp[n];
    }
}
