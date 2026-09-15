class Solution {

    // cost(x) = k for x in [4^(k-1), 4^k): one "/4" step per band. An
    // operation performs two steps, so a query with S total steps over
    // [l, r] needs ceil(S / 2) operations; sum the steps per band.
    public long minOperations(int[][] queries) {
        long ops = 0;
        for (int[] q : queries) {
            long s = stepsUpTo(q[1]) - stepsUpTo(q[0] - 1);
            ops += (s + 1) / 2;
        }
        return ops;
    }

    private long stepsUpTo(int v) {
        long total = 0;
        long low = 1;
        int k = 1;
        while (low <= v) {
            long high = Math.min((long) v, low * 4 - 1);
            total += (long) k * (high - low + 1);
            low *= 4;
            k++;
        }
        return total;
    }
}
