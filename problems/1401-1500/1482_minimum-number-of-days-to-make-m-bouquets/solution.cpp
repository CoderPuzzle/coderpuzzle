class Solution {
  public:
    int minDays(vector<int> &bloomDay, int m, int k) {
        int n = bloomDay.size();
        // Not enough flowers to ever build m bouquets of k flowers each.
        if ((long long)m * k > n) {
            return -1;
        }
        auto feasible = [&](int day) {
            int bouquets = 0;
            // Length of the current run of consecutive bloomed flowers.
            int run = 0;
            for (int d : bloomDay) {
                if (d <= day) {
                    run++;
                    if (run == k) {
                        // A full run completes one bouquet; reset the run.
                        bouquets++;
                        run = 0;
                    }
                } else {
                    // Bouquets cannot span an unbloomed flower.
                    run = 0;
                }
            }
            return bouquets >= m;
        };
        // Feasibility is monotone in the day (blooming only adds flowers), so
        // binary search the first feasible day between the extreme bloom days:
        // no flower opens before the first, and all are open by the last.
        int lo = *min_element(bloomDay.begin(), bloomDay.end());
        int hi = *max_element(bloomDay.begin(), bloomDay.end());
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (feasible(mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }
};
