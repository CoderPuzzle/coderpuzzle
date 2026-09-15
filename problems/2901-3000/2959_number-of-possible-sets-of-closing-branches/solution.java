import java.util.Arrays;

class Solution {

    public int numberOfSets(int n, int maxDistance, int[][] roads) {
        // n <= 10, so every closing set fits in a bitmask. Seed one matrix
        // with the minimum weight per pair (multiple roads are allowed); for
        // each candidate mask copy it and relax only through branches that
        // survive — a shortest path between survivors never needs a closed
        // intermediate. The set counts when every surviving pair is within
        // maxDistance, and leaving zero or one branch alive passes vacuously.
        final int INF = 100000000; // above any legal maxDistance; INF + INF fits
        int[][] weight = new int[n][n];
        for (int[] row : weight) {
            Arrays.fill(row, INF);
        }
        for (int branch = 0; branch < n; ++branch) {
            weight[branch][branch] = 0;
        }
        for (int[] road : roads) {
            weight[road[0]][road[1]] = Math.min(weight[road[0]][road[1]], road[2]);
            weight[road[1]][road[0]] = weight[road[0]][road[1]];
        }
        int count = 0;
        for (int closed = 0; closed < 1 << n; ++closed) {
            int[][] dist = new int[n][];
            for (int i = 0; i < n; ++i) {
                dist[i] = weight[i].clone();
            }
            for (int k = 0; k < n; ++k) {
                if (((closed >> k) & 1) != 0) {
                    continue;
                }
                for (int i = 0; i < n; ++i) {
                    int through = dist[i][k];
                    if (through >= INF) {
                        continue;
                    }
                    for (int j = 0; j < n; ++j) {
                        if (through + dist[k][j] < dist[i][j]) {
                            dist[i][j] = through + dist[k][j];
                        }
                    }
                }
            }
            boolean ok = true;
            for (int i = 0; ok && i < n; ++i) {
                if (((closed >> i) & 1) != 0) {
                    continue;
                }
                for (int j = 0; j < n; ++j) {
                    if (((closed >> j) & 1) == 0 && dist[i][j] > maxDistance) {
                        ok = false;
                        break;
                    }
                }
            }
            if (ok) {
                ++count;
            }
        }
        return count;
    }
}
