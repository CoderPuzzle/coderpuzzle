class Solution {
  public:
    int shipWithinDays(vector<int> &weights, int days) {
        // feasibility is monotone in capacity; lo must at least carry the
        // heaviest package, hi = total weight ships everything in one day
        long long lo = 0;
        long long hi = 0;
        for (int w : weights) {
            lo = max(lo, (long long)w);
            hi += w;
        }
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            // hi always stays feasible, lo moves past infeasible midpoints,
            // so the loop ends on the least feasible capacity
            if (feasible(weights, days, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int)lo;
    }

  private:
    bool feasible(vector<int> &weights, int days, long long cap) {
        int need = 1;
        long long current = 0;
        // order fixed: greedily filling each day as full as possible
        // minimizes the day count, so this pass decides feasibility
        for (int w : weights) {
            if (current + w > cap) {
                need += 1;
                if (need > days) {
                    return false;
                }
                current = w;
            } else {
                current += w;
            }
        }
        return true;
    }
};
