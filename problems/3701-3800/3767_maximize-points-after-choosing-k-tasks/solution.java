import java.util.Arrays;

class Solution {

    public long maxPoints(int[] technique1, int[] technique2, int k) {
        // Taking technique 1 everywhere satisfies any k, so start there and
        // switch tasks to technique 2 in descending order of the gain
        // technique2[i] - technique1[i], never exceeding n - k switches.
        // A switch only helps while its gain is positive; because gains
        // arrive largest-first, every prefix is the best use of that many
        // switches, so the answer is the running maximum over those totals.
        long total = 0;
        for (int a : technique1) {
            total += a;
        }
        long best = total;
        long[] gains = new long[technique1.length];
        for (int i = 0; i < technique1.length; ++i) {
            gains[i] = (long) technique2[i] - technique1[i];
        }
        Arrays.sort(gains);
        int budget = technique1.length - k;
        for (int i = gains.length - 1; i >= 0; --i) {
            long gain = gains[i];
            if (budget == 0 || gain <= 0) {
                break;
            }
            total += gain;
            --budget;
            best = Math.max(best, total);
        }
        return best;
    }
}
