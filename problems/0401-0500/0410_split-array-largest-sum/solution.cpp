class Solution {
  public:
    int splitArray(vector<int> &nums, int k) {
        // Binary-search the answer: the smallest limit for which k pieces
        // suffice (the piece count only falls as the limit rises). Bounds:
        // no element can be split, and one piece covering everything works.
        long long lo = LLONG_MIN;
        long long hi = 0;
        for (int value : nums) {
            lo = max(lo, (long long)value);
            hi += value;
        }
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (feasible(nums, k, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int)lo;
    }

  private:
    bool feasible(vector<int> &nums, int k, long long limit) {
        // Greedy piece count under the limit: extending each piece as far
        // as possible never forces more pieces later.
        int pieces = 1;
        long long current = 0;
        for (int value : nums) {
            if (current + value > limit) {
                pieces++;
                if (pieces > k) {
                    return false;
                }
                current = value;
            } else {
                current += value;
            }
        }
        return true;
    }
};
