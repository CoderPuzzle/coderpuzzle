class Solution {

    public int maximumGood(int[][] statements) {
        int n = statements.length;
        int best = 0;
        // Enumerate every assignment: bit i set means person i is good.
        // The constraint is one-sided — good people must tell the truth,
        // bad people may say anything.
        for (int mask = 0; mask < 1 << n; mask++) {
            boolean valid = true;
            int count = 0;
            outer: for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) == 0) {
                    continue;
                }
                count++;
                for (int j = 0; j < n; j++) {
                    // 2 = no statement; a "j is good" claim requires bit j
                    // set and a "j is bad" claim requires it clear.
                    if (statements[i][j] == 2) {
                        continue;
                    }
                    boolean isGood = (mask & (1 << j)) != 0;
                    if (isGood != (statements[i][j] == 1)) {
                        valid = false;
                        break outer;
                    }
                }
            }
            if (valid) {
                best = Math.max(best, count);
            }
        }
        return best;
    }
}
