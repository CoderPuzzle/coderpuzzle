class Solution {
  public:
    vector<double> sampleStats(vector<int> &count) {
        // One pass over the 256 buckets finds every statistic except the
        // median: min/max are the first/last nonzero buckets, the mode is
        // the largest count, and the mean needs the total count and the
        // weighted value sum (kept in 64 bits — counts reach 1e9).
        long long total = 0;
        long long total_sum = 0;
        int first = -1, last = -1, mode = 0;
        for (int i = 0; i < 256; ++i) {
            if (count[i] > 0) {
                if (first == -1)
                    first = i;
                last = i;
                if (count[i] > count[mode])
                    mode = i;
                total += count[i];
                total_sum += (long long)i * count[i];
            }
        }
        double mean = (double)total_sum / total;
        // k-th smallest element (1-indexed), found by walking the buckets.
        auto kth = [&](long long k) -> int {
            long long acc = 0;
            for (int i = 0; i < 256; ++i) {
                acc += count[i];
                if (acc >= k)
                    return i;
            }
            return 0;
        };
        double median;
        if (total % 2 == 1) {
            median = kth(total / 2 + 1);
        } else {
            median = (kth(total / 2) + kth(total / 2 + 1)) / 2.0;
        }
        return {(double)first, (double)last, mean, median, (double)mode};
    }
};
