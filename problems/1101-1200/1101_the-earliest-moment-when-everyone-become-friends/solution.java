import java.util.Arrays;
import java.util.Comparator;

class Solution {

    public int earliestAcq(int[][] logs, int n) {
        // Replay events chronologically; connectivity models acquaintance.
        int[][] sorted = logs.clone();
        Arrays.sort(sorted, Comparator.comparingInt(a -> a[0]));
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
        // The component counter tracks the group count so no global scan is
        // ever needed.
        int components = n;
        for (int[] log : sorted) {
            int rx = find(parent, log[1]);
            int ry = find(parent, log[2]);
            // Redundant (already-friends) events merge nothing.
            if (rx != ry) {
                parent[rx] = ry;
                components--;
                // This merge closed the last divide: everyone is acquainted.
                if (components == 1) {
                    return log[0];
                }
            }
        }
        return -1;
    }

    // Path-halving find keeps the trees shallow across replays.
    private int find(int[] parent, int a) {
        while (parent[a] != a) {
            parent[a] = parent[parent[a]];
            a = parent[a];
        }
        return a;
    }
}
