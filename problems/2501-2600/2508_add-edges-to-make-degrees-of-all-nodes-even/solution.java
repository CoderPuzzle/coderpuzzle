import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean isPossible(int n, int[][] edges) {
        // One added edge flips exactly two parities, so at most four
        // odd-degree nodes are repairable. Normalized (min,max) keys in one
        // hash set make every "slot free?" probe constant time.
        Set<Long> seen = new HashSet<>();
        int[] degree = new int[n + 1];
        for (int[] edge : edges) {
            ++degree[edge[0]];
            ++degree[edge[1]];
            seen.add(key(edge[0], edge[1]));
        }
        int oddCount = 0;
        for (int node = 1; node <= n; ++node) oddCount += degree[node] & 1;
        if (oddCount == 0) return true;
        if (oddCount > 4) return false;

        int[] odds = new int[oddCount];
        int cursor = 0;
        for (int node = 1; node <= n; ++node) {
            if ((degree[node] & 1) == 1) odds[cursor++] = node;
        }
        if (oddCount == 2) {
            int a = odds[0],
                b = odds[1];
            if (!seen.contains(key(a, b))) return true;
            for (int c = 1; c <= n; ++c) {
                if (c != a && c != b && !seen.contains(key(a, c)) && !seen.contains(key(b, c))) {
                    return true;
                }
            }
            return false;
        }
        int w = odds[0],
            x = odds[1],
            y = odds[2],
            z = odds[3];
        return (
            (!seen.contains(key(w, x)) && !seen.contains(key(y, z))) ||
            (!seen.contains(key(w, y)) && !seen.contains(key(x, z))) ||
            (!seen.contains(key(w, z)) && !seen.contains(key(x, y)))
        );
    }

    private static long key(int a, int b) {
        long u = Math.min(a, b);
        long v = Math.max(a, b);
        return u * 200001 + v;
    }
}
