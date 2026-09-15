class Solution {
  public:
    vector<int> maxKDistinct(vector<int> &nums, int k) {
        // A duplicate can never be picked twice and never beats an unused
        // value, so only the set of distinct values matters; std::set keeps
        // it sorted ascending.
        set<int> distinct(nums.begin(), nums.end());
        // Reading the set backwards visits the largest values first; the
        // first k of them are the unique optimum, truncated when fewer than
        // k exist.
        vector<int> ans;
        ans.reserve(min<size_t>(k, distinct.size()));
        for (auto it = distinct.rbegin(); it != distinct.rend() && (int)ans.size() < k; ++it) {
            ans.push_back(*it);
        }
        return ans;
    }
};
