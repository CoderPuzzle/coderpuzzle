class Solution {
  public:
    int maxSubarrayLength(vector<int> &nums) {
        // A subarray nums[j..i] qualifies exactly when j < i and
        // nums[j] > nums[i]; only the two endpoints matter.
        int n = nums.size();
        vector<pair<int, int>> ordered;
        ordered.reserve(n);
        for (int i = 0; i < n; ++i) {
            ordered.emplace_back(nums[i], i);
        }
        sort(ordered.begin(), ordered.end(),
             [](const pair<int, int> &a, const pair<int, int> &b) { return a.first > b.first; });
        int best = 0;
        // Sentinel n can never beat any real position x <= n - 1.
        int min_index = n;
        int g = 0;
        while (g < n) {
            int h = g;
            while (h < n && ordered[h].first == ordered[g].first) {
                ++h;
            }
            // Query first: positions of strictly larger values only, so
            // equal-valued endpoints can never pair with each other.
            for (int k = g; k < h; ++k) {
                int x = ordered[k].second;
                if (min_index < x && x - min_index + 1 > best) {
                    best = x - min_index + 1;
                }
            }
            // Then merge this equal-value group into the running minimum.
            for (int k = g; k < h; ++k) {
                min_index = min(min_index, ordered[k].second);
            }
            g = h;
        }
        return best;
    }
};
