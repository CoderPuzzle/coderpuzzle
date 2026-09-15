class Solution {
  public:
    long long maximumSumOfHeights(vector<int> &heights) {
        // best[i] = heaviest sum of a non-decreasing ramp ending at i with
        // tower i kept at full height; one stack sweep per direction gives
        // every peak candidate in O(n) total.
        vector<int> reversed(heights.rbegin(), heights.rend());
        vector<long long> left = rampSums(heights);
        vector<long long> right = rampSums(reversed);
        reverse(right.begin(), right.end()); // back to original indices
        long long best = 0;
        for (size_t i = 0; i < heights.size(); ++i) {
            // Tower i sits in both ramps when it is the peak, so its own
            // height is counted once per direction and must be subtracted.
            best = max(best, left[i] + right[i] - heights[i]);
        }
        return best;
    }

  private:
    // A stack of (height, width) runs holds the clamped prefix; popping
    // taller runs re-stamps those towers at the current, lower height in
    // one multiply instead of touching them one by one.
    vector<long long> rampSums(const vector<int> &nums) {
        vector<long long> best(nums.size());
        vector<pair<long long, long long>> runs; // (height, width), strictly rising
        long long total = 0;
        for (size_t i = 0; i < nums.size(); ++i) {
            long long width = 1;
            while (!runs.empty() && runs.back().first >= nums[i]) {
                total -= runs.back().first * runs.back().second;
                width += runs.back().second;
                runs.pop_back();
            }
            total += static_cast<long long>(nums[i]) * width;
            runs.push_back({nums[i], width});
            best[i] = total;
        }
        return best;
    }
};
