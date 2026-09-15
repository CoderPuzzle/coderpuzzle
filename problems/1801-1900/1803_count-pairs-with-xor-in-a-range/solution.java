import java.util.*;

class Solution {

    public int countPairs(int[] nums, int low, int high) {
        long below = low > 0 ? pairsLe(nums, low - 1) : 0;
        return (int) (pairsLe(nums, high) - below);
    }

    private long pairsLe(int[] nums, int k) {
        final int BITS = 16;
        int maxNodes = nums.length * BITS + 2;
        int[][] child = new int[maxNodes][2]; // 0 = none, root = 1
        long[] count = new long[maxNodes];
        int nodes = 1;
        long total = 0;
        for (int x : nums) {
            // Query the trie of previously inserted numbers.
            int node = 1;
            for (int b = BITS - 1; b >= 0 && node != 0; b--) {
                int xb = (x >> b) & 1;
                if (((k >> b) & 1) == 1) {
                    int c = child[node][xb];
                    if (c != 0) {
                        total += count[c];
                    }
                    node = child[node][1 - xb];
                } else {
                    node = child[node][xb];
                }
            }
            if (node != 0) {
                total += count[node];
            }
            // Insert x.
            count[1] += 1;
            node = 1;
            for (int b = BITS - 1; b >= 0; b--) {
                int d = (x >> b) & 1;
                int nxt = child[node][d];
                if (nxt == 0) {
                    nodes += 1;
                    nxt = nodes;
                    child[node][d] = nxt;
                }
                node = nxt;
                count[node] += 1;
            }
        }
        return total;
    }
}
