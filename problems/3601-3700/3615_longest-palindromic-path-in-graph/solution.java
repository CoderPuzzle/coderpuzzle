import java.util.*;

class Solution {

    private List<List<Integer>> adj;
    private int[] codes;
    private byte[] memo;
    private int n;

    public int maxLen(int n, int[][] edges, String label) {
        this.n = n;
        adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }
        codes = new int[n];
        for (int i = 0; i < n; i++) codes[i] = label.charAt(i);
        memo = new byte[(1 << n) * n * n];
        Arrays.fill(memo, (byte) -1);

        // Every palindrome has a center: seed odd paths from each single node
        // and even paths from each equal-label adjacent pair.
        int answer = 1;
        for (int i = 0; i < n; i++) {
            int length = dp(1 << i, i, i);
            if (length > answer) answer = length;
        }
        for (int[] e : edges) {
            int u = e[0],
                v = e[1];
            if (codes[u] == codes[v]) {
                int length = dp((1 << u) | (1 << v), u, v);
                if (length > answer) answer = length;
            }
        }
        return answer;
    }

    // dp(mask, left, right): best length reachable when mask is the visited set
    // and left/right are the path endpoints. Invariant: the visited nodes spell
    // a palindrome read from left to right.
    private int dp(int mask, int left, int right) {
        int idx = (mask * n + left) * n + right;
        if (memo[idx] != -1) return memo[idx];
        // The standing path already spells a palindrome, so its length is the
        // floor every extension must beat.
        int best = Integer.bitCount(mask);
        // Grow outward by one matched pair: u glues onto the left end, v onto
        // the right end; they must be distinct, unvisited, and equally labeled
        // so the path stays palindromic.
        for (int u : adj.get(left)) {
            if (((mask >> u) & 1) != 0) continue;
            for (int v : adj.get(right)) {
                if (u == v || ((mask >> v) & 1) != 0) continue;
                if (codes[u] != codes[v]) continue;
                int cand = dp(mask | (1 << u) | (1 << v), u, v);
                if (cand > best) best = cand;
            }
        }
        memo[idx] = (byte) best;
        return best;
    }
}
