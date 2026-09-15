class Solution {
    // Pairs within dist, counted on the sorted array with two pointers:
    // j only moves forward across the whole scan (never restarts per i).
    long long countLe(const vector<int> &nums, int dist) {
        long long cnt = 0;
        size_t j = 0;
        for (size_t i = 0; i < nums.size(); i++) {
            while (j < nums.size() && nums[j] - nums[i] <= dist) {
                j++;
            }
            // Later elements within dist of nums[i]; j - i - 1 of them.
            cnt += (long long)j - (long long)i - 1;
        }
        return cnt;
    }

  public:
    int smallestDistancePair(vector<int> &nums, int k) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        // The count is monotone in dist, so binary search the distance itself
        // over [0, max - min]; the converged value is a real pair distance.
        int lo = 0;
        int hi = nums[n - 1] - nums[0];
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            // At least k pairs qualify: the kth smallest is mid or smaller.
            if (countLe(nums, mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }
};
