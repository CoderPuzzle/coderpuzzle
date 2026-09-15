class Solution {
  public:
    int minEatingSpeed(vector<int> &piles, int h) {
        int lo = 1;
        // Range [1, max(piles)]: the max speed empties any pile in a
        // single hour, and h >= piles.size() makes it always feasible.
        int hi = 0;
        for (int pile : piles) {
            hi = max(hi, pile);
        }
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            // Lower-bound bisection: feasible means the answer is mid
            // or smaller; infeasible raises lo. Exiting, lo is the
            // smallest feasible speed.
            if (hoursNeeded(piles, mid) <= h) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

  private:
    // Pile p costs ceil(p / k) hours; hours(k) only shrinks as k
    // grows, so feasibility is a threshold. Ceil via (p + k - 1) / k
    // with a 64-bit accumulator: the total can reach 10^4 * 10^9.
    long long hoursNeeded(vector<int> &piles, int k) {
        long long total = 0;
        for (int pile : piles) {
            total += (pile + (long long)k - 1) / k;
        }
        return total;
    }
};
