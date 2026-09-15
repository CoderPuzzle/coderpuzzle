class Solution {
    // Each range answers four questions at once: total sum, best prefix,
    // best suffix, and best interior subarray. Merging two halves glues
    // them together, so one recursion describes the whole array.
    struct Stats {
        long long total, prefix, suffix, best;
    };

    Stats solve(vector<int> &nums, int lo, int hi) {
        // A single element is its own total, prefix, suffix, and best.
        if (hi - lo == 1) {
            long long x = nums[lo];
            return {x, x, x, x};
        }
        int mid = (lo + hi) / 2;
        Stats l = solve(nums, lo, mid);
        Stats r = solve(nums, mid, hi);
        // The best subarray either stays in one half or is the seam of the
        // left half's best suffix and the right half's best prefix.
        return {l.total + r.total, max(l.prefix, l.total + r.prefix), max(r.suffix, r.total + l.suffix),
                max({l.best, r.best, l.suffix + r.prefix})};
    }

  public:
    int maxSubArray(vector<int> &nums) { return (int)solve(nums, 0, (int)nums.size()).best; }
};
