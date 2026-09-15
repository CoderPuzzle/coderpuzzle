class Solution {
  public:
    vector<double> medianSlidingWindow(vector<int> &nums, int k) {
        // One sorted list mirrors the window: binary insertion keeps it
        // sorted without ever re-sorting a whole window.
        vector<int> window;
        window.reserve(nums.size());
        vector<double> out;
        out.reserve(nums.size() - k + 1);
        for (int i = 0; i < (int)nums.size(); ++i) {
            window.insert(lower_bound(window.begin(), window.end(), nums[i]), nums[i]);
            // Evict the leftmost occurrence of the outgoing value — equal
            // elements are interchangeable, so the multiset stays exact.
            if (i >= k) {
                window.erase(lower_bound(window.begin(), window.end(), nums[i - k]));
            }
            // Eviction already ran, so exactly k values are present here;
            // the median is then a plain index lookup (middle pair for
            // even k, averaged as a double).
            if (i >= k - 1) {
                if (k & 1) {
                    out.push_back((double)window[k / 2]);
                } else {
                    out.push_back(((long long)window[k / 2 - 1] + (long long)window[k / 2]) / 2.0);
                }
            }
        }
        return out;
    }
};
