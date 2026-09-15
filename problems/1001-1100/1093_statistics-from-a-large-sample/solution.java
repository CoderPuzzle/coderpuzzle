class Solution {

    public double[] sampleStats(int[] count) {
        // One pass over the 256 buckets finds every statistic except the
        // median: min/max are the first/last nonzero buckets, the mode is
        // the largest count, and the mean needs the total count and the
        // weighted value sum (kept in 64 bits — counts reach 1e9).
        long total = 0;
        long totalSum = 0;
        int first = -1,
            last = -1,
            mode = 0;
        for (int i = 0; i < count.length; i++) {
            if (count[i] > 0) {
                if (first == -1) first = i;
                last = i;
                if (count[i] > count[mode]) mode = i;
                total += count[i];
                totalSum += (long) i * count[i];
            }
        }
        double mean = (double) totalSum / total;
        double median;
        if (total % 2 == 1) {
            median = kth(count, total / 2 + 1);
        } else {
            median = (kth(count, total / 2) + kth(count, total / 2 + 1)) / 2.0;
        }
        return new double[] { first, last, mean, median, mode };
    }

    private long kth(int[] count, long k) {
        long acc = 0;
        for (int i = 0; i < count.length; i++) {
            acc += count[i];
            if (acc >= k) return i;
        }
        return 0;
    }
}
