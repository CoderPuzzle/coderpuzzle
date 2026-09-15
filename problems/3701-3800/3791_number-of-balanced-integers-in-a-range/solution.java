class Solution {

    public long countBalanced(long low, long high) {
        return countUpTo(high) - countUpTo(low - 1);
    }

    private long countUpTo(long x) {
        if (x < 10) {
            return 0;
        }
        String s = Long.toString(x);
        int n = s.length();
        int span = 9 * n;
        int size = 2 * span + 1;
        // ways[i][t + span]: assignments of slots i..n-1 with free digits
        // 0..9 whose signed sum is t (slot j contributes +digit when j is
        // even and -digit when j is odd, 0-based from the left). Counts
        // reach 10^15 + 1, past 32 bits, so the table holds longs.
        long[][] ways = new long[n + 1][size];
        ways[n][span] = 1;
        for (int i = n - 1; i >= 0; i--) {
            int sign = i % 2 == 0 ? 1 : -1;
            for (int t = -span; t <= span; t++) {
                long total = 0;
                for (int d = 0; d <= 9; d++) {
                    int u = t - sign * d;
                    if (u >= -span && u <= span) {
                        total += ways[i + 1][u + span];
                    }
                }
                ways[i][t + span] = total;
            }
        }
        long count = 0;
        int diff = 0;
        for (int i = 0; i < n; i++) {
            int v = s.charAt(i) - '0';
            int sign = i % 2 == 0 ? 1 : -1;
            // A digit below x's own fixes a smaller prefix forever, so
            // the freed tail counts whenever it can cancel the running
            // difference; x's digit itself keeps the walk tight.
            for (int c = 0; c < v; c++) {
                int u = -diff - sign * c;
                if (u >= -span && u <= span) {
                    count += ways[i + 1][u + span];
                }
            }
            diff += sign * v;
        }
        if (diff == 0) {
            count += 1;
        }
        // Padding with leading zeros preserves "alternating sum is
        // zero" exactly for balanced numbers, but lets m = 0 slip in;
        // it is the only non-balanced value ever counted, so drop it.
        return count - 1;
    }
}
