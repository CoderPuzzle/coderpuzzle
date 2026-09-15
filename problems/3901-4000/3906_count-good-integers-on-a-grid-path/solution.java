class Solution {

    public long countGoodIntegersOnPath(long l, long r, String directions) {
        boolean[] selected = new boolean[16];
        int row = 0;
        int column = 0;
        selected[0] = true;
        for (char move : directions.toCharArray()) {
            if (move == 'D') row++;
            else column++;
            selected[row * 4 + column] = true;
        }
        return countUpTo(r, selected) - countUpTo(l - 1, selected);
    }

    private long countUpTo(long bound, boolean[] selected) {
        if (bound < 0) return 0;
        String value = Long.toString(bound);
        value = "0".repeat(16 - value.length()) + value;
        long[][] dp = new long[2][11];
        dp[1][10] = 1;
        for (int position = 0; position < 16; position++) {
            long[][] next = new long[2][11];
            for (int tight = 0; tight < 2; tight++) {
                int limit = tight == 1 ? value.charAt(position) - '0' : 9;
                for (int previous = 0; previous <= 10; previous++) {
                    long ways = dp[tight][previous];
                    if (ways == 0) continue;
                    for (int digit = 0; digit <= limit; digit++) {
                        if (selected[position] && previous != 10 && digit < previous) continue;
                        int nextPrevious = selected[position] ? digit : previous;
                        int nextTight = tight == 1 && digit == limit ? 1 : 0;
                        next[nextTight][nextPrevious] += ways;
                    }
                }
            }
            dp = next;
        }
        long total = 0;
        for (long[] row : dp) {
            for (long ways : row) total += ways;
        }
        return total;
    }
}
