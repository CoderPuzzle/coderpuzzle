class Solution {

    public int peopleAwareOfSecret(int n, int delay, int forget) {
        final int MOD = 1000000007;
        // know[d] = number of people who first learn the secret on day d;
        // day 1 seeds the whole cascade
        long[] know = new long[n + 1];
        know[1] = 1;
        for (int day = 2; day <= n; day++) {
            long total = 0;
            // sharers still active on `day` are those who learned on some d
            // with d + delay <= day <= d + forget - 1; both window endpoints
            // advance by one per day, a sliding window clamped at day 1
            int lo = Math.max(1, day - forget + 1);
            int hi = day - delay;
            for (int d = lo; d <= hi; d++) {
                total += know[d];
            }
            know[day] = total % MOD;
        }
        // aware at the end of day n = learned within the last forget - 1
        // days; earlier learners have forgotten
        long answer = 0;
        for (int d = n - forget + 1; d <= n; d++) {
            answer += know[d];
        }
        return (int) (answer % MOD);
    }
}
