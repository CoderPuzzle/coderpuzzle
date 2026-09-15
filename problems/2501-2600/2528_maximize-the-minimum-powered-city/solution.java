import java.util.Arrays;

class Solution {

    public long maxPower(int[] stations, int r, int k) {
        int n = stations.length;
        // power[i] = initial number of power stations serving city i
        long[] diff = new long[n + 1];
        for (int i = 0; i < n; i++) {
            long s = stations[i];
            int left = Math.max(0, i - r);
            int right = Math.min(n - 1, i + r);
            diff[left] += s;
            diff[right + 1] -= s;
        }
        long[] power = new long[n];
        long cur = 0;
        for (int i = 0; i < n; i++) {
            cur += diff[i];
            power[i] = cur;
        }

        long kk = k;
        long[] extra = new long[n + 1];
        long minPower = Long.MAX_VALUE;
        for (long p : power) {
            minPower = Math.min(minPower, p);
        }

        long lo = 0;
        long hi = minPower + kk;
        while (lo < hi) {
            long mid = lo + (hi - lo + 1) / 2;
            if (feasible(power, extra, r, mid, kk)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

    private boolean feasible(long[] power, long[] extra, int r, long target, long k) {
        int n = power.length;
        Arrays.fill(extra, 0L);
        long cur = 0;
        long used = 0;
        for (int i = 0; i < n; i++) {
            cur += extra[i];
            long have = power[i] + cur;
            if (have < target) {
                long need = target - have;
                used += need;
                if (used > k) {
                    return false;
                }
                int right = Math.min(n - 1, i + r);
                extra[right + 1] -= need;
                cur += need;
            }
        }
        return used <= k;
    }
}
