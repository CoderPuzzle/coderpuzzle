class Solution {
  public:
    int minimumDistance(vector<int> &nums) {
        // Sorted as a < b < c, a good tuple's distance collapses to
        // (b - a) + (c - b) + (c - a) = 2 * (c - a): only the outermost
        // indices matter, so the tightest triple of a value spans three
        // consecutive occurrences of it.
        int best = -1;
        // Last two indices seen for each value (-1 marks "not seen yet");
        // any older occurrence can only widen the span, so it never
        // matters again.
        unordered_map<int, pair<int, int>> recent;
        for (int i = 0; i < (int)nums.size(); i++) {
            auto it = recent.find(nums[i]);
            if (it == recent.end()) {
                it = recent.emplace(nums[i], make_pair(-1, -1)).first;
            }
            pair<int, int> &last = it->second;
            if (last.first != -1) {
                int distance = 2 * (i - last.first);
                if (best == -1 || distance < best) {
                    best = distance;
                }
            }
            last = make_pair(last.second, i);
        }
        return best;
    }
};
