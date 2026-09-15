import java.util.Arrays;

class Solution {

    public int maxPointsInsideSquare(int[][] points, String s) {
        // A square centred at the origin takes exactly the points whose
        // Chebyshev radius max(|x|, |y|) is within its half side, so valid
        // squares correspond to prefixes of the order sorted by radius --
        // an entire equal-radius block sits inside or out as one. Sweep
        // blocks outward holding a global seen-tag table; a block that
        // repeats a tag inside itself or against earlier blocks is where
        // every larger square breaks, so the count gathered before it is
        // optimal.
        int n = points.length;
        Integer[] order = new Integer[n];
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        Arrays.sort(order, (a, b) -> radius(points, a) - radius(points, b));
        boolean[] seen = new boolean[26];
        int run = 0;
        int i = 0;
        while (i < n) {
            int j = i;
            while (j < n && radius(points, order[j]) == radius(points, order[i])) {
                j++;
            }
            boolean[] block = new boolean[26];
            boolean ok = true;
            for (int k = i; k < j; k++) {
                int bit = s.charAt(order[k]) - 'a';
                if (seen[bit] || block[bit]) {
                    ok = false;
                    break;
                }
                block[bit] = true;
            }
            if (!ok) {
                return run;
            }
            for (int b = 0; b < 26; b++) {
                if (block[b]) {
                    seen[b] = true;
                }
            }
            run += j - i;
            i = j;
        }
        return run;
    }

    private int radius(int[][] points, int i) {
        int x = Math.abs(points[i][0]);
        int y = Math.abs(points[i][1]);
        return Math.max(x, y);
    }
}
