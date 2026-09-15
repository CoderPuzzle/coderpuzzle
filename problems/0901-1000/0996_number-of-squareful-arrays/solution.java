import java.util.Arrays;

class Solution {

    public long numSquarefulPerms(int[] nums) {
        // Equal values are interchangeable, so a permutation is decided by
        // how many copies of each distinct value land at each step — collapse
        // nums to distinct values with multiplicities, precompute which value
        // pairs sum to a perfect square (pair sums reach 2 * 10^9, so the
        // root must be an exact integer root, never a bare double), and
        // depth-first search: extend a partial sequence only through adjacent
        // values that are still in stock; a branch consuming all n elements
        // is one squareful permutation.
        int n = nums.length;
        int[] sorted = nums.clone();
        Arrays.sort(sorted);
        int[] values = new int[n];
        int[] counts = new int[n];
        int d = 0;
        for (int x : sorted) {
            if (d == 0 || values[d - 1] != x) {
                values[d] = x;
                counts[d] = 1;
                d++;
            } else {
                counts[d - 1]++;
            }
        }
        boolean[][] adj = new boolean[d][d];
        for (int i = 0; i < d; i++) {
            for (int j = 0; j < d; j++) {
                adj[i][j] = isSquare((long) values[i] + values[j]);
            }
        }
        long answer = 0;
        for (int start = 0; start < d; start++) {
            counts[start]--;
            answer += walk(counts, adj, start, n - 1);
            counts[start]++;
        }
        return answer;
    }

    private long walk(int[] counts, boolean[][] adj, int prev, int left) {
        if (left == 0) {
            return 1;
        }
        long total = 0;
        for (int j = 0; j < counts.length; j++) {
            if (counts[j] > 0 && adj[prev][j]) {
                counts[j]--;
                total += walk(counts, adj, j, left - 1);
                counts[j]++;
            }
        }
        return total;
    }

    // Exact 64-bit square test: binary-search the floor root of s (a pair
    // sum is at most 2 * 10^9, whose root is below 44722), then compare.
    private boolean isSquare(long s) {
        long lo = 0;
        long hi = 44722;
        while (lo < hi) {
            long mid = (lo + hi + 1) >>> 1;
            if (mid * mid <= s) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo * lo == s;
    }
}
