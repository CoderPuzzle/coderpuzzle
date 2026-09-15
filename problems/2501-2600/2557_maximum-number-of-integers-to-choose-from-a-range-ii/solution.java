import java.util.Arrays;

class Solution {

    public int maxCount(int[] banned, int n, long maxSum) {
        // Smallest-first greedy computed gap by gap over the sorted,
        // de-duplicated bans: a free run of `avail` candidates starting
        // at `lo` costs avail*(2*lo+avail-1)/2 when swallowed whole. The
        // first run that cannot fit contains the answer's cutoff — every
        // later candidate is larger — so exactly one binary search caps
        // it and the walk stops there. Cost terms peak near avail*n ~
        // 3*10^18, inside the long range; the answer itself is
        // <= sqrt(2*maxSum) <= sqrt(2*10^15) ~ 4.5e7, far below 2^31.
        Arrays.sort(banned);
        int unique = 0;
        for (int value : banned) {
            if (unique == 0 || banned[unique - 1] != value) {
                banned[unique++] = value;
            }
        }
        long taken = 0;
        long prev = 0;
        boolean finished = false;
        for (int i = 0; i < unique; i++) {
            long value = banned[i];
            long avail = value - prev - 1;
            if (avail > 0) {
                long lo = prev + 1;
                long cost = ladder(lo, avail);
                if (cost <= maxSum) {
                    taken += avail;
                    maxSum -= cost;
                } else {
                    taken += bestPrefix(lo, avail, maxSum);
                    finished = true;
                    break;
                }
            }
            prev = value;
        }
        if (!finished && n > prev) {
            long lo = prev + 1;
            long avail = n - prev;
            long cost = ladder(lo, avail);
            if (cost <= maxSum) {
                taken += avail;
            } else {
                taken += bestPrefix(lo, avail, maxSum);
            }
        }
        return (int) taken;
    }

    private long ladder(long lo, long cnt) {
        return (cnt * (2 * lo + cnt - 1)) / 2;
    }

    private long bestPrefix(long lo, long avail, long maxSum) {
        long low = 0;
        long high = avail;
        while (low < high) {
            long mid = (low + high + 1) / 2;
            if (ladder(lo, mid) <= maxSum) {
                low = mid;
            } else {
                high = mid - 1;
            }
        }
        return low;
    }
}
