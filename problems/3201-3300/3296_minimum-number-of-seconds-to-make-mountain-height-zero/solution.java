class Solution {

    public long minNumberOfSeconds(int mountainHeight, int[] workerTimes) {
        long maxW = 0;
        for (int wt : workerTimes) {
            maxW = Math.max(maxW, wt);
        }
        long h = mountainHeight;
        long hi = (maxW * h * (h + 1)) / 2;
        long lo = 0;
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2;
            long total = 0;
            for (int wt : workerTimes) {
                total += units(wt, mid);
                if (total >= mountainHeight) {
                    break;
                }
            }
            if (total >= mountainHeight) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    // largest x such that wt * x*(x+1)/2 <= t
    private long units(long wt, long t) {
        long c = (2 * t) / wt;
        long v = 1 + 4 * c;
        long r = (long) Math.sqrt((double) v);
        if (r < 0) {
            r = 0;
        }
        while (r * r > v) {
            r--;
        }
        while ((r + 1) * (r + 1) <= v) {
            r++;
        }
        return (r - 1) / 2;
    }
}
