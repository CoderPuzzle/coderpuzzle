class Solution {
  public:
    int maxSubArrayLen(vector<int> &nums, int k) {
        // Longest qualifying subarray inside nums[lo..hi]: recurse on each
        // half, then stitch the halves together.
        return solve(nums, k, 0, (int)nums.size() - 1);
    }

  private:
    int solve(vector<int> &nums, int k, int lo, int hi) {
        if (lo > hi) {
            return 0;
        }
        if (lo == hi) {
            return nums[lo] == k ? 1 : 0;
        }
        int mid = lo + (hi - lo) / 2;
        int best = max(solve(nums, k, lo, mid), solve(nums, k, mid + 1, hi));
        // A subarray crossing the midline is a suffix of the left half
        // plus a prefix of the right half. Record, per suffix sum, the
        // longest suffix that carries it — scanning away from the mid
        // and overwriting keeps the longest.
        unordered_map<long long, int> longest;
        long long total = 0;
        for (int i = mid; i >= lo; i--) {
            total += nums[i];
            longest[total] = mid - i + 1;
        }
        total = 0;
        for (int j = mid + 1; j <= hi; j++) {
            total += nums[j];
            // The right prefix pins the sum the left suffix must supply.
            auto it = longest.find(k - total);
            if (it != longest.end()) {
                best = max(best, it->second + (j - mid));
            }
        }
        return best;
    }
};
