import java.util.Arrays;
import java.util.Comparator;

class Solution {

    public int maxHeight(int[][] cuboids) {
        int n = cuboids.length;
        // Rotations are free, so sort each cuboid's dimensions — largest up
        // is simultaneously tallest and least constrained.
        int[][] boxes = new int[n][];
        for (int i = 0; i < n; i++) {
            int[] b = cuboids[i].clone();
            Arrays.sort(b);
            boxes[i] = b;
        }
        // Lexicographic order puts a potential base before its tippers.
        Arrays.sort(
            boxes,
            Comparator.<int[]>comparingInt(b -> b[0])
                .thenComparingInt(b -> b[1])
                .thenComparingInt(b -> b[2])
        );
        // dp[i]: tallest stack with cuboid i on top.
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) {
            dp[i] = boxes[i][2];
            // An earlier j whose sorted triple is component-wise <= i's can
            // support it (non-strict: equal dimensions may touch).
            for (int j = 0; j < i; j++) {
                if (boxes[j][0] <= boxes[i][0] && boxes[j][1] <= boxes[i][1] && boxes[j][2] <= boxes[i][2]) {
                    if (dp[j] + boxes[i][2] > dp[i]) {
                        dp[i] = dp[j] + boxes[i][2];
                    }
                }
            }
        }
        int best = 0;
        for (int v : dp) {
            best = Math.max(best, v);
        }
        return best;
    }
}
